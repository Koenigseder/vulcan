import React, { useEffect, useState } from "react";
import {
  NativeBaseProvider,
  Box,
  useColorModeValue,
  useColorMode,
  extendTheme,
} from "native-base";
import { Footer } from "./package/frontend/components/Footer";
import { Settings } from "./package/frontend/pages/Settings";
import { Home } from "./package/frontend/pages/Home";
import { Vocs } from "./package/frontend/pages/Vocs";
import {
  getAmountVocsPerUnit,
  getColorMode,
  getUsername,
  getVocs,
} from "./package/frontend/utils/helper";
import { Learn } from "./package/frontend/pages/Learn";
import { VocabularyInterface } from "./package/frontend/interfaces/VocabularyInterface";

// Define the config
const config = {
  dependencies: {
    "linear-gradient": require("expo-linear-gradient").LinearGradient,
  },
};

const Base = () => {
  const { setColorMode } = useColorMode();
  const [selectedElement, setSelectedElement] = useState(1); // 0 = Vocs; 1 = Home; 2 = Settings; 3 = Learn
  const [username, setUsername] = useState("");
  const [amountOfVocsPerUnit, setAmountOfVocsPerUnit] = useState(10);

  const [allVocs, setAllVocs] = useState<VocabularyInterface[]>();
  const [isAllVocsLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getColorMode().then((value: any) =>
      setColorMode(value === null ? "light" : value)
    );
    getUsername().then((value: any) => setUsername(value));
    getAmountVocsPerUnit().then((value: any) =>
      setAmountOfVocsPerUnit(Math.floor(value))
    );
    getVocs().then((value: any) => {
      setAllVocs(value);
      setIsLoading(false);
    });
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
          <Vocs
            allVocs={allVocs ? allVocs : []}
            setAllVocs={setAllVocs}
            isAllVocsLoading={isAllVocsLoading}
          />
        ) : selectedElement === 1 ? (
          <Home
            username={username}
            setSelectedElement={setSelectedElement}
            allVocsLength={allVocs?.length}
          />
        ) : selectedElement === 2 ? (
          <Settings
            username={username}
            setUsername={setUsername}
            amountOfVocsPerUnit={amountOfVocsPerUnit}
            setAmountOfVocsPerUnit={setAmountOfVocsPerUnit}
            allVocs={allVocs ? allVocs : []}
          />
        ) : (
          <Learn
            allVocs={allVocs ? allVocs : []}
            vocsPerUnit={amountOfVocsPerUnit}
            setAllVocs={setAllVocs}
            setSelectedElement={setSelectedElement}
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
