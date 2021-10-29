import { Button, FormControl, Input, Modal } from "native-base";
import React, { useEffect } from "react";
import { useState } from "react";
import { VocabularyInterface } from "../../interfaces/VocabularyInterface";
import { addVoc, getVocs, removeItem } from "../../utils/helper";

interface VocModalProps {
  visible: boolean;
  setVisible: (b: boolean) => void;
  saveData: (voc: VocabularyInterface) => void;
  editKey: number;
  editData: VocabularyInterface;
  setEditData: (q: VocabularyInterface) => void;
}

export const VocModal = (props: VocModalProps) => {
  const [inputForeignWord, setInputForeignWord] = useState("");
  const [inputKnownWord, setInputKnownWord] = useState("");

  return (
    <Modal
      isOpen={props.visible}
      onClose={() => {
        props.setVisible(false);
        setInputKnownWord("");
        setInputForeignWord("");
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
                props.setVisible(false);
                setInputForeignWord("");
                setInputKnownWord("");
              }}
            >
              Abbrechen
            </Button>
            <Button
              isDisabled={!inputForeignWord.trim() || !inputKnownWord.trim()}
              onPress={() => {
                props.saveData({
                  id: -1,
                  foreign_word: inputForeignWord.trim(),
                  known_word: inputKnownWord.trim(),
                });
                setInputForeignWord("");
                setInputKnownWord("");
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
