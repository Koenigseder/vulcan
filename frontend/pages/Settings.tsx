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
  useColorMode,
} from "native-base";
import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface SettingsInterface {}

export const Settings = (props: SettingsInterface) => {
  const [numberVocs, setNumberVocs] = useState(10);
  const [username, setUsername] = useState("");
  const { colorMode, toggleColorMode } = useColorMode();

  const getUsername = async () => {
    try {
      const value = await AsyncStorage.getItem("USERNAME");
      if (value !== null) {
        setUsername(value);
      }
    } catch (e) {
      alert(e);
    }
  };

  const storeUsername = async (value: string) => {
    try {
      await AsyncStorage.setItem("USERNAME", value);
      console.log("saved");
    } catch (e) {
      console.log(e);
    }
  };

  const removeUsername = async (key: string) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      // remove error
    }

    console.log("Done.");
  };

  useEffect(() => {
    // removeUsername("USERNAME");
    getUsername();
  }, []);

  return (
    <Stack>
      <Heading textAlign="center" mb="10" size="xl">
        Einstellungen
      </Heading>
      <ScrollView>
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
            placeholder="Benutzername"
            size="lg"
            onChangeText={(value) => setUsername(value)}
          />
          <Button
            isDisabled={!username}
            onPress={() => storeUsername(username)}
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
        <Stack
          direction="row"
          alignSelf="center"
          space="sm"
          paddingRight="10px"
        >
          <Text>{numberVocs}</Text>
          <Slider
            value={numberVocs}
            step={1}
            minValue={5}
            maxValue={100}
            w="90%"
            onChange={(value) => {
              setNumberVocs(Math.floor(value));
            }}
          >
            <Slider.Track>
              <Slider.FilledTrack />
            </Slider.Track>
            <Slider.Thumb />
          </Slider>
        </Stack>
        <Divider my="3" thickness="1" />
        <Heading textAlign="left" mb="2" size="lg" paddingLeft="10px">
          Beleuchtungsmodus
        </Heading>
        <Text textAlign="left" mb="3" paddingLeft="10px">
          Wechsle zwischen Dark- und Light-Mode
        </Text>
        <HStack space={2} alignItems="center" paddingLeft="20px">
          <Feather
            name="moon"
            size={24}
            color={colorMode === "light" ? "black" : "white"}
          />
          <Switch
            size="lg"
            isChecked={colorMode === "light" ? true : false}
            onToggle={toggleColorMode}
          />
          <Feather
            name="sun"
            size={24}
            color={colorMode === "light" ? "black" : "white"}
          />
        </HStack>
        <Divider my="3" thickness="1" />
      </ScrollView>
    </Stack>
  );
};
