import React, { useState } from "react";
import {
  Text,
  HStack,
  Center,
  Switch,
  useColorMode,
  NativeBaseProvider,
  extendTheme,
  View,
  Box,
  StatusBar,
  useColorModeValue,
} from "native-base";
import { Footer } from "./frontend/components/Footer";
import { Settings } from "./frontend/pages/Settings";
import { Home } from "./frontend/pages/Home";
import { Vocs } from "./frontend/pages/Vocs";

// // Define the config
const config = {
  dependencies: {
    "linear-gradient": require("expo-linear-gradient").LinearGradient,
  },
};

// // extend the theme
// export const theme = extendTheme({ config });

const Base = () => {
  const [selectedElement, setSelectedElement] = useState(1);

  return (
    <>
      <Box
        flex={1}
        bg={useColorModeValue("white", "black")}
        paddingTop="75px"
        paddingLeft="20px"
        paddingRight="20px"
      >
        {selectedElement === 0 ? (
          <Vocs />
        ) : selectedElement === 1 ? (
          <Home />
        ) : (
          <Settings />
        )}
      </Box>
      <Footer
        selectedElement={selectedElement}
        setSelectedElement={setSelectedElement}
      />
    </>
  );
};

export default function App() {
  return (
    <NativeBaseProvider config={config}>
      <Base />
    </NativeBaseProvider>
  );
}
