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
import { InfoModal } from "../components/modals/InfoModal";

interface IntroductionProps {
  setUsername: (s: string) => void;
  setSelectedElement: (n: number) => void;
}

export const Introduction = (props: IntroductionProps) => {
  const [username, setUsername] = useState<string>("");
  const [showInfoModal, setShowInfoModal] = useState(false);
  const { colorMode, setColorMode, toggleColorMode } = useColorMode();

  useEffect(() => {
    setColorMode("light");
  }, []);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      <InfoModal showInfo={showInfoModal} setShowInfo={setShowInfoModal} />
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
          source={require("../../../assets/vulcan.png")}
        />
        <Divider my="3" thickness="1" />
        <Heading textAlign="center" size="lg">
          Dein Vulcan-Account
        </Heading>
        <Text textAlign="center" mb="3">
          Falls du einen Vulcan-Account besitzt, kannst du dich nach der kurzen
          Einrichtung anmelden und all deine Daten synchronisieren.
        </Text>
        <HStack justifyContent="center" alignItems="center">
          <Text textAlign="center">Was ist ein Vulcan-Account? </Text>
          <Button
            variant="ghost"
            onPress={() => setShowInfoModal(!showInfoModal)}
          >
            <Feather
              name="help-circle"
              size={25}
              color={colorMode === "dark" ? "white" : "black"}
            />
          </Button>
        </HStack>
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
              toggleColorMode();
            }}
          />
          <Feather
            name="sun"
            size={24}
            color={
              colorMode === "light" || colorMode === undefined
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
            storeColorMode(!colorMode ? "light" : colorMode);
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
