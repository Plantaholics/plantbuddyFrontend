import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import authService from "../services/auth.services";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Text,
  VStack,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import backgroundlogin from "../assets/backgroundlogin.png";


const API_URL = "http://localhost:5010";

function LoginPage(prop) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => setIsOpen(false);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    // replacing axios.post
    authService
      .login(requestBody)
      .then((response) => {
        // console.log("JWT token", response.data.authToken);
        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/");
      })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.message) {
          setErrorMessage(err.response.data.message);
          setIsOpen(true);
        } else {
          setErrorMessage("An unexpected error occurred.");
          setIsOpen(true);
        }
      });
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minH="100vh"
      p={16}
      backgroundImage={backgroundlogin}
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
    >
      <Box w="full" maxW="md" bg="green.300" p={6} rounded="md" shadow="lg">
        <Heading as="h2" size="xl" textAlign="center" color="green.900" mb={6}>
          Plantbuddy credentials
        </Heading>

        <form onSubmit={handleLoginSubmit}>
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

            <Button
              type="submit"
              colorScheme="green"
              bg="green.700"
              color="white"
              _hover={{ bg: "green.800" }}
              w="full"
            >
              Login
            </Button>
          </VStack>
        </form>

        <AlertDialog isOpen={isOpen} onClose={onClose}>
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Error
              </AlertDialogHeader>

              <AlertDialogBody color="red.500">{errorMessage}</AlertDialogBody>

              <AlertDialogFooter>
                <Button onClick={onClose}>Close</Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>

        <Text mt={6} textAlign="center" color="green.900">
          Not a plantbuddy yet?
        </Text>
        <Link href="/signup" w="full">
          <Button
            mt={2}
            w="full"
            colorScheme="green"
            bg="green.700"
            color="white"
            _hover={{ bg: "green.800" }}
          >
            Join us
          </Button>
        </Link>
      </Box>
    </Box>
  );
}

export default LoginPage;
