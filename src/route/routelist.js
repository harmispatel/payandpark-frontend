import React from "react";

import Dashboard from "../components/Dashboard";
import Parkingspot from "../components/Parkingspot";
import Booking from "../components/Booking";
import Qrgenerator from "../components/Qrgenerator";
import Login from "../components/Login";
import Register from "../components/Register";
import Invoice from "../components/Invoice";
import Admin from "../components/Admin";
import Error from "../components/Error";

const routelist = [
  { path: "/",  name: "Login", component: Login },
  { path: "/login", name: "Login", component: Login },
  { path: "/register", name: "Register", component: Register },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  { path: "/admin", name: "Admin", component: Admin},
  { path: "/invoice", name: "Invoice", component: Invoice},
  { path: "/parkingspot", name: "Parkingspot", component: Parkingspot},
  { path: "/booking", name: "Booking", component: Booking},
  { path: "/qrgenerator", name: "Qrgenerator", component: Qrgenerator},
  { path: "*", name: "Error", component: Error}
];

export default routelist;