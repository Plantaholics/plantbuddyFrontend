import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
//to create:
import AddPlantCare from "../components/AddPlantCare";
import PlantCareCard from "../components/PlantCareCard";
import plantsService from "../services/plant.service";

const API_URL = "http://localhost:5010";

function PlantDetailsPage(props) {
    const [plant, setPlant] = useState(null);
    const {plantId} = useParams();

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
        {plant && (
            <div>
                <h1>{plant.common_name}</h1>
                <p>{plant.scientific_name}</p>
                <p>{plant.origin}</p>
                <p>{plant.family}</p>
                <p>{plant.picture_url}</p>
            </div>
        )}

        <AddPlantCare refreshPlant={getPlant} plantId={plantId} />

        {plant && 
            plant.plant_cares.map((care) => < PlantCareCard key={care._id} {...plant_cares} />)}

        <Link to="/plants">
            <button>Back to plants</button>
        </Link>
        <Link to={`/plants/edit/${plantId}`}>
            <button>Edit plant</button>
        </Link>
    </div>
);
}