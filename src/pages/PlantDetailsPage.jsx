import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
// import CareCard from "../components/CareCard";
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
            
            <h1>Plantbuddy care:</h1>
            { plant.care ? (
            <>
            <p>Water: {plant.care.water}</p>
            <p>Fertilization: {plant.care.fertilization}</p>
            <p>Benefits: {plant.care.benefits}</p>  
            <p>Sunlight: {plant.care.sunlight}</p>
            <p>Preferred Area: {plant.care.preferred_area}</p>
          </>              
            ) : (
              <p>Sorry, we don't have a specific care yet!</p>
            )}
          </>
        )}
      </div>



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
