import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useEventContext } from "../../../Context/EventContext";
import { CalendarX2 } from "lucide-react";

const CalendarEventViewer = () => {
  const { events } = useEventContext();
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Helper: format date to "Month Year" like "August 2025"
  const formatYearMonth = (date: Date) =>
    date.toLocaleDateString("en-US", { year: "numeric", month: "long" });

  const eventsForDate = events?.filter((event) => {
    const eventDate = new Date(event.date);
    if (!isNaN(eventDate.getTime())) {
      // full date event - match exact day
      return (
        eventDate.getDate() === selectedDate.getDate() &&
        eventDate.getMonth() === selectedDate.getMonth() &&
        eventDate.getFullYear() === selectedDate.getFullYear()
      );
    } else {
      // month-year only event - match month and year only
      return event.date === formatYearMonth(selectedDate);
    }
  });

  // Highlight tiles with events
  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      const hasEvent = events?.some((event) => {
        const eventDate = new Date(event.date);
        if (!isNaN(eventDate.getTime())) {
          return (
            eventDate.getDate() === date.getDate() &&
            eventDate.getMonth() === date.getMonth() &&
            eventDate.getFullYear() === date.getFullYear()
          );
        } else {
          return event.date === formatYearMonth(date);
        }
      });

      if (hasEvent) return "highlight"; // our custom class
    }
    return null;
  };
  return (
    <div className="bg-gray-100 md:px-16 flex flex-col md:flex-row gap-8 p-4  ">
      {/* Calendar */}
      <div className="overflow-x-auto px-4">
        <div className="bg-white shadow rounded-lg p-4 w-full ">
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            tileClassName={tileClassName}
            className="w-full"
          />
        </div>
      </div>

      {/* Events list */}
      <div className="flex-1 w-full md:max-w-[500px] ">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 mr-6">
          Events on {selectedDate?.toDateString()}
        </h2>

        <div className="max-h-[35vh] overflow-y-auto mr-5">
          {eventsForDate?.length > 0 ? (
            eventsForDate.map((event, idx) => (
              <div
                key={idx}
                className="bg-white shadow-lg rounded-2xl  p-4 mb-3 border-l-8 border-purple-400 transition hover:shadow-xl"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-blue-600 uppercase tracking-wide">
                    {event?.category || "General"}
                  </span>
                  <span className="text-xs text-gray-500">
                    {event?.venue || "Unknown Venue"}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {event?.title || "Untitled Event"}
                </h3>
                <p className="text-gray-700 text-sm">
                  {event?.description || "No description available."}
                </p>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center text-center text-gray-500 mt-10">
              <CalendarX2 className="w-12 h-12 mb-4 text-blue-500" />
              <p className="text-lg font-medium">No events for this date.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarEventViewer;
