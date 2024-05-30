import './App.css';
import {Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import HomePage from "./pages/HomePage";
import PlantListPage from "./pages/PlantListPage";
import PlantDetailsPage from "./pages/PlantDetailsPage";
import EditPlantPage from "./pages/EditPlantPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";


function App() {

  return (
    <div>
      <Navbar />
    </div>
  )
}

export default App;
