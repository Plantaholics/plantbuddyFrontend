import React, { useState, useEffect } from "react";
import caresService from "../services/cares.services";



function CareCard({care}) {
  
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

export default CareCard;
