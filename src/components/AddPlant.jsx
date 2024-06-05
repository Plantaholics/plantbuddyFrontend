import { useState } from "react";
import axios from "axios";
import plantsService from "../services/plants.services";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Heading,
  Flex,
  Center,
} from "@chakra-ui/react";

const API_URL = "http://localhost:5010";

function AddPlant(props) {
  const [common_name, setCommonName] = useState("");
  const [scientific_name, setScientificName] = useState("");
  const [origin, setOrigin] = useState("");
  const [family, setFamily] = useState("");
  const [picture_url, setPictureUrl] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const requestBody = {
      common_name,
      scientific_name,
      origin,
      family,
      picture_url,
    };

    const storedToken = localStorage.getItem("authToken");

    plantsService
      .createPlant(requestBody)
      .then((response) => {
        setCommonName("");
        setScientificName("");
        setOrigin("");
        setFamily("");
        setPictureUrl("");
        props.refreshPlant();
      })
      .catch((err) => {
        setErrorMessage("Error: Unable to add plant. Please try again later."); // Mensaje de error genérico
        console.error("Error adding plant:", err); // Imprimir el error en la consola para depuración
      });
  };

  const handleChange = (e) => {
    e.preventDefault();
    setFamily(e.target.value);
  };

  return (
    <Flex flexDir="column" align="center" mt={10} alignContent={"center"}>
      <Box textAlign={"center"} mb={7}>
        <Heading fontSize={30} color="#38a169">Add new Plantbuddy</Heading>
      </Box>

      <form onSubmit={handleFormSubmit} style={{ width: "400px" }}>
        <Box display="block" flexDirection="column" align={"center"} borderWidth="2px" pb={5} borderRadius={"lg"} borderColor={"#38a169"}>
          <FormControl isRequired>
            <FormLabel textAlign="center" mt={2}>Common name</FormLabel>
            <Input
              width={300}
              type="text"
              name="common_name"
              value={common_name}
              onChange={(e) => setCommonName(e.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel textAlign="center" mt={2}>Scientific name</FormLabel>
            <Input
              width={300}
              type="text"
              name="scientific_name"
              value={scientific_name}
              onChange={(e) => setScientificName(e.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel textAlign="center" mt={2}>Origin</FormLabel>
            <Input
              width={300}
              type="text"
              name="origin"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel textAlign="center" mt={2}>Family</FormLabel>
            <Select
              textAlign={"center"}
              name="family"
              value={family}
              onChange={handleChange}
              width={300}
            >
              <option value="">Pick a family</option>
              <option value="araceae">araceae</option>
              <option value="asparagaceae">asparagaceae</option>
              <option value="polypodiaceae">polypodiaceae</option>
              <option value="pteridaceae">pteridaceae</option>
              <option value="dryopteridaceae">dryopteridaceae</option>
              <option value="asphodelaceae">asphodelaceae</option>
              <option value="moraceae">moraceae</option>
              <option value="musaceae">musaceae</option>
              <option value="asteraceae">asteraceae</option>
            </Select>
          </FormControl>

          <FormControl isRequired>
            <FormLabel textAlign="center" mt={2}>Image</FormLabel>
            <Input
              width={300}
              type="text"
              name="picture_url"
              value={picture_url}
              onChange={(e) => setPictureUrl(e.target.value)}
            />
          </FormControl>

          <Button type="submit" colorScheme="green" mt={4} width={250}>
            Submit
          </Button>
        </Box>
      </form>
    </Flex>
  );
}

export default AddPlant;
