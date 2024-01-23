import React, { useCallback, useEffect, useState } from "react";
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

import { useNavigate, Link } from "react-router-dom";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { useToast } from "@chakra-ui/react";

const Register = () => {
  const toasted = useToast();
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(prevState=>!prevState);
  const navigate = useNavigate();
  const [load, setLoading] = useState(false);
  const [sign, setSign] = useState({
    fullName: "",
    userName: "",
    email: "",
    password: "",
    confirmPass: "",
  });

  const handleChange = ({ target: { name, value } }) => {
    setSign({ ...sign, [name]: value });
  };

  const postData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:3000/api/register", {
        fullName: sign.fullName.trim(),
        userName: sign.userName.trim(),
        email: sign.email.trim(),
        password: sign.password.trim(),
        confirmPass: sign.confirmPass.trim(),
      });
      if (response.data.status === "ok") {
        
        setSign({
          fullName: "",
          userName: "",
          email: "",
          password: "",
          confirmPass:""
        });
        setLoading(false);
        toasted({
          title: "Account created.",
          description: "Your Account has been created Successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right"
        });
        toasted({
          description: "You'll be redirected to login page Now.",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right"
        });
        // toast.success(response.data.success);

        setTimeout(() => {
          navigate("/");
        }, 4000);
      }
    } catch (error) {
      // console.error(error);
      toasted({
        title: "Error Setting Up .",
        description: error.response?.data.error || error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
  },[sign,navigate,toasted]);

  useEffect(() => {
    if (load) {
      postData();
    }
  }, [load, postData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let { password, confirmPass } = sign;
    if (password !== confirmPass) {
      toasted({
        description: "Your password does not match.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      setLoading(false);
    } else {
      // Trigger the HTTP request in useEffect
      setLoading(true);
    }

    // Without using useEffect
    // await axios.post("http://localhost:3000/api/register", {
    //     fullName: sign.fullName.trim(),
    //     userName: sign.userName.trim(),
    //     email: sign.email.trim(),
    //     password: sign.password.trim(),
    //     confirmPass: sign.confirmPass.trim(),
    //   })
    //   .then((response) => {
    //     console.log(response);
    //     if (response.data.status === "ok") {
    //       // console.log(response);
    //       setSign({
    //         fullName: "",
    //         userName: "",
    //         email: "",
    //         password: "",
    //       });
    //       setLoading(false);
    //       toasted({
    //         title: "Account created.",
    //         description: "Your Account has been created Successfully.",
    //         status: "success",
    //         duration: 3000,
    //         isClosable: true,
    //       });
    //       toasted({
    //         description: "You'll be redirected to login page Now.",
    //         status: "success",
    //         duration: 3000,
    //         isClosable: true,
    //       });
    //       // toast.success(response.data.success);

    //       setTimeout(() => {
    //         navigate("/");
    //       }, 4000);
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     setLoading(false);
    //     // toast.error(`${error.response.data.error}`);
    //     toasted({
    //       title: "Error Setting Up .",
    //       description: error.response.data.error || error.message,
    //       status: "error",
    //       duration: 3000,
    //       isClosable: true,
    //       position: "top-right",
    //     });
    //   });
  };

  return (
    <>
      {/* <ToastContainer /> */}
      <Flex
        bgGradient="linear(to-t, #ae085c, #2e0656)"
        height="100vh"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        textAlign="center"
      >
        <Box
          width={{ base: "85vw", sm: "35vw" }}
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
            Register
          </Text>

          <form onSubmit={handleSubmit}>
            <Stack spacing={4} margin={{ base: "1rem", sm: "3rem" }}>
              <Input
                type="text"
                variant="outline"
                placeholder="Enter FullName"
                name="fullName"
                value={sign.fullName}
                onChange={handleChange}
                size="lg"
                borderColor="black.500"
                _hover="none"
                focusBorderColor="purple.400"
              />
              <Input
                type="email"
                variant="outline"
                placeholder="Enter Email"
                name="email"
                value={sign.email}
                onChange={handleChange}
                size="lg"
                borderColor="black.500"
                _hover="none"
                focusBorderColor="purple.400"
                required
              />
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
                required
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
                  required
                />
                <InputRightElement width="4.5rem" onClick={handleClick}>
                  {show ? <ViewIcon /> : <ViewOffIcon />}
                </InputRightElement>
              </InputGroup>
              <InputGroup size="lg">
                <Input
                  pr="4.5rem"
                  type={show ? "text" : "password"}
                  variant="outline"
                  placeholder="Confirm Password"
                  name="confirmPass"
                  value={sign.confirmPass}
                  onChange={handleChange}
                  size="lg"
                  borderColor="black.500"
                  _hover="none"
                  focusBorderColor="purple.400"
                  required
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
                loadingText="Submitting"
                variant="outline"
              >
                Submit
              </Button>

              <Text>
                Already have an Account ?{" "}
                <Link to="/">
                  <span style={{ color: "blue" }}>Login Here</span>
                </Link>
              </Text>
            </Stack>
          </form>
        </Box>
      </Flex>{" "}
    </>
  );
};

export default Register;
