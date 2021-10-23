import React, { useState } from "react";
import { NativeBaseProvider, Box, useColorModeValue } from "native-base";
import { Footer } from "./package/frontend/components/Footer";
import { Settings } from "./package/frontend/pages/Settings";
import { Home } from "./package/frontend/pages/Home";
import { Vocs } from "./package/frontend/pages/Vocs";

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
