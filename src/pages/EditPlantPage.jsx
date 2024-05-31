import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import plantsService from "../services/plants.services";

const API_URL = "http://localhost:5010";

function EditPlantPage(props) {
    const [common_name, setCommonName] = useState("");
    const [scientific_name, setScientificName] = useState("");
    const [origin, setOrigin] = useState("");
    const [family, setFamily] = useState("");
    const [picture_url, setPictureUrl] = useState("");

    const { plantId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const storedToken = localStorage.getItem("authToken");
        
        // Obtener los datos de la planta usando plantsService
        plantsService.getPlant(plantId, storedToken)
            .then((response) => {
                const onePlant = response.data;
                setCommonName(onePlant.common_name);
                setScientificName(onePlant.scientific_name);
                setOrigin(onePlant.origin);
                setFamily(onePlant.family);
                setPictureUrl(onePlant.picture_url);
            })
            .catch((err) => console.log(err));
    }, [plantId]);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const requestBody = { common_name, scientific_name, origin, family, picture_url };

        // Actualizar la planta usando plantsService
        plantsService.updatePlant(plantId, requestBody)
            .then((response) => {
                navigate(`/plants/${plantId}`);
            })
            .catch((err) => console.log(err));
    };

    const deletePlant = () => {
        plantsService.deletePlant(plantId)
            .then(() => {
                navigate("/plants");
            })
            .catch((err) => console.log(err));
    };

    const handleFamilyChange = (e) => {
        setFamily(e.target.value);
    };

    return (
        <div>
            <h3>Edit your buddy</h3>

            <form onSubmit={handleFormSubmit}>
                <label>Common name
                    <input 
                        type="text"
                        name="common_name"
                        value={common_name}
                        onChange={(e) => setCommonName(e.target.value)}
                    />
                </label>

                <label>Scientific name
                    <input 
                        type="text"
                        name="scientific_name"
                        value={scientific_name}
                        onChange={(e) => setScientificName(e.target.value)}
                    />
                </label>

                <label>Origin
                    <input 
                        type="text"
                        name="origin"
                        value={origin}
                        onChange={(e) => setOrigin(e.target.value)}
                    />
                </label>

                <label>Family
                    <select name="family" value={family} onChange={handleFamilyChange}>
                        <option value="">Pick a family</option>
                        <option value="araceae">araceae</option>
                        <option value="asparagaceae">asparagaceae</option>
                        <option value="polypodiaceae">polypodiaceae</option>
                        <option value="pteridaceae">pteridaceae</option>
                        <option value="dryopteridaceae">dryopteridaceae</option>
                        <option value="asphodelaceae">asphodelaceae</option>
                        <option value="moraceae">moraceae</option>
                        <option value="musaceae">musaceae</option>
                        <option value="asteraceae">asteraceae</option>
                    </select>
                </label>

                <label>Image
                    <input 
                        type="text"
                        name="picture_url"
                        value={picture_url}
                        onChange={(e) => setPictureUrl(e.target.value)}
                    />
                </label>

                <button type="submit">Update Plant</button>
            </form>
            
            <button onClick={deletePlant}>Oh no, bye Buddy</button>
        </div>
    );
}

export default EditPlantPage;