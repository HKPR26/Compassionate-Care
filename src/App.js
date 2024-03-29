import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Dashboard from "./Dashboard/Dashboard.jsx";
import MessageDashboard from "./MessageDashboard/MessageDashboard.jsx";
import LoginGeo from "./components/Pages/LoginGeo.js";
import SignUpGeo from "./components/Pages/SignUpGeo.js";
import Geolocate from "./components/Pages/Geolocate.js";
import PageNotFound from "./components/Pages/PageNotFound.js";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";

import Login from "./components/login_component";
import SignUp from "./components/signup_component";
import UserDetails from "./components/userDetails";
import ImageUpload from "./components/imageUpload.";
import "bootstrap/dist/css/bootstrap.css";
import "./assets/scss/paper-dashboard.scss?v=1.3.0";
import "./assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";

import AdminLayout from "./layouts/Admin.js";

function App() {
  const isLoggedIn = window.localStorage.getItem("loggedIn");
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            exact
            path="/"
            element={isLoggedIn == "true" ? <UserDetails /> : <Login />}
          />
          <Route path="/sign-in" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/userDetails" element={<UserDetails />} />
          <Route path="/admin/*" element={<AdminLayout />} />
          <Route
            path="/"
            element={<Navigate to="/admin/dashboard" replace />}
          />
          <Route
            path="/admin/dashboard/medicineReminderDashboard"
            exact
            element={<Dashboard />}
          />
          <Route
            path="/admin/dashboard/messagesDashboard"
            exact
            element={<MessageDashboard />}
          />
           <Route
            path="/admin/dashboard/liveLocationFeature"
            element={<SignUpGeo />}
          />
          <Route
            path="/admin/dashboard/liveLocationFeature/login"
            element={<LoginGeo />}
          />
          <Route path="/logged/locate" element={<Geolocate />} />
          <Route path="*" element={<PageNotFound />} />
         
        </Routes>
        {/* <ImageUpload/> */}
      </div>
      
    </Router>
  );
}

export default App;
