import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export const Dashboard = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const token = JSON.parse(localStorage.getItem("token"));
  const initialRef = React.useRef(null);
  const handleClick = () => {
    axios
      .post(
        "https://paypal-ktp5.onrender.com/dashboard",
        {
          sprintName: initialRef.current.value,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    onClose();
  };

  const [sprints, setSprints] = useState([]);
  const getSprints = async (req, res) => {
    axios
      .get("https://paypal-ktp5.onrender.com/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setSprints(res.data);
      });
  };
  useEffect(() => {
    getSprints();
  }, []);
  return (
    <>
      <Button onClick={onOpen} colorScheme="blue">
        Create Sprint
      </Button>
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create new sprint</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>sprint name</FormLabel>
              <Input ref={initialRef} placeholder="First name" />
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
      <Heading>Sprints</Heading>
      <SimpleGrid spacing="10px" columns={[1, 2, 3, 4]} mt="50px" ml={10}>
        {sprints &&
          sprints.map((item, index) => {
            return (
              <Box w="300px" h="150px" border="2px solid black">
                <Text fontSize="lg">Sprint:- {item.sprintName}</Text>
                <br />
                <br />
                <Button
                  colorScheme="green"
                  onClick={() => {
                    navigate(`/dashboard/sprints/${item._id}`);
                  }}
                >
                  Go to sprint
                </Button>
              </Box>
            );
          })}
      </SimpleGrid>
    </>
  );
};
