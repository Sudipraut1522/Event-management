import React from "react";
import { Pencil, Trash2 } from "lucide-react";
import { NavLink } from "react-router-dom";

type Event = {
  id: number;
  title: string;
  date: string;
  location: string;
  category?: string;
};

interface EventListProps {
  events: Event[];
  onEdit?: (event: Event) => void;
  onDelete: (id: number) => void;
}

const EventList: React.FC<EventListProps> = ({ events, onDelete }) => {
  return (
    <div className="mt-6 space-y-4 w-full flex justify-center">
      {events?.length === 0 ? (
        <p className="text-gray-500">No events available.</p>
      ) : (
        events?.map((event) => (
          <div
            key={event?.id}
            className="flex justify-between items-center p-4 bg-white border rounded-lg shadow-sm hover:shadow-md transition"
          >
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                {event?.title}
              </h3>
              <p className="text-sm text-gray-600">
                {event?.date} • {event?.location}
              </p>
              {event.category && (
                <span className="inline-block text-xs text-white bg-blue-500 px-2 py-0.5 rounded mt-1">
                  {event?.category}
                </span>
              )}
            </div>
            <div className="flex gap-2 ">
              <NavLink to={`add-event/${event?.id}`} state={{ event: event }}>
                <button className="p-2 rounded hover:bg-gray-100" title="Edit">
                  <Pencil size={18} className="text-blue-600" />
                </button>
              </NavLink>
              <button
                onClick={() => onDelete(event?.id)}
                className="p-2 rounded hover:bg-gray-100"
                title="Delete"
              >
                <Trash2 size={18} className="text-red-600" />
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default EventList;
