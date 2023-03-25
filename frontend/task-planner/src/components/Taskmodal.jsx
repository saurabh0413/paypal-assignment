import React, { useContext } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  ButtonGroup,
  IconButton,
  Select,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import axios from "axios";
import { taskContext } from "../context/Tasks";
export const Taskmodal = ({ item }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const token = JSON.parse(localStorage.getItem("token"));
  const { getTasks } = useContext(taskContext);

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const handleClick = () => {
    const data = {
      task_name: initialRef.current.value,
      task_type: finalRef.current.value,
      status: item,
    };
    axios
      .post(
        "https://paypal-ktp5.onrender.com/tasks/create",
        { ...data },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        getTasks();
      });
    onClose();
  };
  return (
    <>
      <ButtonGroup
        size="sm"
        isAttached
        variant="outline"
        onClick={onOpen}
        className="open-modal-bottom"
      >
        <Button>Add Task</Button>
        <IconButton aria-label="Add to friends" icon={<AddIcon />} />
      </ButtonGroup>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a task</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Task Name</FormLabel>
              <Input ref={initialRef} placeholder="First name" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Task Type</FormLabel>
              <Select ref={finalRef}>
                <option value="Bug">Bug</option>
                <option value="Feature">Feature</option>
                <option value="Story">Story</option>
              </Select>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleClick}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
