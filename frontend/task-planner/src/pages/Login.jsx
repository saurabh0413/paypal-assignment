import axios from "axios";
import React, { useCallback } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const INITDATA = {
  email: "",
  password: "",
};
export const Login = () => {
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
  const submiForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios
        .post("https://paypal-ktp5.onrender.com/login", formData)
        .then((res) => {
          localStorage.setItem("token", JSON.stringify(res.data.token));
          navigate("/dashboard");
        });
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };
  const { email, password } = formData;
  return (
    <>
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
          Log up
        </Heading>
        <form onSubmit={submiForm}>
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

export default Login;
