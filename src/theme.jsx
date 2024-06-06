import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const styles = {
  global: (props) => ({
    body: {
      bg: mode("white", "brown.400")(props),
      color: mode("gray.800", "white")(props),
    },
  }),
};

const theme = extendTheme({ config, styles });

export default theme;