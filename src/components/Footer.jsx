import { Box, Flex, Text, Link, Image, Icon } from "@chakra-ui/react";
import github from "../assets/github.svg";
import pottery from "../assets/pottery.svg"

function Footer() {
  return (
    <Box as="footer" py={3} bg="#fe8e46" color="green.600" fontWeight="600" position="fixed" bottom="0" width="100%" mt="50px">
      <Flex justify="center" align="center" direction="column">
        <Flex align="center" mb={2}>
        <Image src={pottery} alt="Pottery Logo" boxSize={6} />
          <Text ml={2}>Developed by Raffaella and Sergio 2024 </Text>
        </Flex>
        <Flex>
        <Image src={github} alt="GitHub Logo" boxSize={6} />
          <Link href="https://github.com/raffaellacff" isExternal mx={2}>
            Raffaella's GitHub
          </Link>
          <Link href="https://github.com/orgs/Plantaholics/repositories" isExternal mx={2}>
            Plantholic's GitHub
          </Link>
          <Link href="https://github.com/sergiovede26" isExternal mx={2}>
            Sergio's GitHub
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
}

export default Footer;