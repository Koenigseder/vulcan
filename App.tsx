import React, { useEffect, useState } from "react";
import {
  NativeBaseProvider,
  Box,
  useColorModeValue,
  useColorMode,
} from "native-base";
import { Footer } from "./package/frontend/components/Footer";
import { Settings } from "./package/frontend/pages/Settings";
import { Home } from "./package/frontend/pages/Home";
import { Vocs } from "./package/frontend/pages/Vocs";
import {
  getAmountVocsPerUnit,
  getColorMode,
  getUsername,
} from "./package/frontend/utils/helper";

// // Define the config
const config = {
  dependencies: {
    "linear-gradient": require("expo-linear-gradient").LinearGradient,
  },
};

// // extend the theme
// export const theme = extendTheme({ config });

const Base = () => {
  const { setColorMode } = useColorMode();
  const [selectedElement, setSelectedElement] = useState(1);
  const [username, setUsername] = useState("");
  const [amountOfVocsPerUnit, setAmountOfVocsPerUnit] = useState(10);

  useEffect(() => {
    getColorMode().then((value: any) =>
      setColorMode(value === null ? "light" : value)
    );
    getUsername().then((value: any) => setUsername(value));
    getAmountVocsPerUnit().then((value: any) =>
      setAmountOfVocsPerUnit(Math.floor(value))
    );
  }, []);

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
          <Home username={username} />
        ) : (
          <Settings
            username={username}
            setUsername={setUsername}
            amountOfVocsPerUnit={amountOfVocsPerUnit}
            setAmountOfVocsPerUnit={setAmountOfVocsPerUnit}
          />
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
