import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

//destructuring the plant object from the props =>
function PlantCard({ plant }) {

  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/plants/${plant._id}`);
  }
  
  return (
    <>
    <div>
      <h3>{plant.common_name}</h3>
      <h3>{plant.scientific_name}</h3>
      <p>{plant.origin}</p>
      <p>{plant.family}</p>
      <img src={plant.picture_url} alt="this is a plant" />

    </div>
    <button onClick={handleClick}>View more</button>
    </>
  );
}

export default PlantCard;
