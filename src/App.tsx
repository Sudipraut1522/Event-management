import RouteController from "./RouteController/RouteController";
import { EventProvider } from "./Context/EventContext";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <>
      <EventProvider>
        <RouteController />
        <ToastContainer />
      </EventProvider>
    </>
  );
};

export default App;
