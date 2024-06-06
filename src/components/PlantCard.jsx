import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";
import { Box, Button, Image, Text } from '@chakra-ui/react';

//destructuring the plant object from the props =>
function PlantCard({ plant }) {

  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/plants/${plant._id}`);
  }

  const { isLoggedIn } = useContext(AuthContext);
  
  return (
    <Box m={{ base: "2", md: "2", lg: "6" }} maxW="md" height="500px" borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="md" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <Box p="6" textAlign="center">
        <Box>
          <Text fontWeight="bold" fontSize="2xl" mr="2">
            {plant.common_name}
          </Text>
          <Text color="gray.500" fontSize="lg">
            {plant.scientific_name}
          </Text>
        </Box>

        <Text mt="2" color="gray.600" fontSize="lg" fontWeight="semibold">
          Origin: {plant.origin}
        </Text>
        <Text mt="2" color="gray.600" fontSize="lg" fontWeight="semibold">
          Family: {plant.family}
        </Text>

        <Image mt="4" width="225px" height="225px" borderRadius="10px" src={plant.picture_url} alt="Plant" />

        { isLoggedIn &&
        <Button mt="4" onClick={handleClick} colorScheme="green" variant="solid" >
          View more
        </Button>
        }
      </Box>
    </Box>
  );
}

export default PlantCard;

