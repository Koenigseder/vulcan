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
import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
import {
  storeAmountOfVocsPerUnit,
  storeColorMode,
  storeUsername,
} from "../utils/helper";

interface SettingsInterface {
  username: string;
  setUsername: (s: string) => void;
  amountOfVocsPerUnit: number;
  setAmountOfVocsPerUnit: (n: number) => void;
}

export const Settings = (props: SettingsInterface) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [username, setUsername] = useState(props.username);
  const [amountOfVocsPerUnit, setAmountOfVocsPerUnit] = useState(
    props.amountOfVocsPerUnit
  );
  const [selectedColorMode, setSelectedColorMode] = useState(colorMode);

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
            size="lg"
            onChangeText={(value) => setUsername(value)}
          />
          <Button
            isDisabled={!username}
            onPress={() => {
              storeUsername(username);
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
            minValue={5}
            maxValue={100}
            onChange={(value) => {
              setAmountOfVocsPerUnit(value);
            }}
          >
            <Slider.Track>
              <Slider.FilledTrack />
            </Slider.Track>
            <Slider.Thumb />
          </Slider>
          <Button
            isDisabled={!amountOfVocsPerUnit}
            onPress={() => {
              storeAmountOfVocsPerUnit(amountOfVocsPerUnit.toString());
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
      </ScrollView>
    </Stack>
  );
};
