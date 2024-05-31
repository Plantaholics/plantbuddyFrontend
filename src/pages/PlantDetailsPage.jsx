import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import AddPlantCare from "../components/AddPlantCare";
import PlantCard from "../components/PlantCard";
import PlantCareCard from "../components/PlantCareCard";
import plantsService from "../services/plants.services";

const API_URL = "http://localhost:5010";

function PlantDetailsPage() {
  const [plant, setPlant] = useState(null);
  const { plantId } = useParams();

  const getPlant = () => {
    const storedToken = localStorage.getItem("authToken");

    plantsService
      .getPlant(plantId)
      .then((response) => {
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
      <h1>This is the plant details page</h1>
      
      {plant && (
        <>
          <h3>{plant.common_name}</h3>
          <p>{plant.scientific_name}</p>|
          <p>{plant.origin}</p>
          <p>{plant.family}</p>
          <p>{plant.picture_url}</p>
          <p>{plant.plantcare}</p>
        </>
      )}

      <AddPlantCare refreshPlant={getPlant} plantId={plantId} />

      {plant &&
        plant.cares.map((cares) => <PlantCareCardCard key={cares._id} {...task} />)}

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
