import Constants from "expo-constants";
import {
  Button,
  Divider,
  Heading,
  HStack,
  Input,
  ScrollView,
  Slider,
  Stack,
  Switch,
  Text,
  Image,
  useColorMode,
} from "native-base";
import React, { useEffect, useState, version } from "react";
import { Feather } from "@expo/vector-icons";
import {
  makeToast,
  storeAmountOfVocsPerUnit,
  storeColorMode,
  storeUsername,
} from "../utils/helper";
import { VocabularyInterface } from "../interfaces/VocabularyInterface";
import AntDesign from "@expo/vector-icons/build/AntDesign";
import Ionicons from "@expo/vector-icons/build/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/build/MaterialCommunityIcons";
import { auth } from "../../../firebase";
import { UserDataInterface } from "../interfaces/UserDataInterface";

interface SettingsProps {
  username: string;
  setUsername: (s: string) => void;
  amountOfVocsPerUnit: number;
  setAmountOfVocsPerUnit: (n: number) => void;
  allVocs: VocabularyInterface[];
  setSelectedElement: (n: number) => void;
  isUserLoggedIn: boolean;
  setIsUserLoggedIn: (b: boolean) => void;
  saveUserData: () => void;
}

export const Settings = (props: SettingsProps) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [username, setUsername] = useState(props.username);
  const [amountOfVocsPerUnit, setAmountOfVocsPerUnit] = useState(
    props.amountOfVocsPerUnit
  );
  const [selectedColorMode, setSelectedColorMode] = useState(colorMode);

  useEffect(() => {
    if (
      props.amountOfVocsPerUnit === undefined ||
      props.amountOfVocsPerUnit === null
    ) {
      setAmountOfVocsPerUnit(0);
    }
  }, []);

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        makeToast("Erfolgreich abgemelden.");
        props.setIsUserLoggedIn(false);
      })
      .catch(() => makeToast("Da ist leider etwas schiefgelaufen"));
  };

  return (
    <Stack paddingBottom="85px">
      <Heading textAlign="center" mb="10" size="xl">
        Einstellungen
      </Heading>
      <ScrollView>
        <HStack alignItems="center" mb="3">
          <Image
            size={10}
            borderRadius={100}
            alt="Vulcan Icon"
            source={require("../../../assets/Vulcan.png")}
          />
          <Heading textAlign="left" size="lg" paddingLeft="10px">
            Dein Vulcan-Account
          </Heading>
        </HStack>
        <HStack alignItems="center" mb="3">
          <HStack flex={1} alignItems="center" paddingLeft="10px" mb="3">
            <AntDesign
              name={props.isUserLoggedIn ? "checkcircle" : "exclamationcircle"}
              size={24}
              color={props.isUserLoggedIn ? "green" : "orange"}
            />
            <Text
              ml="2"
              color={props.isUserLoggedIn ? "green.700" : "orange.400"}
            >
              {props.isUserLoggedIn
                ? "Du bist erfolgreich eingeloggt."
                : "Du bist aktuell nicht eingeloggt."}
            </Text>
          </HStack>
          {props.isUserLoggedIn && (
            <Button>
              <Ionicons
                name="sync-sharp"
                size={24}
                color="black"
                onPress={() => props.saveUserData()}
              />
            </Button>
          )}
        </HStack>
        {props.isUserLoggedIn && (
          <Button
            width="30%"
            marginLeft="10px"
            leftIcon={
              <MaterialCommunityIcons name="exit-run" size={24} color="white" />
            }
            backgroundColor="gray.400"
            onPress={handleSignOut}
          >
            Abmelden
          </Button>
        )}
        {!props.isUserLoggedIn && (
          <>
            <Button
              bgColor="#ae4951"
              fontSize="20px"
              paddingLeft="10px"
              mb="3"
              onPress={() => props.setSelectedElement(5)}
            >
              Einloggen
            </Button>
            <Text textAlign="left" mb="3" paddingLeft="10px">
              Mit einem kostenfreien Vulcan-Account kannst du deine Vokabeln und
              Einstellungen jederzeit synchronisieren. So brauchst du dir keine
              Sorgen machen, dass deine wertvollen Daten verloren gehen.
            </Text>
          </>
        )}
        <Divider my="3" thickness="1" />
        <Heading textAlign="left" mb="2" size="lg" paddingLeft="10px">
          Benutzername
        </Heading>
        <Text textAlign="left" mb="3" paddingLeft="10px">
          Wir wollen wissen, wie du heißt
        </Text>
        <HStack>
          <Input
            flex={1}
            value={username}
            size="lg"
            onChangeText={(value) => setUsername(value)}
          />
          <Button
            bgColor="#ae4951"
            isDisabled={!username}
            onPress={() => {
              storeUsername(username).then(() =>
                makeToast("Benutzername erfolgreich gespeichert.")
              );
              props.setUsername(username);
            }}
          >
            {<Feather name="save" size={24} color="black" />}
          </Button>
        </HStack>
        <Divider my="3" thickness="1" />
        <Heading textAlign="left" mb="2" size="lg" paddingLeft="10px">
          Anzahl Vokabeln in einer Lernsession
        </Heading>
        <Text textAlign="left" mb="3" paddingLeft="10px">
          Wie viele Wörter sollen in einer Lernsession abgefragt werden?
        </Text>
        <HStack display="flex" alignItems="center" space="sm">
          <Text paddingLeft="5px">{amountOfVocsPerUnit}</Text>
          <Slider
            flex={1}
            value={amountOfVocsPerUnit}
            step={1}
            minValue={0}
            maxValue={props.allVocs.length}
            onChange={(value) => {
              setAmountOfVocsPerUnit(value);
            }}
          >
            <Slider.Track bg="#d4b0b3">
              <Slider.FilledTrack bg="#ae4951" />
            </Slider.Track>
            <Slider.Thumb bg="#ae4951" />
          </Slider>
          <Button
            bgColor="#ae4951"
            isDisabled={!amountOfVocsPerUnit}
            onPress={() => {
              storeAmountOfVocsPerUnit(amountOfVocsPerUnit.toString()).then(
                () => makeToast("Anzahl erfolgreich gespeichert.")
              );
              props.setAmountOfVocsPerUnit(amountOfVocsPerUnit);
            }}
          >
            {<Feather name="save" size={24} color="black" />}
          </Button>
        </HStack>
        <Divider my="3" thickness="1" />
        <Heading textAlign="left" mb="2" size="lg" paddingLeft="10px">
          Beleuchtungsmodus
        </Heading>
        <Text textAlign="left" mb="3" paddingLeft="10px">
          Wechsle zwischen Dark- und Light-Mode
        </Text>
        <HStack display="flex" alignItems="center">
          <HStack flex={1} space={2} alignItems="center" paddingLeft="20px">
            <Feather
              name="moon"
              size={24}
              color={colorMode === "light" ? "black" : "white"}
            />
            <Switch
              onThumbColor="#ae4951"
              onTrackColor="#d4b0b3"
              size="lg"
              isChecked={selectedColorMode === "light" ? true : false}
              onToggle={() => {
                setSelectedColorMode(
                  selectedColorMode === "light" ? "dark" : "light"
                );
              }}
            />
            <Feather
              name="sun"
              size={24}
              color={colorMode === "light" ? "black" : "white"}
            />
          </HStack>
          <Button
            bgColor="#ae4951"
            isDisabled={colorMode === selectedColorMode}
            onPress={() => {
              toggleColorMode();
              storeColorMode(!selectedColorMode ? "light" : selectedColorMode);
            }}
          >
            {<Feather name="save" size={24} color="black" />}
          </Button>
        </HStack>
        <Divider my="3" thickness="1" />
        <Text alignSelf="center">Version {Constants.manifest?.version}</Text>
      </ScrollView>
    </Stack>
  );
};
