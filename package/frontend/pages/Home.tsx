import {
  Button,
  Center,
  Divider,
  Heading,
  HStack,
  Icon,
  ScrollView,
  Stack,
  Text,
  Image,
  VStack,
} from "native-base";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { makeToast } from "../utils/helper";
import { VocabularyInterface } from "../interfaces/VocabularyInterface";
import { VictoryPie } from "victory-native";
import { Octicons, Feather } from "@expo/vector-icons";

interface HomeProps {
  username: string;
  setSelectedElement: (n: number) => void;
  allVocs: VocabularyInterface[];
  amountOfVocsPerUnit: number;
}

export const Home = (props: HomeProps) => {
  const getTrafficLightColor = () => {
    if (props.allVocs?.length <= 0 || !props.allVocs)
      return { resultNone: null };

    const resultRed = props.allVocs.filter(
      (value: VocabularyInterface) => value.repeated_without_mistake === null
    );
    const resultOrange = props.allVocs.filter(
      (value: VocabularyInterface) =>
        value.repeated_without_mistake !== null &&
        value.repeated_without_mistake < 5
    );
    const resultGreen = props.allVocs.filter(
      (value: VocabularyInterface) =>
        value.repeated_without_mistake !== null &&
        value.repeated_without_mistake >= 5
    );

    return {
      resultRed: resultRed.length,
      resultOrange: resultOrange.length,
      resultGreen: resultGreen.length,
    };
  };

  const { resultRed, resultOrange, resultGreen, resultNone } =
    getTrafficLightColor();

  return (
    <>
      <Stack flex={1}>
        <Heading textAlign="center" mb="10" size="xl">
          Home
        </Heading>
        <Heading textAlign="center" mb="2" size="md">
          {`Hallo ${props.username}, schön dich zu sehen!`}
        </Heading>
        <Divider my="3" thickness="1" />
        <ScrollView marginBottom="65">
          {resultRed || resultOrange || resultGreen ? (
            <>
              <Heading textAlign="center" mb="2" size="md" paddingLeft="10px">
                Hier sind deine Statistiken:
              </Heading>
              <Center marginTop="-30px">
                <VictoryPie
                  data={[
                    ...(resultRed
                      ? [{ x: `x ${resultRed}`, y: resultRed }]
                      : []),
                    ...(resultOrange
                      ? [{ x: `x ${resultOrange}`, y: resultOrange }]
                      : []),
                    ...(resultGreen
                      ? [{ x: `x ${resultGreen}`, y: resultGreen }]
                      : []),
                  ]}
                  colorScale={[
                    ...(resultRed ? ["red"] : []),
                    ...(resultOrange ? ["orange"] : []),
                    ...(resultGreen ? ["green"] : []),
                  ]}
                  labelRadius={({ innerRadius }) => innerRadius + 25}
                  innerRadius={50}
                  style={{
                    labels: { fill: "white", fontSize: 20, fontWeight: "bold" },
                  }}
                />
              </Center>
              <HStack justifyContent="center" space={4} flexDirection="row">
                <HStack
                  space={1}
                  flex={1}
                  justifyContent="center"
                  alignItems="center"
                >
                  <Octicons name="dot-fill" size={24} color="red" />
                  <Text textAlign="center">Nie geübt</Text>
                </HStack>
                <HStack
                  space={1}
                  flex={1}
                  justifyContent="center"
                  alignItems="center"
                >
                  <Octicons name="dot-fill" size={24} color="orange" />
                  <Text textAlign="center">Nicht oft genug geübt</Text>
                </HStack>
                <HStack
                  space={1}
                  flex={1}
                  justifyContent="center"
                  alignItems="center"
                >
                  <Octicons name="dot-fill" size={24} color="green" />
                  <Text textAlign="center">Genug geübt</Text>
                </HStack>
              </HStack>
            </>
          ) : (
            <VStack justifyContent="center" alignItems="center">
              <Text textAlign="center" fontSize="lg" bold mb="30">
                Es ist noch ziemlich ruhig hier...
              </Text>
              <Image
                mb="5"
                size={300}
                resizeMode="contain"
                alt="Inactive Vulcan"
                source={require("../../../assets/inactive-vulcan-export.png")}
              />
              <Text textAlign="center" fontSize="lg">
                Fange an und füge deine ersten Vokabeln hinzu.
              </Text>
            </VStack>
          )}
        </ScrollView>
      </Stack>
      {props.allVocs === undefined ||
      props.allVocs === null ||
      props.allVocs.length <= 0 ? (
        <Button
          bg="#ae4951"
          leftIcon={<Icon as={Feather} name="book" size="sm" />}
          style={{ position: "absolute", bottom: 20, alignSelf: "center" }}
          onPress={() => {
            props.setSelectedElement(0);
          }}
        >
          Vokablen hinzufügen!
        </Button>
      ) : (
        <Button
          bg="#ae4951"
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
      )}
    </>
  );
};
