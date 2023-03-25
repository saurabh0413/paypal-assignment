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
import React, { useEffect, useState } from "react";
import { Singletask } from "./Singletask";

const SingleTaskMode = ({ task }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = React.useRef();
  const assignedUser = React.useRef()
  const Taskstatus = React.useRef()
  const [users, setUsers] = useState([]);
  const getusers = () => {
    axios.get("http://localhost:8585").then((res) => {
      setUsers(res.data);
    });
  };
  useEffect(() => {
    getusers();
  }, []);

  const handleClick = ()=>{
    // axios.patch(`http://localhost:8585/tasks/${task._id}`,{
    //     task_name:firstField.current.value,
    //     status:Taskstatus.current.value,
    //     assigned:assignedUser.current.value
    // })
  }
  return (
    <>
      {/* <Button leftIcon={<AddIcon />} colorScheme="teal" onClick={onOpen}>
        Create user
      </Button> */}
      <Text onClick={onOpen} textDecoration="underline">
        {task.task_name}
      </Text>
      <Text pt={5}>
        Assignee: {task.assigned ? task["assigned"] : "Not assigned"}
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
            <Button colorScheme="blue" onClick={handleClick}>Submit</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SingleTaskMode;
