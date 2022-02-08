import React from "react";
import { BrowserRouter,Routes, Route } from "react-router-dom";
// import AuthService from "../services/auth.service";
import routelist from "./routelist";

function route() {
  // const user = AuthService.getCurrentUser();
  return (
    <BrowserRouter>
      <Routes>
        {routelist.map((getroute, key) => (
            <Route path={getroute.path} element={getroute.component}></Route>
        ))}
      </Routes>
    </BrowserRouter>
  );
};
export default route;