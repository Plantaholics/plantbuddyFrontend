import axios from "axios";

class PlantCareService {
    constructor() {
        this.api = axios.create({
            baseURL: import.meta.env.SERVER_URL || "http://localhost:5010",
        });

        this.api.interceptors.request.use((config) => {
            const storedToken = localStorage.getItem("authToken");

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}`};
            }
            return config;
        });

    }

    //POST /api/plantcare
    createPlantcare = (requestBody) => {
        return this.api.post("/api/plantcare", requestBody);
    };

    //GET /api/plantcare
    getPlantCare = (id) => {
        return this.api.get(`/api/plantcare/${id}`);
    };
    

    // DELETE /api/plantcare/:id
    deletePlantCare = (id) => {
    return this.api.delete(`/api/plantcare/${id}`);
    };
}


const plantCareService = new PlantCareService();

export default plantCareService;