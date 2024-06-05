import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import plantsService from "../services/plants.services";
import caresService from "../services/cares.services";
import AddCare from "../components/AddCare";
import { Box, Button, Heading, Input, Select, Text } from "@chakra-ui/react";

const API_URL = "http://localhost:5010";

function EditPlantPage(props) {
  const [common_name, setCommonName] = useState("");
  const [scientific_name, setScientificName] = useState("");
  const [origin, setOrigin] = useState("");
  const [family, setFamily] = useState("");
  const [picture_url, setPictureUrl] = useState("");
  const [careId, setCareId] = useState("");

  const { plantId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");

    // plant data from the API

    plantsService
      .getPlant(plantId, storedToken)
      .then((response) => {
        const onePlant = response.data;
        setCommonName(onePlant.common_name);
        setScientificName(onePlant.scientific_name);
        setOrigin(onePlant.origin);
        setFamily(onePlant.family);
        setPictureUrl(onePlant.picture_url);

        if (onePlant.care) {
          setCareId(onePlant.care._id);
          console.log("careId", onePlant.care._id);
        }
      })
      .catch((err) => console.log(err));
  }, [plantId]);


  const handleFormSubmit = (e) => {
    e.preventDefault();
    const requestBody = {
      common_name,
      scientific_name,
      origin,
      family,
      picture_url,
    };

    // Update the plant using plantsService
    plantsService
      .updatePlant(plantId, requestBody)
      .then((response) => {
        navigate(`/plants/${plantId}`);
      })
      .catch((err) => console.log(err));
  };

  const deletePlant = () => {
    plantsService
      .deletePlant(plantId)
      .then(() => {
        navigate("/plants");
      })
      .catch((err) => console.log(err));
  };

  const handleFamilyChange = (e) => {
    setFamily(e.target.value);
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
        <Heading as="h3" size="lg" mb={4} color="green.500">
          Edit your buddy
        </Heading>
        <form onSubmit={handleFormSubmit}>
          <Box mb={4}>
            <Text mb={2}>Common name</Text>
            <Input
              type="text"
              name="common_name"
              value={common_name}
              onChange={(e) => setCommonName(e.target.value)}
            />
          </Box>

          <Box mb={4}>
            <Text mb={2}>Scientific name</Text>
            <Input
              type="text"
              name="scientific_name"
              value={scientific_name}
              onChange={(e) => setScientificName(e.target.value)}
            />
          </Box>

          <Box mb={4}>
            <Text mb={2}>Origin</Text>
            <Input
              type="text"
              name="origin"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
            />
          </Box>

          <Box mb={4}>
            <Text mb={2}>Family</Text>
            <Select name="family" value={family} onChange={handleFamilyChange}>
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
          </Box>

          <Box mb={4}>
            <Text mb={2}>Image</Text>
            <Input
              type="text"
              name="picture_url"
              value={picture_url}
              onChange={(e) => setPictureUrl(e.target.value)}
            />
          </Box>

          <Button type="submit" colorScheme="green" mb={4} width="100%">
            Update Plant
          </Button>
        </form>

        <AddCare plantId={plantId} />

        <Button onClick={deletePlant} colorScheme="red" mt={4} width="100%">
          Oh no, bye Buddy
        </Button>
      </Box>
    </Box>
  );
}

export default EditPlantPage;
