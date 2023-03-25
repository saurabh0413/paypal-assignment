import { Box, SimpleGrid } from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { SingleSprint } from "../components/SingleSprint";
import { taskContext } from "../context/Tasks";

export const Sprints = () => {
  let arr = ["No status", "Todo", "In-progess", "Done"];
  const {tasks,getTasks} = useContext(taskContext)
  useEffect(() => {
    getTasks();
  }, []);
  return (
    <Box width="100%" marginTop={"100px"}>
      <SimpleGrid spacing="10px" columns={[1, 2, 3, 4]}>
        {arr.map((item, index) => {
          return <SingleSprint item={item} key={index} tasks={tasks} />;
        })}
      </SimpleGrid>
    </Box>
  );
};
