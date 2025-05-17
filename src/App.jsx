import Layout from "./components/shared/Layout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Analytics from "./pages/Analytics/Analytics.jsx"
import BloodRequests from "./pages/bloodRequests/BloodRequests.jsx"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Analytics />} />
          <Route path="bloodRequests" element={<BloodRequests />} />
        </Route>
        {/*For pages that do not require shared components such as login page */}
        <Route path="login" element={<div>Login</div>}/>
      </Routes>
    </Router>
  );
}

export default App;
