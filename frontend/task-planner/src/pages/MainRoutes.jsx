import React from "react";
import { Route, Routes } from "react-router-dom";
import { Dashboard } from "./Dashboard";
import Login from "./Login";
import Signup from "./Signup";

import { Sprints } from "./Sprints";
export const MainRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/sprints/:id" element={<Sprints />} />
      </Routes>
    </div>
  );
};
