import Ionicons from "@expo/vector-icons/build/Ionicons";
import { MaterialIcons } from "@expo/vector-icons";
import {
  Center,
  FlatList,
  Heading,
  HStack,
  IconButton,
  Spinner,
  Stack,
} from "native-base";
import React, { useEffect, useState } from "react";
import {
  defaultVocabularyInterface,
  VocabularyInterface,
} from "../interfaces/VocabularyInterface";
import { VocCard } from "../cards/VocCard";
import { VocModal } from "../components/modals/VocModal";
import { createVoc, getVocs } from "../utils/helper";

interface VocsProps {}

export const Vocs = (props: VocsProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [allVocs, setAllVocs] = useState<VocabularyInterface[]>();
  const [isLoading, setIsLoading] = useState(true);
  // const [vocEditKey, setVocEditKey] = useState(-1);
  // const [vocEditData, setVocEditData] = useState<VocabularyInterface>({
  //   ...defaultVocabularyInterface,
  // });

  const handleCreateVoc = (voc: VocabularyInterface) => {
    createVoc({ ...voc }).then(() => setModalVisible(false));
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
        createVoc={handleCreateVoc}
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
        {isLoading ? (
          <Center flex={1}>
            <Spinner size="lg" />
            <Heading color="primary.500" fontSize="lg" paddingTop="10px">
              Laden
            </Heading>
          </Center>
        ) : (
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
        )}
      </Stack>
    </>
  );
};
