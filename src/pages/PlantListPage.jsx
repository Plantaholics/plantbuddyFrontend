import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PlantCard from "../components/PlantCard";
import AddPlant from "../components/AddPlant";
import plantsService from "../services/plants.services";
import { Grid, Box } from "@chakra-ui/react";
import { AuthContext } from "../context/auth.context";

const API_URL = "http://localhost:5010";

function PlantListPage(props) {
  const navigate = useNavigate();
  const [plants, setPlants] = useState([]);
  const { isLoggedIn } = useContext(AuthContext);

  const getAllPlants = () => {
    plantsService
      .getAllPlants()
      .then((response) => setPlants(response.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getAllPlants();
  }, []);

  return (
    <>
      { isLoggedIn && <AddPlant refreshPlant={getAllPlants} />}
      <Grid templateColumns="repeat(4, 1fr)" gap={4} mt="20px">
        {plants.map((plant) => (
          <Box key={plant._id}>
            <PlantCard plant={plant} />
          </Box>
        ))}
      </Grid>
    </>
  );
}

export default PlantListPage;
