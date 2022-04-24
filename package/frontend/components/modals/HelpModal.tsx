import { Modal, Text } from "native-base";
import React from "react";

interface HelpModalProps {
  showHelp: boolean;
  setShowHelp: (b: boolean) => void;
}

export const HelpModal = (props: HelpModalProps) => {
  const { showHelp, setShowHelp } = props;

  return (
    <Modal
      isOpen={showHelp}
      onClose={() => {
        setShowHelp(false);
      }}
    >
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header alignItems="center" fontWeight="bold" fontSize="lg">
          Hilfe
        </Modal.Header>
        <Modal.Body>
          <Text textAlign="center" fontWeight="bold" fontSize="lg">
            Welchen Modus soll ich nehmen?
          </Text>
          <Text marginTop="20px" fontSize="md">
            Die Modi unterscheiden sich wie folgt:
          </Text>
          <Text marginTop="10px" fontSize="md" fontWeight="bold">
            Fremdwort:
          </Text>
          <Text>
            Hier ist das Fremdwort aufgedeckt und die Übersetzung muss erraten
            werden.
          </Text>
          <Text marginTop="10px" fontSize="md" fontWeight="bold">
            Übersetzung:
          </Text>
          <Text>
            Hier ist die Übersetzung aufgedeckt und das Fremdwort muss erraten
            werden.
          </Text>
          <Text marginTop="10px" fontSize="md" fontWeight="bold">
            Gemischt
          </Text>
          <Text>
            Hier wird abwechselnd das Fremdwort und die Übersetzung aufgedeckt.
            Es wird immer die Seite aufgedeckt, welche als letztes von diesem
            Wort gesucht wurde.
          </Text>
          <Text>
            <Text fontWeight="bold">Beispiel am Wort "bottle": </Text>
            Letztes Mal wurde das Wort "bottle" abgefragt und das Fremdwort war
            aufgedeckt. Das bedeutet, dass nun in diesem Modus die Übersetzung
            aufgedeckt ist, also "Flasche". Errät man das Wort richtig, ist es
            beim nächsten mal genau anders herum.
          </Text>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};
