import axios from "axios";
 
const api = axios.create({
  // make sure you use PORT = 5005 (the port where our server is running)
  baseURL: "http://localhost:5010/api",
  withCredentials: true 
});
 
const errorHandler = (err) => {
  throw err;
};

    //Get /plants
const getAllPlants = () => {
    return api.get(`/plants/`)
    .then((res) => res.data)
    .catch(errorHandler);
};
 
const uploadImage = (file) => {
    const formData = new FormData();
    formData.append("file", file)

  return api.post("/upload", formData)
    .then(res => res.data)
    .catch(errorHandler);
};

const createPlant = (newPlant) => {
    return api.post("/plants", newPlant)
    .then(res => res.data)
    .catch(errorHandler);
};

 
export default {
  getAllPlants,
  uploadImage,
  createPlant
};