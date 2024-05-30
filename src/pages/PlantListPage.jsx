import {useState, useEffect} from "react";
import axios from "axios";

//to create
// import PlantCard from "../components/PlantCard";
// import AddNewPlant from "../components/AddNewPlant";
// import plantsService from "../services/plant.service";

const API_URL = "http://localhost:5010";

function PlantListPage() {
    const [plants, setPlants] = useState([]);

    const getAllPlants = () => {
        const storedToken = localStorage.getItem("authToken");

        plantsService
            .getAllPlants()
            .then((response) => setPlants(response.data))
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        getAllPlants();
    }, []);

    return (
        <div>
            {/* we need create the components AddNewPlant and PlantCard */}
            <AddNewPlant refreshPlants={getAllPlants} />
            {plants.map((plant) => {
                <PlantCard key={plant._id} {...plants} />
            })}
        </div>
    );
}

export default PlantListPage;
