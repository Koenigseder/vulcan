import MaterialIcons from "@expo/vector-icons/build/MaterialIcons";
import { Button, FormControl, Input, Modal, Row } from "native-base";
import React, { useEffect } from "react";
import { useState } from "react";
import { VocabularyInterface } from "../../interfaces/VocabularyInterface";

interface VocModalProps {
  modalVisible: boolean;
  setModalVisible: (b: boolean) => void;
  setAlertVisible: (b: boolean) => void;
  allVocs: VocabularyInterface[];
  editKey: number;
  createVoc: (voc: VocabularyInterface) => void;
  editVoc: (voc: VocabularyInterface, index: number) => void;
}

export const VocModal = (props: VocModalProps) => {
  const [inputForeignWord, setInputForeignWord] = useState("");
  const [inputKnownWord, setInputKnownWord] = useState("");

  useEffect(() => {
    if (!props.modalVisible) {
      setInputForeignWord("");
      setInputKnownWord("");
    } else {
      if (props.editKey !== -1) {
        setInputForeignWord(props.allVocs[props.editKey].foreign_word);
        setInputKnownWord(props.allVocs[props.editKey].known_word);
      }
    }
  }, [props.modalVisible]);

  return (
    <Modal
      isOpen={props.modalVisible}
      onClose={() => {
        props.setModalVisible(false);
      }}
    >
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Header>
          {props.editKey === -1
            ? "Neue Vokabel hinzufügen"
            : "Vokabel bearbeiten"}
        </Modal.Header>
        <Modal.Body>
          <FormControl>
            <FormControl.Label>Fremdwort</FormControl.Label>
            <Input
              value={inputForeignWord}
              onChangeText={(value: string) => setInputForeignWord(value)}
            />
          </FormControl>
          <FormControl mt="3">
            <FormControl.Label>Übersetzung</FormControl.Label>
            <Input
              value={inputKnownWord}
              onChangeText={(value: string) => setInputKnownWord(value)}
            />
          </FormControl>
        </Modal.Body>
        <Modal.Footer>
          <Button.Group flex={1}>
            {props.editKey !== -1 ? (
              <Button
                colorScheme="danger"
                onPress={() => {
                  props.setAlertVisible(true);
                }}
              >
                <MaterialIcons name="delete" size={24} color="white" />
              </Button>
            ) : (
              <></>
            )}
            <Row flex={1} justifyContent="flex-end" space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  props.setModalVisible(false);
                }}
              >
                Abbrechen
              </Button>
              <Button
                bgColor="#ae4951"
                isDisabled={!inputForeignWord.trim() || !inputKnownWord.trim()}
                onPress={() => {
                  props.editKey === -1
                    ? props.createVoc({
                        id: -1,
                        foreign_word: inputForeignWord.trim(),
                        known_word: inputKnownWord.trim(),
                      })
                    : props.editVoc(
                        {
                          id: -1,
                          foreign_word: inputForeignWord.trim(),
                          known_word: inputKnownWord.trim(),
                        },
                        props.editKey
                      );
                }}
              >
                Speichern
              </Button>
            </Row>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};
