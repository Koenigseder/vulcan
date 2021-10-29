import Ionicons from "@expo/vector-icons/build/Ionicons";
import { MaterialIcons } from "@expo/vector-icons";
import { FlatList, Heading, HStack, IconButton, Stack } from "native-base";
import React, { useEffect, useState } from "react";
import {
  defaultVocabularyInterface,
  VocabularyInterface,
} from "../interfaces/VocabularyInterface";
import { VocCard } from "../cards/VocCard";
import { VocModal } from "../components/modals/VocModal";
import { addVoc, getVocs } from "../utils/helper";

interface VocsInterface {}

export const Vocs = (props: VocsInterface) => {
  // const textList: VocabularyInterface[] = [
  //   {
  //     id: 1,
  //     foreign_word: "English",
  //     known_word: "Englisch",
  //   },
  //   {
  //     id: 2,
  //     foreign_word: "German",
  //     known_word: "Deutsch",
  //   },
  //   {
  //     id: 3,
  //     foreign_word: "smell",
  //     known_word: "riechen",
  //   },
  //   {
  //     id: 4,
  //     foreign_word: "cut",
  //     known_word: "schneiden",
  //   },
  //   {
  //     id: 5,
  //     foreign_word: "food",
  //     known_word: "Essen",
  //   },
  //   {
  //     id: 6,
  //     foreign_word: "food",
  //     known_word: "Essen",
  //   },
  //   {
  //     id: 7,
  //     foreign_word: "food",
  //     known_word: "Essen",
  //   },
  //   {
  //     id: 8,
  //     foreign_word: "food",
  //     known_word: "Essen",
  //   },
  //   {
  //     id: 9,
  //     foreign_word: "food",
  //     known_word: "Essen",
  //   },
  // ]

  const [modalVisible, setModalVisible] = useState(false);
  const [allVocs, setAllVocs] = useState<VocabularyInterface[]>();
  const [vocEditKey, setVocEditKey] = useState(-1);
  const [vocEditData, setVocEditData] = useState<VocabularyInterface>({
    ...defaultVocabularyInterface,
  });

  useEffect(() => {
    getVocs().then((value: any) => setAllVocs(value));
  }, [modalVisible]);

  // const handleCreate = () => {
  //   setModalVisible(true);
  //   setVocEditData({ ...defaultVocabularyInterface });
  //   setVocEditKey(-1);
  // };

  // const handleEdit = (voc: VocabularyInterface, index: number) => {
  //   setModalVisible(true);
  //   setVocEditData({ ...voc });
  //   setVocEditKey(index);
  // };

  const handleSaveVoc = (voc: VocabularyInterface) => {
    addVoc({ ...voc }).then(() => setModalVisible(false));
  };

  return (
    <>
      <VocModal
        visible={modalVisible}
        setVisible={setModalVisible}
        editKey={vocEditKey}
        saveData={handleSaveVoc}
        setEditData={setVocEditData}
        editData={vocEditData}
      />
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
              onPress={() => setModalVisible(true)}
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
          data={allVocs}
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
