import React, { useEffect, useState } from "react";
import EventList from "../../EventList";

const EventSummery = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("events");
    if (stored) setEvents(JSON.parse(stored));
  }, []);

  const handleDelete = (id: number) => {
    const updated = events.filter((e: any) => e.id !== id);
    setEvents(updated);
    localStorage.setItem("events", JSON.stringify(updated));
  };
  return (
    <div>
      <div className="w-full  ">
        <div className="px-18">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 ">
            {/* Upcoming Events */}
            <div className="bg-purple-50 shadow-md rounded-xl p-4 border border-purple-200">
              <h2 className="text-lg font-semibold text-purple-700 mb-3">
                Upcoming Events <span className="text-sm font-normal">(1)</span>
              </h2>
              <div className="space-y-2">
                <p className="text-sm text-gray-800">
                  📌 AI Conference – Aug 10
                </p>
              </div>
            </div>

            {/* Today's Events */}
            <div className="bg-blue-50 shadow-md rounded-xl p-4 border border-blue-200">
              <h2 className="text-lg font-semibold text-blue-700 mb-3">
                Today's Events <span className="text-sm font-normal">(1)</span>
              </h2>
              <div className="space-y-2">
                <p className="text-sm text-gray-800">
                  📆 Team Meeting – 3:00 PM
                </p>
              </div>
            </div>

            {/* Past Events */}
            <div className="bg-gray-50 shadow-md rounded-xl p-4 border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-700 mb-3">
                Past Events <span className="text-sm font-normal">(5)</span>
              </h2>
            </div>
          </div>

          <div>
            <div className="py-4 space-y-6">
              {/* Filters */}
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                {/* Search Input */}
                <input
                  type="search"
                  placeholder="Search by event title..."
                  className="w-full md:w-[60%] px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />

                {/* Category Filter */}
                <select className="w-full md:w-1/5 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none ">
                  <option value="">All Event</option>
                  <option value="conference">Conference</option>
                  <option value="meeting">Meeting</option>
                  <option value="workshop">Workshop</option>
                  <option value="webinar">Webinar</option>
                </select>
                <select className="w-full md:w-1/5 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none ">
                  <option value="">All Categories</option>
                  <option value="conference">Conference</option>
                  <option value="meeting">Meeting</option>
                  <option value="workshop">Workshop</option>
                  <option value="webinar">Webinar</option>
                </select>
              </div>
            </div>
          </div>

          <EventList events={events || []} onDelete={handleDelete} key={"hj"} />
        </div>
      </div>
    </div>
  );
};

export default EventSummery;
