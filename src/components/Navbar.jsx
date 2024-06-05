import { Link, useNavigate } from "react-router-dom";
import { Box, Button, Flex } from "@chakra-ui/react";
import plantbuddylogo from "../assets/plantbuddylogo.svg";

function Navbar() {
  const auth = localStorage.getItem("authToken");
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  const goToHome = () => {
    navigate("/");
  }
;
  return (
    <Box>
      <Flex align="center" justify="space-between" py={6} px={8} bg="green.500">

        <Link to= "/">
          <img width="150px" src={plantbuddylogo} alt="" />
        </Link>

        <Flex align="center">
          <Link to="/">
            <Button variant="ghost" colorScheme="white" mr={4} color="#fff">
              Home
            </Button>
          </Link>

          {auth && (
            <Link to="/plants">
              <Button variant="ghost" colorScheme="white" mr={4} color="#fff">
                Plants
              </Button>
            </Link>
          )}

          {!auth && (
            <Link to="/signup">
              <Button variant="ghost" colorScheme="white" mr={4} color="#fff">
                Join us
              </Button>
            </Link>
          )}

          {auth ? (
            <Link onClick={logout} to="/">
              <Button variant="ghost" colorScheme="white" mr={4} color="#fff">
                Log out
              </Button>
            </Link>
          ) : (
            <Link to="/login">
              <Button variant="ghost" colorScheme="white" mr={4} color="#fff">
                Log in
              </Button>
            </Link>
          )}
        </Flex>
      </Flex>
    </Box>
  );
}

export default Navbar;
