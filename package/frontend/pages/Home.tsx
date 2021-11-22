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
  amountOfVocsPerUnit: number;
}

export const Home = (props: HomeProps) => {
  const getTrafficLightColor = () => {
    if (props.allVocs?.length <= 0 || !props.allVocs)
      return "Noch keine Statistiken vorhanden.";
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
      return "Die meisten Vokabeln wurden noch nicht geübt.";
    } else if (resultOrange >= resultRed && resultOrange >= resultGreen) {
      return "Die meisten Vokabeln wurden noch nicht oft genug geübt.";
    } else if (resultGreen >= resultRed && resultGreen >= resultOrange) {
      return "Die meisten Vokabeln wurden oft genug geübt.";
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
        onPress={() => {
          props.allVocs === undefined ||
          props.allVocs === null ||
          props.allVocs.length <= 0
            ? makeToast("Es sind noch keine Vokabeln vorhanden.")
            : props.amountOfVocsPerUnit <= 0
            ? makeToast(
                "Bitte passe die Anzahl der Vokabeln in den Einstellungen an."
              )
            : props.setSelectedElement(3);
        }}
      >
        Jetzt lernen!
      </Button>
    </>
  );
};
