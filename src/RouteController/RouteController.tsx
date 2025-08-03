import { BrowserRouter, Routes, Route } from "react-router-dom";
import BaseLayout from "../layout/Layout";
import AddEvent from "../page/AddEvent";

const RouteController: React.FC = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<BaseLayout />}>
            <Route path="/add-event/:id?" element={<AddEvent />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default RouteController;
