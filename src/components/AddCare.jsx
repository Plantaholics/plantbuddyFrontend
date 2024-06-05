import { useState, useEffect } from "react";
import careService from "../services/cares.services";
import { useNavigate } from "react-router-dom";
import { Box, Button, Heading, Input, Select, Text } from "@chakra-ui/react";

function AddCare(props) {
  const [water, setWater] = useState("");
  const [fertilization, setFertilization] = useState("");
  const [benefits, setBenefits] = useState("");
  const [sunlight, setSunlight] = useState("");
  const [preferred_area, setPreferredArea] = useState("");
  const [plantId, setPlantId] = useState(props.plantId || "");
  const [careId, setCareId] = useState(props.careId || ""); // This is the careId of the care we want to update

  const navigate = useNavigate();

  useEffect(() => {
    if (careId) {
      // Fetch the existing care details if careId is provided
      careService
        .getCare(careId)
        .then((response) => {
          const care = response.data;
          setWater(care.water);
          setFertilization(care.fertilization);
          setBenefits(care.benefits);
          setSunlight(care.sunlight);
          setPreferredArea(care.preferred_area);
          setPlantId(care.plant);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  useEffect(() => {
    console.log("Received careId:", props.careId);
    setCareId(props.careId); // Actualizar careId cuando cambie en las props
  }, [props.careId]);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const requestBody = {
      water,
      fertilization,
      benefits,
      sunlight,
      preferred_area,
      plantId,
    };

    if (careId) {
      // Update existing care
      careService
        .updateCare(careId, requestBody)
        .then((response) => {
          if (props.refreshPlant) {
            props.refreshPlant();
          }
          navigate(`/plants/${plantId}`);
        })
        .catch((err) => console.log(err));
    } else {
      // Create new care
      careService
        .createCare(requestBody)
        .then((response) => {
          setWater("");
          setFertilization("");
          setBenefits("");
          setSunlight("");
          setPreferredArea("");
          setPlantId("");
          if (props.refreshPlant) {
            props.refreshPlant();
          }
          navigate(`/plants/${plantId}`);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
<Box p={{ base: 4, md: 6 }} display="flex" justifyContent="center">
      <Box
        p={{ base: 4, md: 6 }}
        width="100%"
        maxWidth="500px"
        bg="white"
        shadow="md"
        borderRadius="md"
        border="2px solid"
        borderColor="green.500"
      >
        <Heading as="h3" size="md" mb={4} color="green.500">
          How do you take care of it?
        </Heading>
        <form onSubmit={handleFormSubmit}>
          <Box mb={4}>
            <Text mb={2}>Water</Text>
            <Select name="water" value={water} onChange={(e) => setWater(e.target.value)}>
              <option value="">Select an option</option>
              <option value="once a day">once a day</option>
              <option value="once a week">once a week</option>
              <option value="twice a week">twice a week</option>
              <option value="once every two weeks">once every two weeks</option>
              <option value="once a month">once a month</option>
            </Select>
          </Box>

          <Box mb={4}>
            <Text mb={2}>Fertilization</Text>
            <Select
              name="fertilization"
              value={fertilization}
              onChange={(e) => setFertilization(e.target.value)}
            >
              <option value="">Select an option</option>
              <option value="every month">every month</option>
              <option value="every 3 months">every 3 months</option>
              <option value="every 6 months">every 6 months</option>
            </Select>
          </Box>

          <Box mb={4}>
            <Text mb={2}>Benefits</Text>
            <Input
              type="text"
              name="benefits"
              value={benefits}
              onChange={(e) => setBenefits(e.target.value)}
            />
          </Box>

          <Box mb={4}>
            <Text mb={2}>Sunlight</Text>
            <Select name="sunlight" value={sunlight} onChange={(e) => setSunlight(e.target.value)}>
              <option value="">Select an option</option>
              <option value="morning">morning</option>
              <option value="midday">midday</option>
              <option value="afternoon">afternoon</option>
              <option value="all day">all day</option>
            </Select>
          </Box>

          <Box mb={4}>
            <Text mb={2}>Preferred area</Text>
            <Select
              name="preferred_area"
              value={preferred_area}
              onChange={(e) => setPreferredArea(e.target.value)}
            >
              <option value="">Select an option</option>
              <option value="only indoor">only indoor</option>
              <option value="only outdoor">only outdoor</option>
              <option value="indoor/outdoor">indoor/outdoor</option>
              <option value="humid places">humid places</option>
              <option value="dry places">dry places</option>
            </Select>
          </Box>

          <Button type="submit" colorScheme="green" width="100%">
            {careId ? "Update care" : "Add care to your buddy"}
          </Button>
        </form>
      </Box>
    </Box>
  );
}

export default AddCare;
