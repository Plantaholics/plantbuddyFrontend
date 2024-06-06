import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import authService from "../services/auth.services";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  VStack, useToast
} from "@chakra-ui/react";
import backgroundsignup from "../assets/backgroundsignup.png";

const API_URL = "http://localhost:5010";

function SignupPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();
  const toast = useToast();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password, name };

    // replace axios.post
    authService
      .signup(requestBody)
      .then((response) => {
        navigate("/login");
        toast({
          title: "Signup successful", 
          description: "Congrats! You are all signed up.", 
          status: "success",
          duration: 5000,
          isClosable: true,
        })
      })
      .catch((err) => {
        let errorDescription = "An unexpected error occured";
        if (err.response && err.response.data) {
          if (err.response.data.message) {
            errorDescription = err.response.data.message;
          } else if (err.response.status === 409) { // User already exists
            errorDescription = "This user is already a Plantbuddy. Please try another one!";
          } else {
            errorDescription =
              "An error occurred, no message provided by the server";
          }
        } else {
          errorDescription = "No response from the server";
        }
        setErrorMessage(errorDescription);
      });
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minH="100vh"
      p={16}
      backgroundImage={backgroundsignup}
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
    >
      <Box w="full" maxW="md" bg="green.300" p={6} rounded="md" shadow="lg">
        <Heading as="h2" size="xl" textAlign="center" color="green.900" mb={6}>
          Join us
        </Heading>

        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl>
              <FormLabel color="green.900">Email:</FormLabel>
              <Input
                type="email"
                name="email"
                value={email}
                onChange={handleEmail}
                bg="green.100"
                focusBorderColor="green.400"
                placeholder="Enter your email"
              />
            </FormControl>

            <FormControl>
              <FormLabel color="green.900">Password:</FormLabel>
              <Input
                type="password"
                name="password"
                value={password}
                onChange={handlePassword}
                bg="green.100"
                focusBorderColor="green.400"
                placeholder="Enter your password"
              />
            </FormControl>

            <FormControl>
              <FormLabel color="green.900">Name:</FormLabel>
              <Input
                type="text"
                name="name"
                value={name}
                onChange={handleName}
                bg="green.100"
                focusBorderColor="green.400"
                placeholder="Enter your name"
              />
            </FormControl>

            <Button
              type="submit"
              colorScheme="green"
              bg="green.700"
              color="white"
              _hover={{ bg: "green.800" }}
              w="full"
            >
              Sign Up
            </Button>
          </VStack>
        </form>

        {errorMessage && (
          <Text mt={4} textAlign="center" color="red.500">
            {errorMessage}
          </Text>
        )}
   
        <Text mt={6} textAlign="center" color="green.900">
          Already a Plantbuddy?
        </Text>

        <Link to="/login" w="full">
          <Button
            mt={2}
            w="full"
            colorScheme="green"
            bg="green.700"
            color="white"
            _hover={{ bg: "green.800" }}
          >
            Log In
          </Button>
        </Link>
      </Box>
    </Box>
  );
}

export default SignupPage;
