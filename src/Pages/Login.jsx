import React, { useRef, useState } from "react";
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
import { useNavigate } from "react-router-dom";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
const Login = () => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const navigate = useNavigate();
  const timer = useRef();
  const [err, setErr] = useState(false);
  const [sign, setSign] = useState({
  
    userName: "",
    password: "",
  });

  const handleChange = ({ target: { name, value } }) => {
    setSign({ ...sign, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/api/register", {
      
        userName: sign.userName,
        password: sign.password,
      })
      .then((res) => {
        setSign({
          fullName: "",
          userName: "",
          email: "",
          password: "",
        });
        setErr(false);
        navigate("/converter");
      })
      .catch((err) => {
        console.log(err);
        setErr(true);
        timer.current = window.setTimeout(() => {
          setErr(false);
        }, 4000);
      });
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
      <Box width={{ base: "85vw", sm: "33vw" }} bgColor="white" margin="0 auto" rounded='md'>
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
            >
              Submit
            </Button>
            <Text>Dont have an Account ? <a href="/register"> <span style={{color:"blue"}} >Register Here</span></a></Text>
          </Stack>
        </form>
      </Box>
    </Flex>
  );
};

export default Login;
