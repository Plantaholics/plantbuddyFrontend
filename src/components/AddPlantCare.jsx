import { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5010";

function AddPlantCare(props) {
  const [water, setWater] = useState("");
  const [fertilization, setFertilization] = useState("");
  const [benefits, setBenefits] = useState("");
  const [sunlight, setSunlight] = useState("");
  const [preferred_area, setPreferredArea] = useState("");
  const [plant, setPlant] = useState([]) // ASK LUIS

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const { plantId } = props;
    const requestBody = { water, fertilization, benefits, sunlight, preferred_area, plant};

    const storedToken = localStorage.getItem("authToken");

    axios
      .post(`${API_URL}/api/plantcare`, requestBody, { headers: { Authorization: `Bearer ${storedToken}` } })
      .then((response) => {
        // Reset the state to clear the inputs
        setWater("");
        setFertilization("");
        setBenefits("");
        setSunlight("");
        setPreferredArea("");
        setPlant([])

        // Invoke the callback function coming through the props
        // from the PlantDetailsPage, to refresh the project details
        
        props.refreshProject();
        })
        .catch((err) => console.log(err));

        const handleChange = (e) => {
            e.prevenDefault();
            setFamily(e.target.value);
          };
  };

  return (
    <div className="AddTask">
      <h3>How do you take care of it?</h3>

      <form onChange={handleFormSubmit}>

      <label>Water
            <select name="water" onChange={(e) => setWater(e.target.value)}>
                <option value="once a day">once a day</option>
                <option value="once a week">once a week</option>
                <option value="twice a week">twice a week</option>
                <option value="once every two weeks">once every two weeks</option>
                <option value="once a month">once a month</option>
            </select>
        </label>

        <label>Fertilization
            <select name="fertilization" onChange={(e) => setFertilization(e.target.value)}>
                <option value="every month">every month</option>
                <option value="every 3 months">every 3 months</option>
                <option value="every 6 months">every 6 months</option>
            </select>
        </label>

        <label>Benefits
            <input 
            type="text"
            name="benefits"
            value={benefits}
            onChange={(e) => setBenefits(e.target.value)}
            />
        </label>

        <label>Sunlight
            <select name="fertilization" onChange={(e) => setSunlight(e.target.value)}>
                <option value="morning">morning</option>
                <option value="midday">midday</option>
                <option value="afternoon">afternoon</option>
                <option value="all day">all day</option>
            </select>
        </label>

        <label>Preferred area
            <select name="preferred_area" onChange={(e) => setPreferredArea(e.target.value)}>
                <option value="only indoor">only indoor</option>
                <option value="only outdoor">only outdoor</option>
                <option value="indoor/outdoor">indoor/outdoor</option>
                <option value="humid places">humid places</option>
                <option value="dry places">dry places</option>
            </select>
        </label>

      </form>
    </div>
  );
}

export default AddPlantCare;