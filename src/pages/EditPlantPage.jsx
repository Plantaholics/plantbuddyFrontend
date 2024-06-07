import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import plantsService from "../services/plants.services";
import AddCare from "../components/AddCare";
import {
  Box,
  Button,
  Heading,
  Input,
  Select,
  Text,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useToast,
} from "@chakra-ui/react";
const API_URL = "http://localhost:5010";
function EditPlantPage(props) {
  const [common_name, setCommonName] = useState("");
  const [scientific_name, setScientificName] = useState("");
  const [origin, setOrigin] = useState("");
  const [family, setFamily] = useState("");
  const [picture_url, setPictureUrl] = useState("");
  const [careId, setCareId] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const cancelRef = useRef();
  const { plantId } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  // Define storedToken in the component's scope
  const storedToken = localStorage.getItem("authToken");

  useEffect(() => {
  const storedToken = localStorage.getItem("authToken");
    // Fetch plant data from the API

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
        }
      })
      .catch((err) => {
        toast({
          title: "Error",
          description: "Error fetching plant data. Please try again later.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  }, [plantId, toast]);
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
    .updatePlant(plantId, requestBody, storedToken)
    .then((response) => {
      // Optionally navigate after a delay to show the success message
      setTimeout(() => {
        navigate(`/plants/${plantId}`);
      }, 2000);
    })
    .catch((err) => {
      if (err.response && err.response.status === 403) {
        toast({
          title: "Error",
          description: "You can't edit this plant.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Success",
          description: "Success updating plantbuddy!",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }
      });
  };
  const deletePlant = () => {
    plantsService
      .deletePlant(plantId)
      .then(() => {
        navigate("/plants");
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: "Error",
          description: "Error deleting plantbuddy.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };
  const handleDeleteClick = () => {
    setIsDeleteDialogOpen(true);
  };
  const handleDeleteConfirm = () => {
    setIsDeleteDialogOpen(false);
    deletePlant();
  };
  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
  };
  const handleFamilyChange = (e) => {
    setFamily(e.target.value);
  };
  return (
    <Box
      p={{ base: 4, md: 6 }}
      display="flex"
      justifyContent="center"
      maxH={"200vh"}
      mb={"50px"}
    >
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
        <AddCare plantId={plantId} careId={careId} />
        <Button
          onClick={handleDeleteClick}
          colorScheme="red"
          mt={4}
          width="100%"
        >
          Oh no, bye Buddy
        </Button>
        <AlertDialog
          isOpen={isDeleteDialogOpen}
          leastDestructiveRef={cancelRef}
          onClose={handleDeleteCancel}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Delete Plant
              </AlertDialogHeader>
              <AlertDialogBody>
                Are you sure you want to delete your plant buddy?
              </AlertDialogBody>
              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={handleDeleteCancel}>
                  Cancel
                </Button>
                <Button colorScheme="red" onClick={handleDeleteConfirm} ml={3}>
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </Box>
      {successMessage && (
        <Box mb={4} color="green.500">
          <Text>{successMessage}</Text>
        </Box>
      )}
    </Box>
  );
}

export default EditPlantPage;
