import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import plantCareService from "../services/plantCares.services";

function PlantCareCard({ care }) {

  const [plantCare, setPlantCare] = useState({});
  const { plantCareId } = useParams();

  const getPlantCare = () => {
    plantCareService
      .getPlantCare(plantCareId)
      .then((response) => {
        const onePlantCare = response.data;
        setPlantCare(onePlantCare);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    console.log(plantCareId);
    getPlantCare();
  }, [plantCareId]);


  return (
    <div>
      <h2>How to take care of your plant buddy!</h2>
      <p>Water: {plantCare.water}</p> 
      <p>Fertilization: {plantCare.fertilization}</p>
      <p>Benefits: {plantCare.benefits}</p> 
      <p>Sunlight: {plantCare.sunlight}</p>
      <p>Preferred Area: {plantCare.preferred_area}</p>
    </div>
  );
}

export default PlantCareCard;