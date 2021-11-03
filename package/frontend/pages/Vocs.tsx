import Ionicons from "@expo/vector-icons/build/Ionicons";
import { MaterialIcons } from "@expo/vector-icons";
import {
  AlertDialog,
  Button,
  Center,
  FlatList,
  Heading,
  HStack,
  IconButton,
  Spinner,
  Stack,
  Text,
  VStack,
} from "native-base";
import React, { useEffect, useRef, useState } from "react";
import { VocabularyInterface } from "../interfaces/VocabularyInterface";
import { VocCard } from "../cards/VocCard";
import { VocModal } from "../components/modals/VocModal";
import { createVoc, deleteVoc, editVoc, getVocs } from "../utils/helper";
import { TouchableOpacity } from "react-native";

interface VocsProps {}

export const Vocs = (props: VocsProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [allVocs, setAllVocs] = useState<VocabularyInterface[]>();
  const [isLoading, setIsLoading] = useState(true);

  const [editKey, setEditKey] = useState(-1);

  const cancelRef = useRef<TouchableOpacity>();
  const [alertVisible, setAlertVisible] = useState(false);

  const handleCreateVoc = (voc: VocabularyInterface) => {
    createVoc({ ...voc }).then(() => setModalVisible(false));
  };

  const handleEditVoc = (voc: VocabularyInterface, index: number) => {
    editVoc({ ...voc }, index).then(() => setModalVisible(false));
  };

  const handleDeleteVoc = (index: number) => {
    deleteVoc(index).then(() => {
      setModalVisible(false);
      setAlertVisible(false);
    });
  };

  useEffect(() => {
    getVocs().then((value: any) => {
      setAllVocs(value);
      setIsLoading(false);
    });
  }, [modalVisible]);

  return (
    <>
      <VocModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        setAlertVisible={setAlertVisible}
        editKey={editKey}
        allVocs={allVocs}
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
              alertVisible ? allVocs[editKey].foreign_word : ""
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
              onPress={() => {
                setModalVisible(true);
                setEditKey(-1);
              }}
            />
            <IconButton
              alignSelf="flex-start"
              key="search"
              variant="ghost"
              _icon={{ as: Ionicons, name: "search" }}
            />
          </HStack>
        </HStack>
        {isLoading ? (
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
            data={allVocs}
            renderItem={({ item, index }) => (
              <VocCard
                index={index}
                setEditKey={setEditKey}
                setModalVisible={setModalVisible}
                foreign_word={item.foreign_word}
                known_word={item.known_word}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        )}
      </Stack>
    </>
  );
};
