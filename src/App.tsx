import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import EventList from "./components/EventList";
import RouteController from "./RouteController/RouteController";
import { EventProvider } from "./Context/EventContext";

const App = () => {
  return (
    <>
      <EventProvider>
        <RouteController />
      </EventProvider>
    </>
  );
};

export default App;
