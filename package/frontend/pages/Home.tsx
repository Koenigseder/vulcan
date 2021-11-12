import {
  Button,
  Divider,
  Heading,
  Icon,
  ScrollView,
  Stack,
  Text,
} from "native-base";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { makeToast } from "../utils/helper";
import { VocabularyInterface } from "../interfaces/VocabularyInterface";

interface HomeProps {
  username: string;
  setSelectedElement: (n: number) => void;
  allVocs: VocabularyInterface[];
}

export const Home = (props: HomeProps) => {
  const getTrafficLightColor = () => {
    const resultRed = props.allVocs.filter(
      (value: VocabularyInterface) => value.repeated_without_mistake === null
    );
    const resultOrange = props.allVocs.filter(
      (value: VocabularyInterface) =>
        value.repeated_without_mistake !== null &&
        value.repeated_without_mistake < 8
    );
    const resultGreen = props.allVocs.filter(
      (value: VocabularyInterface) =>
        value.repeated_without_mistake !== null &&
        value.repeated_without_mistake >= 8
    );
    if (resultRed.length >= resultOrange.length && resultRed >= resultGreen) {
      return "Du hast am meisten Vokabeln, die noch nie geübt wurden.";
    } else if (resultOrange >= resultRed && resultOrange >= resultGreen) {
      return "Du hast am meisten Vokabeln, die noch noch nicht oft geübt wurden.";
    } else if (resultGreen >= resultRed && resultGreen >= resultOrange) {
      return "Du hast am meisten Vokabeln, die oft genug geübt wurden.";
    }
  };

  return (
    <>
      <Stack>
        <Heading textAlign="center" mb="10" size="xl">
          Home
        </Heading>
        <ScrollView>
          <Heading textAlign="center" mb="2" size="md">
            {`Hallo ${props.username}, schön dich wiederzusehen!`}
          </Heading>
          <Divider my="3" thickness="1" />
          <Heading textAlign="center" mb="2" size="md" paddingLeft="10px">
            Hier sind deine Statistiken:
          </Heading>
          <Text paddingLeft="10px" textAlign="center">
            {getTrafficLightColor()}
          </Text>
        </ScrollView>
      </Stack>
      <Button
        bgColor="#ae4951"
        leftIcon={<Icon as={Ionicons} name="school" size="sm" />}
        style={{ position: "absolute", bottom: 20, alignSelf: "center" }}
        onPress={() =>
          props.allVocs.length > 0
            ? props.setSelectedElement(3)
            : makeToast("Es sind noch keine Vokabeln vorhanden", null)
        }
      >
        Jetzt lernen!
      </Button>
    </>
  );
};
