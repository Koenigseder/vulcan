import React, { useEffect, useState } from "react";
import {
  NativeBaseProvider,
  Box,
  useColorModeValue,
  useColorMode,
  extendTheme,
  Spinner,
  Center,
  Heading,
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
  storeAmountOfVocsPerUnit,
} from "./package/frontend/utils/helper";
import { Learn } from "./package/frontend/pages/Learn";
import { VocabularyInterface } from "./package/frontend/interfaces/VocabularyInterface";
import { Introduction } from "./package/frontend/pages/Introduction";
import { Login } from "./package/frontend/pages/Login";

// Define the config
const config = {
  dependencies: {
    "linear-gradient": require("expo-linear-gradient").LinearGradient,
  },
};

const Base = () => {
  const { setColorMode } = useColorMode();
  const [selectedElement, setSelectedElement] = useState(1); // 0 = Vocs; 1 = Home; 2 = Settings; 3 = Learn; 4 = Introduction; 5 = Login
  const [username, setUsername] = useState("");
  const [amountOfVocsPerUnit, setAmountOfVocsPerUnit] = useState(10);

  const [allVocs, setAllVocs] = useState<VocabularyInterface[]>([]);
  const [isAllVocsLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getColorMode().then((value: any) =>
      setColorMode(value === null ? "light" : value)
    );
    getUsername().then((value: any) => {
      setUsername(value);
      if (value === undefined || value === null) setSelectedElement(4);
    });
    getAmountVocsPerUnit().then((value: any) => {
      if (value === null || value === undefined) {
        setAmountOfVocsPerUnit(0);
      } else {
        setAmountOfVocsPerUnit(Math.floor(value));
      }
    });
    getVocs().then((value: any) => {
      setAllVocs(value);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (amountOfVocsPerUnit === undefined || amountOfVocsPerUnit === null) {
      storeAmountOfVocsPerUnit("0");
      setAmountOfVocsPerUnit(0);
    } else if (amountOfVocsPerUnit > allVocs?.length) {
      storeAmountOfVocsPerUnit(allVocs.length.toString());
      setAmountOfVocsPerUnit(allVocs.length);
    }
  }, [allVocs]);

  return (
    <>
      <Box
        flex={1}
        bg={useColorModeValue("white", "black")}
        paddingTop="75px"
        paddingLeft="20px"
        paddingRight="20px"
      >
        {isAllVocsLoading ? (
          <Center flex={1}>
            <Spinner size="lg" />
            <Heading color="primary.500" fontSize="lg" paddingTop="10px">
              Laden
            </Heading>
          </Center>
        ) : selectedElement === 0 ? (
          <Vocs
            allVocs={allVocs ? allVocs : []}
            setAllVocs={setAllVocs}
            isAllVocsLoading={isAllVocsLoading}
          />
        ) : selectedElement === 1 ? (
          <Home
            username={username}
            setSelectedElement={setSelectedElement}
            allVocs={allVocs}
            amountOfVocsPerUnit={amountOfVocsPerUnit}
          />
        ) : selectedElement === 2 ? (
          <Settings
            username={username}
            setUsername={setUsername}
            amountOfVocsPerUnit={amountOfVocsPerUnit}
            setAmountOfVocsPerUnit={setAmountOfVocsPerUnit}
            allVocs={allVocs ? allVocs : []}
            setSelectedElement={setSelectedElement}
          />
        ) : selectedElement === 3 ? (
          <Learn
            allVocs={allVocs ? allVocs : []}
            vocsPerUnit={amountOfVocsPerUnit}
            setAllVocs={setAllVocs}
            setSelectedElement={setSelectedElement}
          />
        ) : selectedElement === 4 ? (
          <Introduction
            setUsername={setUsername}
            setSelectedElement={setSelectedElement}
          />
        ) : (
          <Login />
        )}
      </Box>
      <Footer
        selectedElement={selectedElement}
        setSelectedElement={setSelectedElement}
        isAllVocsLoading={isAllVocsLoading}
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
