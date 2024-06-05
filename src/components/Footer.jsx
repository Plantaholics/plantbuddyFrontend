import { Box, Flex, Text, Link, Image, Icon } from "@chakra-ui/react";
import github from "../assets/github.svg";
import pottery from "../assets/pottery.svg"

function Footer() {
  return (
    <Box as="footer" py={3} bg="#724b21" color="#fff" fontWeight="600" position="fixed" bottom="0" width="100%" mt="50px">
      <Flex justify="center" align="center" direction="column">
        <Flex>
        <Text mx={2}>Check out our code on:</Text>
        <Image src={github} alt="GitHub Logo" boxSize={6} mx={5}/>
          <Link href="https://github.com/orgs/Plantaholics/repositories" isExternal mx={2}>
            Plantholic's GitHub
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
}

export default Footer;