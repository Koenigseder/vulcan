import Ionicons from "@expo/vector-icons/build/Ionicons";
import { MaterialIcons } from "@expo/vector-icons";
import {
  Box,
  Button,
  Collapse,
  Divider,
  Fab,
  FlatList,
  Heading,
  HStack,
  Icon,
  IconButton,
  Stack,
  Stagger,
  Text,
  useDisclose,
} from "native-base";
import React from "react";
import { VocabularyInterface } from "../interfaces/VocabularyInterface";
import { VocCard } from "../cards/VocCard";

interface VocsInterface {}

export const Vocs = (props: VocsInterface) => {
  const textList: VocabularyInterface[] = [
    {
      id: 1,
      foreign_word: "English",
      known_word: "Englisch",
    },
    {
      id: 2,
      foreign_word: "German",
      known_word: "Deutsch",
    },
    {
      id: 3,
      foreign_word: "smell",
      known_word: "riechen",
    },
    {
      id: 4,
      foreign_word: "cut",
      known_word: "schneiden",
    },
    {
      id: 5,
      foreign_word: "food",
      known_word: "Essen",
    },
    {
      id: 6,
      foreign_word: "food",
      known_word: "Essen",
    },
    {
      id: 7,
      foreign_word: "food",
      known_word: "Essen",
    },
    {
      id: 8,
      foreign_word: "food",
      known_word: "Essen",
    },
    {
      id: 9,
      foreign_word: "food",
      known_word: "Essen",
    },
  ];

  return (
    <>
      <Stack flex={1}>
        <HStack display="flex" alignItems="center" mb={5}>
          <Heading flex={1} textAlign="left" paddingLeft="10px" size="xl">
            Vokabeln
          </Heading>
          <HStack flex={1} flexDirection="row" justifyContent="flex-end">
            <IconButton
              alignSelf="flex-start"
              key="add"
              variant="ghost"
              _icon={{ as: MaterialIcons, name: "add" }}
            />
            <IconButton
              alignSelf="flex-start"
              key="search"
              variant="ghost"
              _icon={{ as: Ionicons, name: "search" }}
            />
          </HStack>
        </HStack>
        <FlatList
          data={textList}
          renderItem={({ item, index }) => (
            <VocCard
              foreign_word={item.foreign_word}
              known_word={item.known_word}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </Stack>
    </>
  );
};
