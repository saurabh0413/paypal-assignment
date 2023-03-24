import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";

import { Sprints } from "./Sprints";
export const MainRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sprints" element={<Sprints />} />
      </Routes>
    </div>
  );
};
