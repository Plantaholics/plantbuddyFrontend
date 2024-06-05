import { Box, Heading, Text, Button, Link } from "@chakra-ui/react";

function HomePage() {
    return (
        <Box p={8} textAlign="center">
        <Heading as="h1" size="2xl" mb={4}>
          Welcome to Plantbuddy!
        </Heading>
        <Text fontSize="xl" mb={8}>
          We provide amazing services for all your needs.
        </Text>
 
      </Box>
    );
}

export default HomePage;