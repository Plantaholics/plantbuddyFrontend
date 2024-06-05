import { useState } from "react";
import { useNavigate } from "react-router-dom";
import plantsService from "../services/plants.services";
import { Box, Button, FormControl, FormLabel, Input, Select, Heading, Text } from "@chakra-ui/react";

const API_URL = "http://localhost:5010";

function AddPlant(props) {
  const [common_name, setCommonName] = useState("");
  const [scientific_name, setScientificName] = useState("");
  const [origin, setOrigin] = useState("");
  const [family, setFamily] = useState("");
  const [picture_url, setPictureUrl] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const navigate = useNavigate();

  const handleFileUpload = (e) => {
    const uploadData = new FormData();
    uploadData.append("file", e.target.files[0]);

    fileUploadService
      .uploadImage(uploadData)
      .then(response => {
        setPictureUrl(response.fileUrl);
      })
      .catch(err => console.log("Error while uploading the file: ", err));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!common_name || !picture_url || typeof origin !== "string" || typeof family !== "string") {
      setShowPopup(true);
      return;
    }

    const requestBody = { common_name, scientific_name, origin, family, picture_url };

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
        setShowSuccess(true);
      })
      .catch((err) => console.log(err));
      setShowError(true);
  };

  const handleChange = (e) => {
    e.preventDefault();
    setFamily(String(e.target.value));
  };

  return (
    <Box p={6} bg="white" shadow="md" borderRadius="md" w="full" maxW="md">
      <Heading as="h3" size="lg" mb={4} color="green.500">
        Add new Buddy
      </Heading>

      <form onSubmit={handleFormSubmit}>
        <FormControl>
          <FormLabel>Common name</FormLabel>
          <Input type="text" name="common_name" value={common_name} onChange={(e) => setCommonName(e.target.value)} required />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Scientific name</FormLabel>
          <Input type="text" name="scientific_name" value={scientific_name} onChange={(e) => setScientificName(e.target.value)} />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Origin</FormLabel>
          <Input type="text" name="origin" value={origin} onChange={(e) => setOrigin(e.target.value)} />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Family</FormLabel>
          <Select name="family" value={family} onChange={handleChange}>
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

        <FormControl mt={4}>
          <FormLabel>Image</FormLabel>
          <Input type="text" name="picture_url" value={picture_url} onChange={(e) => setPictureUrl(e.target.value)} required />
        </FormControl>

        <Button type="submit" mt={4} colorScheme="green">
          Submit
        </Button>
      </form>

      {/* Popup message */}
      {showPopup && (
        <Text mt={2} color="red.500">
          Please fill in all required fields.
        </Text>
      )}
            {/* Success message */}
            {showSuccess && (
        <Text mt={2} color="green.500">
          Buddy successfully added!
        </Text>
      )}
            {showError && (
        <Text mt={2} color="red.500">
          Error while adding the new buddy.
        </Text>
      )}
    </Box>
  );
}

export default AddPlant;