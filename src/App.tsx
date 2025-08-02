import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import EventList from "./components/EventList";
import RouteController from "./RouteController/RouteController";

const App = () => {
  return (
    <>
      <RouteController />
    </>
  );
};

export default App;
