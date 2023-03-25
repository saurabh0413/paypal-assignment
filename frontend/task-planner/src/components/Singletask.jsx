import { Box, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import SingleTaskMode from "./SingleTaskMode";

export const Singletask = ({ singletask }) => {
  return (
    <Box
      h="80px"
      m="20px"
      boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px;"
      backgroundColor="white"
    >
      <SingleTaskMode task={singletask} />
    </Box>
  );
};
