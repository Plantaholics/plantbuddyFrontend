import axios from "axios";

class PlantsService {
    constructor() {
        this.api = axios.create({
            baseURL: import.meta.env.VITE_API_URL || "http://localhost:5010",
        });

        this.api.interceptors.request.use((config) => {
            const storedToken = localStorage.getItem("authToken");

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}`};
            }
            return config;
        });

    }

    //POST /api/plants
    createPlant = (requestBody) => {
        return this.api.post("/api/plants", requestBody);
    };

    //Get /api/plants
    getAllPlants = () => {
        return this.api.get(`/api/plants/`);
    };

    //Get one plant /api/plants/id
    getPlant = (plantId) => {
        return this.api.get(`/api/plants/${plantId}`);
    };

    // PUT /api/plants/:id
    updatePlant = (id, requestBody) => {
    return this.api.put(`/api/plants/${id}`, requestBody);
    };

    // PUT /api/plants/:id
    deletePlant = (id) => {
    return this.api.delete(`/api/plants/${id}`);
    };
}


const plantsService = new PlantsService();

export default plantsService;