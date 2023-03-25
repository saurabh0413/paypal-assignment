import { Box } from "@chakra-ui/react";
import "../App.css";
import React from "react";
import { Singletask } from "./Singletask";
import { Taskmodal } from "./Taskmodal";

export const SingleSprint = ({ item, tasks }) => {
  return (
    <Box border={"2px solid red"} backgroundColor="#f6f8fa">
      <p>{item}</p>
      {/* task scrollable box */}
      <Box maxHeight="400px" id="sprint">
        {tasks &&
          tasks.map((singletask) => {
            if (item == singletask.status) {
              return <Singletask singletask={singletask} />;
            }
          })}
      </Box>

      <Taskmodal item={item} />
    </Box>
  );
};
