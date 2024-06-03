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
      <p>Water: {care.water}</p> 
      <p>Fertilization: {care.fertilization}</p>
      <p>Benefits: {care.benefits}</p> 
      <p>Sunlight: {care.sunlight}</p>
      <p>Preferred Area: {care.preferred_area}</p>
    </div>
  );
}

export default PlantCareCard;