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
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("events") || "[]");
    setEvents(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  const addEvent = (event: Omit<Event, "id">) => {
    const newEvent: Event = { ...event, id: Date.now() };
    setEvents((prev) => [...prev, newEvent]);
  };

  const updateEvent = (updated: Event) => {
    setEvents((prev) =>
      prev.map((event) => (event.id === updated.id ? updated : event))
    );
  };

  const deleteEvent = (id: number) => {
    setEvents((prev) => prev.filter((event) => event.id !== id));
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
