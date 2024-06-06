import axios from "axios";

class CareService {
    constructor() {
        this.api = axios.create({
           baseURL: import.meta.env.VITE_API_URL || "http://localhost:5010" // THIS IS FOR THE FINAL VERSION 
        });

        this.api.interceptors.request.use((config) => {
            const storedToken = localStorage.getItem("authToken");

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}`};
            }
            return config;
        });

    }

    //POST /api/care
    createCare = (requestBody) => {
        console.log("careservice", requestBody);
        return this.api.post("/api/care", requestBody);
    };

    //GET /api/plantcare
    getAllCares = () => {
        return this.api.get("/api/care");
    };

    getCare = (careId) => {
        return this.api.get(`/api/care/${careId}`);
    };

    //PUT /api/care/:careId
    updateCare = (careId, requestBody) => {
        return this.api.put(`/api/care/${careId}`, requestBody);
    };
}


const careService = new CareService();

export default careService;