import {useState, useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PlantCard from "../components/PlantCard";
import AddPlant from "../components/AddPlant";
import plantsService from "../services/plants.services";

const API_URL = "http://localhost:5010";

function PlantListPage(props) {

    const navigate = useNavigate();
    const [plants, setPlants] = useState([]);
    const getAllPlants = () => {
        const storedToken = localStorage.getItem("authToken");

        plantsService.getAllPlants()
            .then((response) => setPlants(response.data))
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        getAllPlants();
    }, []);

    return (
        <div>
            <h1>This is all plants page</h1>
            <AddPlant refreshProjects={getAllPlants} />
            {plants.map((plant) => ( <PlantCard key={plant._id} plant={plant}/>))}

        </div>
    );
}

export default PlantListPage;
