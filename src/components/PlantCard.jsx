import { Link } from "react-router-dom";

// We are deconstructing props object directly inside the () of the function
function PlantCard({ plant }) {
  
  return (
    <div>
      <h3>{plant.common_name}</h3>
      <h3>{plant.scientific_name}</h3>
      <p>{plant.origin}</p>
      <p>{plant.family}</p>
      <img src={plant.picture_url} alt="this is a plant" />
      <p>{plant.plantcare}</p>
    </div>
  );
}

export default PlantCard;
