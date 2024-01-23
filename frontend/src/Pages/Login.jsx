import React, { useCallback, useRef, useState } from "react";
import axios from "axios";
import {
  Stack,
  InputGroup,
  InputRightElement,
  Button,
  Input,
  Flex,
  Box,
  Text,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";

import { useNavigate, Link } from "react-router-dom";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useEffect } from "react";
const Login = () => {
  const toast = useToast();
  const [load, setLoading] = useState(false);
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const navigate = useNavigate();
  const [sign, setSign] = useState({
    userName: "",
    password: "",
  });

  const handleChange = ({ target: { name, value } }) => {
    setSign({ ...sign, [name]: value });
  };
  const loginUser = useCallback(async () => {
    setLoading(true);
    await axios
      .post("https://convert-authapi.vercel.app/api/login", {
        userName: sign.userName.trim(),
        password: sign.password.trim(),
      })
      .then((response) => {
        // console.log(response.data.success);
        if (response.data.status === "ok") {
          setSign({
            fullName: "",
            userName: "",
            email: "",
            password: "",
          });
          setLoading(false);
          toast({
            description: "Login Successfully.",
            status: "success",
            duration: 2000,
            isClosable: true,
            position: "top-right",
          });
          setTimeout(() => {
            navigate("/converter");
          }, 1500);
        }
      })
      .catch((error) => {
        // console.log(error);
        toast({
          title: "Authentication Error",
          description: error.response.data.error || error.message,
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [navigate, toast, sign]);

  useEffect(() => {
    if (load) {
      loginUser();
    }
  }, [loginUser, load]);
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
  };

  return (
    <Flex
      bgGradient="linear(to-t, #ae085c, #2e0656)"
      height="100vh"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      textAlign="center"
    >
      <Text
        fontWeight="bold"
        color="white"
        fontSize={{ base: "xl", sm: "3xl" }}
      >
        Currency Converter & Exchange Rates
      </Text>
      <Text
        fontWeight="medium"
        color="white"
        paddingBottom="2.5rem"
        fontSize="sm"
      >
        Convert money from one currency using Up to date FX rates
      </Text>
      <Box
        width={{ base: "85vw", sm: "33vw" }}
        bgColor="white"
        margin="0 auto"
        rounded="md"
      >
        <Text
          paddingTop="2rem"
          fontSize="1.5rem"
          fontWeight="500"
          textAlign="center"
        >
          Welcome to Login
        </Text>

        <form onSubmit={handleSubmit}>
          <Stack spacing={4} margin={{ base: "1rem", sm: "3rem" }}>
            <Input
              type="text"
              variant="outline"
              placeholder="Username"
              name="userName"
              value={sign.userName}
              onChange={handleChange}
              size="lg"
              borderColor="black.500"
              _hover="none"
              focusBorderColor="purple.400"
            />
            <InputGroup size="lg">
              <Input
                pr="4.5rem"
                type={show ? "text" : "password"}
                variant="outline"
                placeholder="Password"
                name="password"
                value={sign.password}
                onChange={handleChange}
                size="lg"
                borderColor="black.500"
                _hover="none"
                focusBorderColor="purple.400"
              />
              <InputRightElement width="4.5rem" onClick={handleClick}>
                {show ? <ViewIcon /> : <ViewOffIcon />}
              </InputRightElement>
            </InputGroup>
            <Button
              size="lg"
              type="submit"
              bgColor="pink.500"
              color="white"
              _hover={{ bgColor: "pink.400" }}
              isLoading={load}
              loadingText="Login"
              variant="outline"
            >
              Submit
            </Button>

            <Text>
              Dont have an Account?{" "}
              <Link to="/register">
                <span style={{ color: "blue" }}>Register Here</span>
              </Link>
            </Text>
          </Stack>
        </form>
      </Box>
    </Flex>
  );
};

export default Login;
