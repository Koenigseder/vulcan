import Ionicons from "@expo/vector-icons/build/Ionicons";
import { MaterialIcons } from "@expo/vector-icons";
import {
  AlertDialog,
  Button,
  Center,
  FlatList,
  Heading,
  HStack,
  Icon,
  IconButton,
  Input,
  Spinner,
  Stack,
  Text,
} from "native-base";
import React, { useEffect, useRef, useState } from "react";
import { VocabularyInterface } from "../interfaces/VocabularyInterface";
import { VocCard } from "../components/cards/VocCard";
import { VocModal } from "../components/modals/VocModal";
import { createVoc, deleteVoc, editVoc } from "../utils/helper";
import { BackHandler, TouchableOpacity } from "react-native";
import { QueryModes } from "../enums/QueryModesEnum";

interface VocsProps {
  allVocs: VocabularyInterface[];
  setAllVocs: (vocs: VocabularyInterface[]) => void;
  isAllVocsLoading: boolean;
  setSelectedElement: (n: number) => void;
}

export const Vocs = (props: VocsProps) => {
  const { allVocs, setAllVocs, isAllVocsLoading } = props;

  const [vocs, setVocs] = useState(allVocs);

  const [modalVisible, setModalVisible] = useState(false);
  const [editKey, setEditKey] = useState(-1);

  const [inputSearch, setInputSearch] = useState("");

  const cancelRef = useRef<TouchableOpacity>();
  const [alertVisible, setAlertVisible] = useState(false);

  useEffect(() => {
    setVocs(allVocs);
  }, [allVocs]);

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  const backAction = () => {
    props.setSelectedElement(1);
    return true;
  };

  const handleCreateVoc = (voc: VocabularyInterface) => {
    createVoc({ ...voc }).then(() => {
      setModalVisible(false);
      if (allVocs === null || allVocs.length === 0) {
        setAllVocs([
          {
            ...voc,
            id: 0,
            repeated_without_mistake: null,
            last_voc_side_queried: QueryModes.knownWord,
          },
        ]);
      } else {
        const newList = [...allVocs];
        newList.push({
          ...voc,
          id: newList[newList.length - 1].id + 1,
          repeated_without_mistake: null,
          last_voc_side_queried: QueryModes.knownWord,
        });
        setAllVocs(newList);
      }
    });
  };

  const handleEditVoc = (voc: VocabularyInterface, index: number) => {
    editVoc({ ...voc }, index).then(() => {
      setModalVisible(false);
      const newList = [...allVocs];
      newList[index].foreign_word = voc.foreign_word;
      newList[index].known_word = voc.known_word;
      setAllVocs(newList);
      setVocs(newList);
      setInputSearch("");
    });
  };

  const handleDeleteVoc = (index: number) => {
    deleteVoc(index).then(() => {
      setModalVisible(false);
      setAlertVisible(false);
      const newVocs = [...allVocs];
      newVocs.splice(index, 1);
      setAllVocs(newVocs);
    });
  };

  const handleSearch = (input: string) => {
    const filteredVocs = allVocs.filter(
      (value: VocabularyInterface) =>
        value.foreign_word
          .toLowerCase()
          .startsWith(input.trim().toLowerCase()) ||
        value.known_word.toLowerCase().startsWith(input.trim().toLowerCase())
    );
    setVocs(filteredVocs);
  };

  return (
    <>
      <VocModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        setAlertVisible={setAlertVisible}
        editKey={editKey}
        allVocs={props.allVocs}
        createVoc={handleCreateVoc}
        editVoc={handleEditVoc}
      />
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={alertVisible}
        onClose={() => setAlertVisible(false)}
      >
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>Vokabel löschen</AlertDialog.Header>
          <AlertDialog.Body>
            <Text>{`Bist du sicher, dass du die Vokabel "${
              alertVisible ? props.allVocs[editKey].foreign_word : ""
            }" löschen möchtest?`}</Text>
            <Text bold style={{ color: "red" }}>
              Dies kann nicht rückgängig gemacht werden!
            </Text>
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="coolGray"
                onPress={() => setAlertVisible(false)}
              >
                Abbrechen
              </Button>
              <Button
                colorScheme="danger"
                onPress={() => handleDeleteVoc(editKey)}
              >
                Löschen
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
      <Stack flex={1}>
        <Heading textAlign="center" size="xl">
          Vokabeln
        </Heading>
        <HStack mt="10px" flexDirection="row" width="100%">
          <Input
            mb="20px"
            flex={1}
            placeholder="Vokabel suchen"
            value={inputSearch}
            onChangeText={(value: string) => {
              setInputSearch(value);
              handleSearch(value);
            }}
            variant="filled"
            borderRadius="20"
            InputLeftElement={
              <Icon ml="2" size="5" as={<Ionicons name="search" />} />
            }
            InputRightElement={
              <Text
                mr="10px"
                onPress={() => {
                  setInputSearch("");
                  setVocs(allVocs);
                }}
              >
                Abbrechen
              </Text>
            }
          />
          <IconButton
            alignSelf="flex-start"
            key="add"
            variant="ghost"
            _icon={{ as: MaterialIcons, name: "add" }}
            onPress={() => {
              setModalVisible(true);
              setEditKey(-1);
            }}
          />
        </HStack>
        {isAllVocsLoading ? (
          <Center flex={1}>
            <Spinner size="lg" />
            <Heading color="primary.500" fontSize="lg" paddingTop="10px">
              Laden
            </Heading>
          </Center>
        ) : !allVocs || allVocs.length === 0 ? (
          <Center flex={1}>
            <Heading color="primary.500" fontSize="lg">
              Hier sieht es noch sehr leer aus...
            </Heading>
          </Center>
        ) : (
          <FlatList
            data={vocs}
            renderItem={({ item, index }) => (
              <VocCard
                index={allVocs
                  .map((e) => e.foreign_word)
                  .indexOf(item.foreign_word)}
                setEditKey={setEditKey}
                setModalVisible={setModalVisible}
                foreign_word={item.foreign_word}
                known_word={item.known_word}
                repeated_without_mistake={item.repeated_without_mistake}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        )}
      </Stack>
    </>
  );
};
