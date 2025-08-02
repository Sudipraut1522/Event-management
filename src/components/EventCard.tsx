import React from "react";
import dayjs from "dayjs";

const EventCard = ({ event }) => {
  const today = dayjs().startOf("day");
  const eventDate = dayjs(event.date).startOf("day");

  let label = "";
  let color = "";

  if (eventDate.isAfter(today)) {
    label = "Upcoming Events";
    color = "purple";
  } else if (eventDate.isSame(today)) {
    label = "Today's Events";
    color = "blue";
  } else {
    label = "Past Events";
    color = "gray";
  }

  return (
    <div
      className={`bg-${color}-50 shadow-md rounded-xl p-4 border border-${color}-200`}
    >
      <h2 className={`text-lg font-semibold text-${color}-700 mb-3`}>
        {label} <span className="text-sm font-normal">(1)</span>
      </h2>
      <div className="space-y-2">
        <p className="text-sm text-gray-800">
          {event?.title} – {dayjs(event.date).format("MMM D")}
        </p>
      </div>
    </div>
  );
};

export default EventCard;
