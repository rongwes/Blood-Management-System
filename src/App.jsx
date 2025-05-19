import Layout from "./components/shared/Layout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Analytics from "./pages/Analytics/Analytics.jsx"
import Donors from "./pages/donors/Donors.jsx";
import Donations from "./pages/donations/Donations.jsx";
import Inventory from "./pages/inventory/Inventory.jsx";
import Facilities from "./pages/facilities/Facilities.jsx";
import Login from "./pages/login/Login.jsx"; 
import BloodRequests from "./pages/Analytics/BloodRequests.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Analytics />} />
          <Route path="donors" element={<Donors />} />
          <Route path="donations" element={<Donations />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="bloodRequests" element={<BloodRequests />} />
          <Route path="facilities" element={<Facilities />} />
        </Route>
        {/*For pages that do not require shared components such as login page */}
        <Route path="login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
