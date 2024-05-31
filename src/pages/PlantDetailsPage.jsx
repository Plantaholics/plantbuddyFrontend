import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import AddPlantCare from "../components/AddPlantCare";
import PlantCareCard from "../components/PlantCareCard";
import plantsService from "../services/plants.services";
import plantCaresService from "../services/plantCares.services";
<<<<<<< HEAD
import PlantCard from "../components/PlantCard";
=======
// import PlantCard from "../components/PlantCard";
>>>>>>> a2a7af1562f03b561b3b538f99b4a02be16ca25a

const API_URL = "http://localhost:5010";



function PlantDetailsPage() {
  const [plant, setPlant] = useState(null);
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
    <div>
      <div>
        <h1>This is the plant details page</h1>
        {plant && (
          <>
            <h3>{plant.common_name}</h3>
            <p>Scientific Name: {plant.scientific_name}</p>
            <p>Origin: {plant.origin}</p>
            <p>Family: {plant.family}</p>
            <p><img src={plant.picture_url} alt="this is a plant" /></p>
          </>
        )}
      </div>

        <AddPlantCare refreshPlant={getPlant} plantId={plantId} />

      <Link to="/plants">
        <button>Back to plants</button>
      </Link>
      <Link to={`/plants/edit/${plantId}`}>
        <button>Edit plant</button>
      </Link>
    </div>
  );
}

export default PlantDetailsPage;
