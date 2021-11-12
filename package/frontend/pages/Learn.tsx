import { Entypo } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/build/Ionicons";
import { Box, Button, HStack, Icon, Progress, Text, VStack } from "native-base";
import React, { useEffect, useState } from "react";
import { VocabularyInterface } from "../interfaces/VocabularyInterface";
import { editRepeatCountVoc } from "../utils/helper";

interface LearnProps {
  vocsPerUnit: number;
  allVocs: VocabularyInterface[];
  setAllVocs: (vocs: VocabularyInterface[]) => void;
  setSelectedElement: (n: number) => void;
}

export const Learn = (props: LearnProps) => {
  const { allVocs, setAllVocs, vocsPerUnit, setSelectedElement } = props;

  const [vocListForUnit, setVocListForUnit] = useState<VocabularyInterface[]>(
    []
  );
  const [currentVocIndex, setCurrentVocIndex] = useState(0);
  const [showSolution, setShowSolution] = useState(false);

  const setupVocListForUnit = () => {
    const vocList: VocabularyInterface[] = [];

    const resultRed = allVocs.filter(
      (value: VocabularyInterface) => value.repeated_without_mistake === null
    );
    const resultOrange = allVocs.filter(
      (value: VocabularyInterface) =>
        value.repeated_without_mistake !== null &&
        value.repeated_without_mistake < 8
    );
    const resultGreen = allVocs.filter(
      (value: VocabularyInterface) =>
        value.repeated_without_mistake !== null &&
        value.repeated_without_mistake >= 8
    );

    for (let i = 1; i <= vocsPerUnit; i++) {
      if (resultRed.length > 0) {
        const randomIndex = Math.floor(Math.random() * resultRed.length);
        const randomVoc = resultRed[randomIndex];
        vocList.push(randomVoc);
        resultRed.splice(randomIndex, 1);
      } else if (resultOrange.length > 0) {
        const randomIndex = Math.floor(Math.random() * resultOrange.length);
        const randomVoc = resultOrange[randomIndex];
        vocList.push(randomVoc);
        resultOrange.splice(randomIndex, 1);
      } else if (resultGreen.length > 0) {
        const randomIndex = Math.floor(Math.random() * resultGreen.length);
        const randomVoc = resultGreen[randomIndex];
        vocList.push(randomVoc);
        resultGreen.splice(randomIndex, 1);
      }
    }
    setVocListForUnit(vocList);
  };

  const modifyRepeatedWithoutMistake = (correct: boolean) => {
    if (currentVocIndex + 1 >= vocsPerUnit) {
      setCurrentVocIndex(currentVocIndex + 1);
      return;
    }
    if (correct) {
      const index = allVocs.findIndex(
        (voc) => voc.id === vocListForUnit[currentVocIndex].id
      );
      editRepeatCountVoc(
        allVocs[index].repeated_without_mistake === null
          ? 1
          : allVocs[index].repeated_without_mistake + 1,
        index
      );
      const newList = [...allVocs];
      newList[index] = {
        ...newList[index],
        repeated_without_mistake:
          allVocs[index].repeated_without_mistake === null
            ? 1
            : allVocs[index].repeated_without_mistake + 1,
      };
      setAllVocs(newList);
    } else {
      const index = allVocs.findIndex(
        (voc) => voc.id === vocListForUnit[currentVocIndex].id
      );
      editRepeatCountVoc(0, index);
      const newList = [...allVocs];
      newList[index] = {
        ...newList[index],
        repeated_without_mistake: 0,
      };
      setAllVocs(newList);
    }
    setCurrentVocIndex(currentVocIndex + 1);
  };

  useEffect(() => {
    setupVocListForUnit();
  }, []);

  return (
    <VStack flex={1} alignItems="center" marginBottom="50px">
      <Text alignSelf="center">
        Fortschritt: {Math.floor((currentVocIndex / vocsPerUnit) * 100)}% (
        {currentVocIndex} von {vocsPerUnit})
      </Text>
      <Progress
        max={vocsPerUnit}
        value={currentVocIndex}
        bg="#d4b0b3"
        _filledTrack={{ bg: "#ae4951" }}
        width="90%"
        marginTop="20px"
      />
      <HStack alignItems="center" flex={1}>
        <Box
          width="80%"
          bg={{
            linearGradient: {
              colors: ["#be632c", "#ae4951", "#57233a"],
              start: [0, 0],
              end: [1, 1],
            },
          }}
          p="5"
          rounded="xl"
        >
          {currentVocIndex + 1 <= vocsPerUnit ? (
            <>
              <Text
                color="white"
                alignSelf="center"
                fontSize="lg"
                bold
                margin="50px"
                textAlign="center"
              >
                {vocListForUnit.length === 0
                  ? "Laden"
                  : vocListForUnit[currentVocIndex]?.foreign_word}
              </Text>
              <Text
                color="white"
                alignSelf="center"
                fontSize="lg"
                marginBottom="50px"
                textAlign="center"
              >
                {showSolution
                  ? vocListForUnit[currentVocIndex]?.known_word
                  : null}
              </Text>
            </>
          ) : (
            <Text
              color="white"
              alignSelf="center"
              fontSize="lg"
              bold
              margin="50px"
              textAlign="center"
            >
              Alle Vokabeln geschafft!
            </Text>
          )}
        </Box>
      </HStack>
      <Button
        disabled={showSolution}
        bg={!showSolution ? "blue.600" : "gray.500"}
        width="50%"
        marginBottom="20px"
        textAlign="center"
        leftIcon={
          currentVocIndex + 1 <= vocsPerUnit ? (
            <Icon as={Entypo} name="eye" size="sm" />
          ) : (
            <Icon as={Ionicons} name="home" size="sm" />
          )
        }
        onPress={() => {
          currentVocIndex + 1 <= vocsPerUnit
            ? setShowSolution(true)
            : setSelectedElement(1);
        }}
      >
        {currentVocIndex + 1 <= vocsPerUnit ? "Auflösen" : "Zurück zu Home"}
      </Button>
      {currentVocIndex + 1 <= vocsPerUnit && (
        <>
          <Button
            disabled={!showSolution}
            bg={showSolution ? "green.600" : "gray.500"}
            width="50%"
            textAlign="center"
            leftIcon={<Icon as={Entypo} name="check" size="sm" />}
            onPress={() => {
              setShowSolution(false);
              modifyRepeatedWithoutMistake(true);
            }}
          >
            Hab ich gewusst
          </Button>
          <Button
            disabled={!showSolution}
            bg={showSolution ? "red.600" : "gray.500"}
            width="50%"
            textAlign="center"
            marginTop="20px"
            leftIcon={<Icon as={Entypo} name="cross" size="sm" />}
            onPress={() => {
              setShowSolution(false);
              modifyRepeatedWithoutMistake(false);
            }}
          >
            Hab ich nicht gewusst
          </Button>
        </>
      )}
    </VStack>
  );
};
