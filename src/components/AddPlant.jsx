import {useState} from "react";
import axios from "axios";
import plantsService from "../services/plants.services";
import { response } from "express";

const API_URL = "http://localhost:5010";

function AddPlant(props){
  const [common_name, setCommonName] = useState("");
  const [scientific_name, setScientificName] = useState("");
  const [origin, setOrigin] = useState("");
  const [family, setFamily] = useState("");
  const [picture_url, setPictureUrl] = useState("");
  const [plant_care, setPlantCare] = useState() //ASK LUIS

  const handleFormSubmit = (e)=> {
    e.preventDefault();

    const requestBody = {common_name, scientific_name, origin, family, picture_url, plant_care}

    const storedToken = localStorage.getItem("authToken");

    plantsService.createPlant(requestBody)
        .then((response) => {
            setCommonName("");
            setScientificName("");
            setOrigin("");
            setFamily("");
            setPictureUrl("");
            setPlantCare("");
        })
        .catch((err) => console.log(err));
    };

    const handleChange = (e) => {
        e.prevenDefault();
        setFamily(e.target.value);
      };

    return (
        <div>
            <h3>Add new Buddy</h3>

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
                    <select name="family" value={setFamily} onChange={handleChange}>
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

                <button type="submit">Submit</button>

            </form>

        </div>
    );

}

export default AddPlant;