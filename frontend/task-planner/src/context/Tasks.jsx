import { createContext, useEffect, useState } from "react";

import React from "react";
import axios from "axios";
export const taskContext = createContext();
const Tasks = ({ children }) => {
    const token = JSON.parse(localStorage.getItem("token"));
    console.log(token)
  const [tasks, setTasks] = useState([]);
  const getTasks = () => {
    axios
      .get("https://paypal-ktp5.onrender.com/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setTasks(res.data);
      });
  };
  useEffect(() => {
    getTasks();
  }, []);
  return (
    <taskContext.Provider value={{tasks,getTasks}}>
      {children}
    </taskContext.Provider>
  );
};

export default Tasks;
