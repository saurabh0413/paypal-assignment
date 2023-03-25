import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Select,
  Stack,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { taskContext } from "../context/Tasks";
import { Singletask } from "./Singletask";

const SingleTaskMode = ({ task }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = React.useRef(null);
  const assignedUser = React.useRef(null);
  const Taskstatus = React.useRef(null);
  const [users, setUsers] = useState([]);
  const getusers = () => {

    axios.get("https://paypal-ktp5.onrender.com").then((res) => {
      setUsers(res.data);
    });
  };
  useEffect(() => {
    getusers();
  }, []);
  const { getTasks } = useContext(taskContext);
  const handleClick = () => {
    const token = JSON.parse(localStorage.getItem("token"));

    console.log(assignedUser.current.value, "user");
    console.log(task);
    axios
      .patch(
        `https://paypal-ktp5.onrender.com/tasks/${task._id}`,
        {
          task_name: firstField.current.value,
          status: Taskstatus.current.value,
          assigned: assignedUser.current.value,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => getTasks())
      .catch((err) => {
        console.log(err);
      });
    onClose();
  };
  return (
    <>
      {/* <Button leftIcon={<AddIcon />} colorScheme="teal" onClick={onOpen}>
        Create users
      </Button> */}
      <Text onClick={onOpen} textDecoration="underline">
        {task.task_name}
      </Text>
      <Text pt={5}>
        Assignee:{" "}
        {task.assigned == undefined ? "Not assigned" : task.assigned.name}
      </Text>
      <Drawer
        isOpen={isOpen}
        placement="right"
        initialFocusRef={firstField}
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">{task.task_name}</DrawerHeader>

          <DrawerBody>
            <Stack spacing="24px">
              <Box>
                <FormLabel htmlFor="username">Name</FormLabel>
                <Input
                  ref={firstField}
                  id="username"
                  placeholder="Please enter user name"
                  defaultValue={task.task_name}
                />
              </Box>

              <Box>
                <FormLabel htmlFor="owner">task status</FormLabel>
                <Select id="owner" defaultValue={task.status} ref={Taskstatus}>
                  <option value="Todo">Todo</option>
                  <option value="In-progess">In-progess</option>
                  <option value="Done">Done</option>
                </Select>
              </Box>

              <Box>
                <FormLabel htmlFor="owner">Change assignee</FormLabel>
                <Select
                  id="owner"
                  defaultValue={task.assigned}
                  ref={assignedUser}
                >
                  {users.map((singleuser) => {
                    return (
                      <option value={singleuser._id}>{singleuser.name}</option>
                    );
                  })}
                </Select>
              </Box>
            </Stack>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={handleClick}>
              Submit
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SingleTaskMode;
