// src/context/EventContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";

export type Event = {
  id: number;
  title: string;
  description: string;
  location: string;
  date: string;
  organizer: string;
  category?: string;
};

type EventContextType = {
  events: Event[];
  addEvent: (event: Event) => void;
  updateEvent: (updated: Event) => void;
  deleteEvent: (id: number) => void;
};

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const stored = localStorage.getItem("events");
  const [events, setEvents] = useState<Event[]>(
    stored ? JSON.parse(stored) : []
  );

  // Add a new event
  const addEvent = (event: Event) => {
    const newEvent: Event = { ...event, id: Date.now() };
    const updatedEvents = [...events, newEvent];
    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
  };

  const updateEvent = (updated: Event) => {
    const updatedEvents = events.map((event) =>
      Number(event?.id) === Number(updated?.id) ? updated : event
    );

    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
  };

  const deleteEvent = (id: number) => {
    const updatedEvents = events.filter((event) => event.id !== id);
    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
  };

  return (
    <EventContext.Provider
      value={{ events, addEvent, updateEvent, deleteEvent }}
    >
      {children}
    </EventContext.Provider>
  );
};

export const useEventContext = () => {
  const context = useContext(EventContext);
  if (!context)
    throw new Error("useEventContext must be used within EventProvider");
  return context;
};
