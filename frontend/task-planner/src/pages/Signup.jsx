import React, { useCallback } from "react";
import { useState } from "react";
import styles from "./Signup.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
const INITDATA = {
  name: "",
  email: "",
  password: "",
};
const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(INITDATA);
  const [loading, setLoading] = useState(false);

  const handleChange = useCallback(
    (e) => {
      const { value, name } = e.target;
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    },
    [formData]
  );

  const submiForm = useCallback(
    async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
        const res = await axios.post(
          "https://paypal-ktp5.onrender.com",
          formData
        );
        console.log("signup done", res.data);
        navigate("/login");
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    },
    [formData, navigate]
  );
  const { name, email, password } = formData;
  return (
    <>
      <Heading as="h1" mb="8" textAlign="center">
        Task Planner
      </Heading>
      <Box
        maxW="md"
        mx="auto"
        mt="8"
        p="6"
        rounded="md"
        boxShadow="lg"
        bg="white"
      >
        <Heading as="h1" mb="8" textAlign="center">
          Sign up
        </Heading>
        <form onSubmit={submiForm}>
          <FormControl mb="4">
            <FormLabel htmlFor="name">Name</FormLabel>
            <Input
              type="text"
              id="name"
              value={name}
              name="name"
              onChange={handleChange}
              required
            />
          </FormControl>
          <FormControl mb="4">
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              type="email"
              id="email"
              value={email}
              name="email"
              onChange={handleChange}
              required
            />
          </FormControl>
          <FormControl mb="4">
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              type="password"
              id="password"
              value={password}
              name="password"
              onChange={handleChange}
              required
            />
          </FormControl>
          <Button
            type="submit"
            colorScheme="teal"
            size="lg"
            w="full"
            disabled={loading}
          >
            {loading ? "Loading..." : "Signup"}
          </Button>
        </form>
      </Box>
    </>
  );
};

export default Signup;
