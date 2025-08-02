import React, { useState } from "react";
import { useEventContext } from "../../../Context/EventContext";
import EventTable from "../EventTable";
import type { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash2 } from "lucide-react";
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
      ? event.category === categoryFilter
      : true;
    return matchesTitle && matchesCategory;
  });

  //column

  const Column: ColumnDef<Event>[] = [
    {
      header: "Title",
      accessorKey: "title",
    },
    {
      header: "Date",
      accessorKey: "date",
    },
    {
      header: "Location",
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
            <NavLink to={`add-event/${event?.id}`} state={{ event: event }}>
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

  return (
    <div className="w-full">
      <div className="px-18">
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
              className="w-full md:w-[60%] px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            {/* Category Filter */}
            <select
              className="w-full md:w-1/5 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="conference">Conference</option>
              <option value="meeting">Meeting</option>
              <option value="workshop">Workshop</option>
              <option value="webinar">Webinar</option>
            </select>
          </div>
        </div>

        {/* Filtered Event List */}
        <EventTable columns={Column} data={filteredEvents} />
      </div>
    </div>
  );
};

export default EventSummery;
