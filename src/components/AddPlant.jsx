import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  Text,
} from "@chakra-ui/react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5010" // THIS IS FOR THE FINAL VERSION

function AddPlant(props) {
  const [common_name, setCommonName] = useState("");
  const [scientific_name, setScientificName] = useState("");
  const [origin, setOrigin] = useState("");
  const [family, setFamily] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [progress, setProgress] = useState(0);

  const navigate = useNavigate();

  const handleFileUpload = (e) => {
    console.log("The file to be uploaded is: ", e.target.files[0]);

    const uploadData = new FormData();

    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new movie in '/api/movies' POST route
    uploadData.append("imageUrl", e.target.files[0]);

    axios
      .post(`${API_URL}/api/upload`, uploadData)
      .then((response) => {
        console.log("response is: ", response);
        // response carries "fileUrl" which we can use to update the state
        setImageUrl(response.fileUrl);
      })
      .catch((err) => console.log("Error while uploading the file: ", err));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (
      !common_name ||
      !imageUrl ||
      typeof origin !== "string" ||
      typeof family !== "string"
    ) {
      setShowPopup(true);
      return;
    }

    try {
      const requestBody = {
        common_name,
        scientific_name,
        origin,
        family,
        picture_url: imageUrl, // Assuming upload response has filename
      };

      await plantsService.createPlant(requestBody);
      setCommonName("");
      setScientificName("");
      setOrigin("");
      setFamily("");
      setImageUrl("");
      props.refreshPlant();
      setShowSuccess(true);
    } catch (err) {
      setErrorMessage("Error: Unable to add plant. Please try again later."); // Generic error message
      console.error("Error adding plant:", err);
      setShowError(true);
    }
  };

  const handleChange = (e) => {
    setFamily(e.target.value);
  };

  return (
    <Flex flexDir="column" align="center" mt={10} alignContent={"center"}>
      <Box textAlign={"center"} mb={7}>
        <Heading fontSize={30} color="#38a169">
          Add new Plantbuddy
        </Heading>
      </Box>

      <form onSubmit={handleFormSubmit} style={{ width: "400px" }}>
        <Box
          display="block"
          flexDirection="column"
          align={"center"}
          borderWidth="2px"
          pb={5}
          borderRadius={"lg"}
          borderColor={"#38a169"}
        >
          <FormControl isRequired>
            <FormLabel textAlign="center" mt={2}>
              Common name
            </FormLabel>
            <Input
              width={300}
              type="text"
              name="common_name"
              value={common_name}
              onChange={(e) => setCommonName(e.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel textAlign="center" mt={2}>
              Scientific name
            </FormLabel>
            <Input
              width={300}
              type="text"
              name="scientific_name"
              value={scientific_name}
              onChange={(e) => setScientificName(e.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel textAlign="center" mt={2}>
              Origin
            </FormLabel>
            <Input
              width={300}
              type="text"
              name="origin"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel textAlign="center" mt={2}>
              Family
            </FormLabel>
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
            <FormLabel textAlign="center" mt={2}>
              Image
            </FormLabel>
            <Input width={300} type="file" onChange={handleFileUpload} />
          </FormControl>

          <Button type="submit" colorScheme="green" mt={4} width={250}>
            Submit
          </Button>
          {showPopup && (
        <Text mt={2} color="red.500">
          Please fill in all required fields.
        </Text>
      )}

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
      </form>
    </Flex>
  );
}

export default AddPlant;
