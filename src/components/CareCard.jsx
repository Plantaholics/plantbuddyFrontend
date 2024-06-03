import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import careService from "../services/cares.services";

function CareCard() {

  const [care, setCare] = useState({});
  const { careId } = useParams();

  const getCare = () => {
    careService
      .getCare(careId)
      .then((response) => {
        const oneCare = response.data;
        setPlantCare(oneCare);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    console.log(careId);
    getPlantCare();
  }, [careId]);


  return (
    <div>
      <h2>How to take care of your plant buddy!</h2>
      <p>Water: {careId.water}</p> 
      <p>Fertilization: {careId.fertilization}</p>
      <p>Benefits: {careId.benefits}</p> 
      <p>Sunlight: {careId.sunlight}</p>
      <p>Preferred Area: {careId.preferred_area}</p>
    </div>
  );
}

export default CareCard;