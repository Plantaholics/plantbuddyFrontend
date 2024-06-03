import axios from "axios";

class CareService {
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

    //POST /api/care
    createCare = (requestBody) => {
        return this.api.post("/api/care", requestBody);
    };


    //GET /api/plantcare
    getAllCares = () => {
        return this.api.get("/api/care");
    };

    getCare = (careId) => {
        return this.api.get(`/api/care/${careId}`);
    };
    
    // DELETE /api/plantcare/:id
    // deletePlantCare = (id) => {
    // return this.api.delete(`/api/plantcare/${id}`);
    // };
}


const careService = new CareService();

export default careService;