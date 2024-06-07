import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Link } from "react-router-dom";
import { Box, Heading, Text, Button } from "@chakra-ui/react";
import backgroundhp from "../assets/backgroundhp.png";

function HomePage() {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minH="100vh"
      backgroundImage={backgroundhp}
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
    >
      <Link to={isLoggedIn ? "/plants" : "/signup"}>
        <Button mt={50} p={5} colorScheme="green" _hover={{ bg: "green.800" }}>
          {isLoggedIn ? "Add a Plantbuddy !" : "Start Here!"}
        </Button>
      </Link>
    </Box>
  );
}

export default HomePage;
