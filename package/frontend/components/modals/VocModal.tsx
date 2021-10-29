import { Button, FormControl, Input, Modal } from "native-base";
import React, { useEffect } from "react";
import { useState } from "react";
import { VocabularyInterface } from "../../interfaces/VocabularyInterface";

interface VocModalProps {
  modalVisible: boolean;
  setModalVisible: (b: boolean) => void;
  createVoc: (voc: VocabularyInterface) => void;
}

export const VocModal = (props: VocModalProps) => {
  const [inputForeignWord, setInputForeignWord] = useState("");
  const [inputKnownWord, setInputKnownWord] = useState("");

  useEffect(() => {
    if (!props.modalVisible) {
      setInputForeignWord("");
      setInputKnownWord("");
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
        <Modal.Header>Neue Vokabel hinzufügen</Modal.Header>
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
          <Button.Group space={2}>
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
              isDisabled={!inputForeignWord.trim() || !inputKnownWord.trim()}
              onPress={() => {
                props.createVoc({
                  id: -1,
                  foreign_word: inputForeignWord.trim(),
                  known_word: inputKnownWord.trim(),
                });
              }}
            >
              Speichern
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};
