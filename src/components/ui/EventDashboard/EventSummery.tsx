import React, { useState } from "react";
import { useEventContext } from "../../../Context/EventContext";
import EventTable from "../EventTable";
import type { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash2, X } from "lucide-react";
import { NavLink } from "react-router-dom";
import EventCard from "../../EventCard";

const EventSummery = () => {
  const { events, deleteEvent } = useEventContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  // Filter logic
  const filteredEvents = events.filter((event) => {
    const matchesTitle = event.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter
      ? event.category?.toLocaleLowerCase() === categoryFilter
      : true;
    return matchesTitle && matchesCategory;
  });

  //column

  const Columns: ColumnDef<Event>[] = [
    {
      header: "Title",
      accessorKey: "title",
    },
    {
      header: "Date",
      accessorKey: "date",
      cell: ({ row }) => {
        const dateStr = row.getValue("date") as string;
        const eventDate = new Date(dateStr);

        // Get just the date part (yyyy-mm-dd)
        const datePart = eventDate.toISOString().split("T")[0];

        // Get just the time part (HH:mm)
        const timePart = eventDate.toTimeString().slice(0, 5);

        // Today's date at midnight for comparison
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const isPast = eventDate < today;

        return (
          <span
            className={
              isPast ? "text-gray-300 flex gap-2" : "text-black flex gap-2"
            }
          >
            <div>{datePart}</div>
            <div>{timePart}</div>
          </span>
        );
      },
    },
    {
      header: "Venue",
      accessorKey: "location",
    },
    {
      header: "Category",
      accessorKey: "category",
    },
    {
      header: "Actions",
      id: "actions",
      cell: ({ row }) => {
        const event = row.original;

        return (
          <div className="flex gap-2">
            <NavLink to={`add-event/${event?.id}`} state={{ event }}>
              <button className="p-2 rounded hover:bg-gray-100" title="Edit">
                <Pencil size={18} className="text-blue-600" />
              </button>
            </NavLink>
            <button
              className="p-2 rounded hover:bg-gray-100"
              title="Delete"
              onClick={() => deleteEvent(event?.id)}
            >
              <Trash2 size={18} className="text-red-600" />
            </button>
          </div>
        );
      },
    },
  ];

  const categoryOption = [
    { value: "", label: "All Categories" },
    { value: "conference", label: "Conference" },
    { value: "meeting", label: "Meeting" },
    { value: "workshop", label: "Workshop" },
    { value: "webinar", label: "Webinar" },
  ];

  return (
    <div className="w-full">
      <div className="px-4 md:px-18">
        {/* Summary Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {events &&
            events?.map((event, index) => {
              return (
                <div key={index}>
                  <EventCard event={event} />
                </div>
              );
            })}
        </div>

        {/* Filters */}
        <div className="py-4 space-y-6">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            {/* Search */}
            <input
              type="search"
              placeholder="Search by event title..."
              className="w-full md:w-[80%] px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            {/* Category Filter */}
            <select
              className="w-full md:w-[15%] px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              {categoryOption?.map((category, index) => {
                return (
                  <option id={index} value={category?.value}>
                    {category?.label}
                  </option>
                );
              })}
            </select>

            {(searchTerm || categoryFilter) && (
              <>
                <div className="bg-red-700  p-1 rounded-sm  px-2">
                  <X
                    className="cursor-pointer text-white  "
                    onClick={() => {
                      setSearchTerm("");
                      setCategoryFilter("");
                    }}
                  />
                </div>
              </>
            )}
          </div>
        </div>

        {/* Filtered Event List */}
        <EventTable columns={Columns || []} data={filteredEvents} />
      </div>
    </div>
  );
};

export default EventSummery;
