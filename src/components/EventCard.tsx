import React from "react";
import { Clock, CalendarCheck, CalendarClock } from "lucide-react";
import { useEventContext } from "../Context/EventContext";

const EventStatCards: React.FC = () => {
  const { events } = useEventContext();

  // Helper to compare dates without time
  const isSameDay = (d1: Date, d2: Date) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  // Get today's date at midnight
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let pastCount = 0;
  let todayCount = 0;
  let futureCount = 0;

  events.forEach((event) => {
    const eventDate = new Date(event.date);
    const dateOnly = new Date(eventDate);
    dateOnly.setHours(0, 0, 0, 0);

    if (dateOnly < today) {
      pastCount++;
    } else if (isSameDay(dateOnly, today)) {
      todayCount++;
    } else {
      futureCount++;
    }
  });

  return (
    <div className="flex flex-col md:flex-row gap-4 justify-center mt-6">
      {/* Past Events */}
      <div className="bg-white shadow-md p-6 rounded-xl w-full md:w-1/3 text-center">
        <div className="p-3 rounded-full bg-gray-200 inline-block mb-2">
          <Clock className="text-gray-700" size={28} />
        </div>
        <h2 className="text-lg font-semibold">Past Events</h2>
        <p className="text-3xl font-bold text-gray-700 mt-1">{pastCount}</p>
      </div>

      {/* Today's Events */}
      <div className="bg-white shadow-md p-6 rounded-xl w-full md:w-1/3 text-center">
        <div className="p-3 rounded-full bg-green-100 inline-block mb-2">
          <CalendarCheck className="text-green-600" size={28} />
        </div>
        <h2 className="text-lg font-semibold">Today's Events</h2>
        <p className="text-3xl font-bold text-gray-700 mt-1">{todayCount}</p>
      </div>

      {/* Future Events */}
      <div className="bg-white shadow-md p-6 rounded-xl w-full md:w-1/3 text-center">
        <div className="p-3 rounded-full bg-blue-100 inline-block mb-2">
          <CalendarClock className="text-blue-600" size={28} />
        </div>
        <h2 className="text-lg font-semibold">Upcoming Events</h2>
        <p className="text-3xl font-bold text-gray-700 mt-1">{futureCount}</p>
      </div>
    </div>
  );
};

export default EventStatCards;
