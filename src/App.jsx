import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import PlantListPage from "./pages/PlantListPage";
import PlantDetailsPage from "./pages/PlantDetailsPage";
import EditPlantPage from "./pages/EditPlantPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import Footer from "./components/Footer";
import theme from "../src/theme";

import IsPrivate from "./components/IsPrivate";
import IsAnon from "./components/IsAnnon";

function App() {
  return (
    <div>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Navbar />

        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/plants" element={<PlantListPage />} />
          <Route
            exact
            path="/plants/:plantId"
            element={
              <IsPrivate>
                <PlantDetailsPage />{" "}
              </IsPrivate>
            }
          />
          <Route
            exact
            path="/plants/edit/:plantId"
            element={<EditPlantPage />}
          />
          <Route path="/signup" element={<SignupPage />} />

          <Route path="/login" element={<LoginPage />} />
        </Routes>
        <Footer />
      </ChakraProvider>
    </div>
  );
}

export default App;
