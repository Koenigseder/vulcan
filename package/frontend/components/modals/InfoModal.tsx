import { Modal, Text, Image } from "native-base";
import React from "react";

interface InfoModalProps {
  showInfo: boolean;
  setShowInfo: (b: boolean) => void;
}

export const InfoModal = (props: InfoModalProps) => {
  const { showInfo, setShowInfo } = props;

  return (
    <Modal
      isOpen={showInfo}
      onClose={() => {
        setShowInfo(false);
      }}
    >
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header alignItems="center" fontWeight="bold" fontSize="lg">
          <Image
            borderRadius={100}
            alt="Vulcan Icon"
            source={require("../../../../assets/vulcan.png")}
          />
          <Text>Was ist ein Vulcan-Account?</Text>
        </Modal.Header>
        <Modal.Body>
          <Text textAlign="center" fontSize="md">
            Mit einem kostenfreien Vulcan-Account kannst du deine Vokabeln und
            Einstellungen jederzeit synchronisieren. So brauchst du dir keine
            Sorgen machen, dass deine wertvollen Daten verloren gehen.
          </Text>
          <Text textAlign="center" bold mt="3">
            Für die Nutzung von Vulcan benötigst du nicht zwingend einen
            Account!
          </Text>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};
