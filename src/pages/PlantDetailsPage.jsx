import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import careService from "../services/cares.services";
import plantsService from "../services/plants.services";
import { Box, Button, Heading, Text, Flex } from "@chakra-ui/react";

const API_URL = "http://localhost:5010";

function PlantDetailsPage() {
  const [plant, setPlant] = useState("");
  const { plantId } = useParams();

  const getPlant = () => {
    const storedToken = localStorage.getItem("authToken");

    plantsService
      .getPlant(plantId)
      .then((response) => {
        console.log("API Response:", response.data);
        const onePlant = response.data;
        setPlant(onePlant);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getPlant();
  }, []);

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      minH="100vh"
      bg="gray.50"
      p={4}
    >
      <Box
        p={6}
        bg="white"
        shadow="md"
        borderWidth="2px"
        pb={5}
        borderRadius={"lg"}
        borderColor={"#38a169"}
        w="full"
        maxW="2xl"
      >
        {plant ? (
          <>
            <Heading as="h1" size="xl" mb={4} textAlign="center">
              {plant.common_name}
            </Heading>
            <Box textAlign="center">
              <Text fontSize="xl" fontWeight="bold" mb={2}>
                Scientific Name: {plant.scientific_name}
              </Text>
              <Text>Origin: {plant.origin}</Text>
              <Text>Family: {plant.family}</Text>
              <Box
                mt={4}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <img src={plant.picture_url} alt="Plant" />
              </Box>
              <Heading as="h2" size="lg" mt={4} mb={2}>
                Plantbuddy care:
              </Heading>
              {plant.care ? (
                <Box>
                  <Text>Water: {plant.care.water}</Text>
                  <Text>Fertilization: {plant.care.fertilization}</Text>
                  <Text>Benefits: {plant.care.benefits}</Text>
                  <Text>Sunlight: {plant.care.sunlight}</Text>
                  <Text>Preferred Area: {plant.care.preferred_area}</Text>
                </Box>
              ) : (
                <Text mt={4}>
                  Sorry, we don't have specific care instructions yet!
                </Text>
              )}
            </Box>
          </>
        ) : (
          <Text textAlign="center">Loading plant details...</Text>
        )}
      </Box>
      <Flex mt={6} w="full" maxW="2xl" justify="space-between" mb={20}>
        <Link to="/plants">
          <Button colorScheme="green">Back to plants</Button>
        </Link>
        <Link to={`/plants/edit/${plantId}`}>
          <Button colorScheme="green">Edit plant</Button>
        </Link>
      </Flex>
    </Flex>
  );
}

export default PlantDetailsPage;
