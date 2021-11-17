import Feather from "@expo/vector-icons/build/Feather";
import {
  Heading,
  Stack,
  Text,
  Image,
  Input,
  HStack,
  Divider,
  Switch,
  useColorMode,
  Button,
  ScrollView,
} from "native-base";
import React, { useEffect, useState } from "react";
import { storeColorMode, storeUsername } from "../utils/helper";
// import Vulcan from '../../../assets/Vulcan.png'

interface IntroductionProps {
  setUsername: (s: string) => void;
  setSelectedElement: (n: number) => void;
}

export const Introduction = (props: IntroductionProps) => {
  const [username, setUsername] = useState<string>("");
  const { colorMode, toggleColorMode } = useColorMode();
  const [selectedColorMode, setSelectedColorMode] = useState(colorMode);

  useEffect(() => {
    toggleColorMode();
    setSelectedColorMode("light");
  }, []);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      <Stack alignItems="center">
        <Heading
          size="xl"
          textAlign="center"
        >{`Hi!\nWillkommen bei Vulcan!`}</Heading>
        <Image
          mt="20px"
          size={200}
          borderRadius={100}
          alt="Vulcan Icon"
          source={require("../../../assets/Vulcan.png")}
        />
        <Divider my="3" thickness="1" />
        <Text mt="20px" fontSize="md" textAlign="center">
          Wir bräuchten deinen Namen, damit du starten kannst:
        </Text>
        <HStack mt="20px" mb="20px">
          <Input
            flex={1}
            value={username}
            size="lg"
            onChangeText={(value) => setUsername(value)}
          />
        </HStack>
        <Divider my="3" thickness="1" />
        <Text textAlign="center" mt="20px" fontSize="md">
          Willst du die App im Dark- oder Light-Mode betreiben?
        </Text>
        <Text textAlign="center" fontSize="sm">
          Wähle weise...
        </Text>
        <HStack flex={1} space={2} alignItems="center" mt="10px">
          <Feather
            name="moon"
            size={24}
            color={
              colorMode === "light" || colorMode === undefined
                ? "black"
                : "white"
            }
          />
          <Switch
            onThumbColor="#ae4951"
            onTrackColor="#d4b0b3"
            size="lg"
            isChecked={
              colorMode === "light" || colorMode === undefined ? true : false
            }
            onToggle={() => {
              setSelectedColorMode(
                selectedColorMode === "light" || selectedColorMode === undefined
                  ? "dark"
                  : "light"
              );
              toggleColorMode();
            }}
          />
          <Feather
            name="sun"
            size={24}
            color={
              colorMode === "light" || selectedColorMode === undefined
                ? "black"
                : "white"
            }
          />
        </HStack>
        <Divider my="3" thickness="1" mt="20px" />
        <Button
          bg={
            username === null || username?.trim() === ""
              ? "gray.500"
              : "#ae4951"
          }
          disabled={username === null || username === ""}
          onPress={() => {
            storeUsername(username).then(() => {
              props.setSelectedElement(1);
            });
            storeColorMode(!selectedColorMode ? "light" : selectedColorMode);
            props.setUsername(username);
          }}
        >
          Einstellungen speichern
        </Button>
        <Text textAlign="center" mt="10px" paddingBottom="30px">
          Diese Einstellungen können jederzeit in den Einstellungen geändert
          werden.
        </Text>
      </Stack>
    </ScrollView>
  );
};
