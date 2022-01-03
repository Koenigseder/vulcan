import Constants from "expo-constants";
import {
  Button,
  Divider,
  Heading,
  HStack,
  Input,
  ScrollView,
  Slider,
  Stack,
  Switch,
  Text,
  Image,
  useColorMode,
  VStack,
  Modal,
  Row,
  FormControl,
} from "native-base";
import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import {
  lastEditTime,
  makeToast,
  storeAmountOfVocsPerUnit,
  storeColorMode,
  storeUsername,
} from "../utils/helper";
import { VocabularyInterface } from "../interfaces/VocabularyInterface";
import AntDesign from "@expo/vector-icons/build/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/build/MaterialCommunityIcons";
import { auth } from "../../../firebase";

enum actionEnum {
  SIGN_OUT = "SIGN_OUT",
  STORE_TO_LOCAL = "STORE_TO_LOCAL",
  STORE_TO_FIRESTORE = "STORE_TO_FIRESTORE",
}

interface SettingsProps {
  username: string;
  setUsername: (s: string) => void;
  amountOfVocsPerUnit: number;
  setAmountOfVocsPerUnit: (n: number) => void;
  allVocs: VocabularyInterface[];
  setSelectedElement: (n: number) => void;
  isUserLoggedIn: boolean;
  setIsUserLoggedIn: (b: boolean) => void;
  getUserDataFromFirestore: () => void;
  saveUserDataToFirestore: () => void;
}

interface NoteProps {
  action: actionEnum;
  modalVisible: boolean;
  setModalVisible: (b: boolean) => void;
  handleSignout: () => void;
  getUserDataFromFirestore: () => void;
  saveUserDataToFirestore: () => void;
}

const Note = (props: NoteProps) => {
  return (
    <Modal
      isOpen={props.modalVisible}
      onClose={() => {
        props.setModalVisible(false);
      }}
    >
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Header>Benachrichtigung</Modal.Header>
        <Modal.Body>
          <FormControl>
            <FormControl.Label justifyContent="center" mt="3">
              <Text fontSize="15px" textAlign="center" bold>
                {props.action === actionEnum.SIGN_OUT
                  ? "Willst du dich wirklich abmelden?"
                  : props.action === actionEnum.STORE_TO_FIRESTORE
                  ? "Willst du deine lokalen Daten in die Cloud speichern?"
                  : "Willst du deine lokalen Daten mit denen aus der Cloud überschreiben?"}
              </Text>
            </FormControl.Label>
          </FormControl>
          <FormControl>
            <FormControl.Label justifyContent="center" mt="3">
              <Text fontSize="15px" textAlign="center" color="red.500">
                {props.action === actionEnum.SIGN_OUT
                  ? "Abgemeldet hast du keinen Zugriff auf die Cloud-Funktionen!"
                  : props.action === actionEnum.STORE_TO_FIRESTORE
                  ? "Bisherige Daten in der Cloud werden überschrieben!"
                  : "Bisherige lokale Daten werden überschrieben!"}
              </Text>
            </FormControl.Label>
          </FormControl>
        </Modal.Body>
        <Modal.Footer>
          <Button.Group flex={1}>
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
                onPress={() => {
                  props.action === actionEnum.SIGN_OUT
                    ? props.handleSignout()
                    : props.action === actionEnum.STORE_TO_FIRESTORE
                    ? props.saveUserDataToFirestore()
                    : props.getUserDataFromFirestore();

                  props.setModalVisible(false);
                }}
              >
                {props.action === actionEnum.SIGN_OUT
                  ? "Abmelden"
                  : "Synchronisieren"}
              </Button>
            </Row>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export const Settings = (props: SettingsProps) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [username, setUsername] = useState(props.username);
  const [amountOfVocsPerUnit, setAmountOfVocsPerUnit] = useState(
    props.amountOfVocsPerUnit
  );
  const [selectedColorMode, setSelectedColorMode] = useState(colorMode);

  const [noteModalVisible, setNoteModalVisible] = useState(false);
  const [action, setAction] = useState<actionEnum>();

  useEffect(() => {
    if (
      props.amountOfVocsPerUnit === undefined ||
      props.amountOfVocsPerUnit === null
    ) {
      setAmountOfVocsPerUnit(0);
    }
  }, []);

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        makeToast("Erfolgreich abgemelden.");
        props.setIsUserLoggedIn(false);
      })
      .catch(() => makeToast("Da ist leider etwas schiefgelaufen"));
  };

  return (
    <Stack paddingBottom="85px">
      <Note
        action={action}
        modalVisible={noteModalVisible}
        setModalVisible={setNoteModalVisible}
        handleSignout={handleSignOut}
        saveUserDataToFirestore={props.saveUserDataToFirestore}
        getUserDataFromFirestore={props.getUserDataFromFirestore}
      />
      <Heading textAlign="center" mb="10" size="xl">
        Einstellungen
      </Heading>
      <ScrollView>
        <HStack alignItems="center" mb="3">
          <Image
            size={10}
            borderRadius={100}
            alt="Vulcan Icon"
            source={require("../../../assets/Vulcan.png")}
          />
          <Heading textAlign="left" size="lg" paddingLeft="10px">
            Dein Vulcan-Account
          </Heading>
        </HStack>
        <VStack alignItems="center" mb="3" paddingLeft="10px">
          <HStack alignItems="center">
            <HStack flex={1} alignItems="center">
              <AntDesign
                name={
                  props.isUserLoggedIn ? "checkcircle" : "exclamationcircle"
                }
                size={24}
                color={props.isUserLoggedIn ? "green" : "orange"}
              />
              <Text
                ml="2"
                color={props.isUserLoggedIn ? "green.700" : "orange.400"}
              >
                {props.isUserLoggedIn
                  ? "Du bist erfolgreich eingeloggt."
                  : "Du bist aktuell nicht eingeloggt."}
              </Text>
            </HStack>
            {props.isUserLoggedIn && (
              <Button
                marginLeft="10px"
                leftIcon={
                  <MaterialCommunityIcons
                    name="exit-run"
                    size={24}
                    color="white"
                  />
                }
                backgroundColor="gray.400"
                onPress={() => {
                  setAction(actionEnum.SIGN_OUT);
                  setNoteModalVisible(true);
                }}
              />
            )}
          </HStack>
        </VStack>
        {props.isUserLoggedIn && (
          <VStack>
            <Text alignSelf="center" mb="10px" fontSize="15px">
              Aktionen mit der Cloud:
            </Text>
            <HStack justifyContent="center" space={2}>
              <Button
                isDisabled={lastEditTime === 0}
                onPress={() => {
                  setAction(actionEnum.STORE_TO_FIRESTORE);
                  setNoteModalVisible(true);
                }}
                bgColor="#ae4951"
                leftIcon={
                  <Feather name="upload-cloud" size={24} color="white" />
                }
              >
                Daten sichern
              </Button>
              <Button
                isDisabled
                onPress={() => {
                  setAction(actionEnum.STORE_TO_LOCAL);
                  setNoteModalVisible(true);
                }}
                bgColor="#ae4951"
                leftIcon={
                  <Feather name="download-cloud" size={24} color="white" />
                }
              >
                Daten abrufen
              </Button>
            </HStack>
          </VStack>
        )}
        {!props.isUserLoggedIn && (
          <>
            <Button
              bgColor="#ae4951"
              fontSize="20px"
              paddingLeft="10px"
              mb="3"
              onPress={() => props.setSelectedElement(5)}
            >
              Einloggen
            </Button>
            <Text textAlign="left" mb="3" paddingLeft="10px">
              Mit einem kostenfreien Vulcan-Account kannst du deine Vokabeln und
              Einstellungen jederzeit synchronisieren. So brauchst du dir keine
              Sorgen machen, dass deine wertvollen Daten verloren gehen.
            </Text>
          </>
        )}
        <Divider my="3" thickness="1" />
        <Heading textAlign="left" mb="2" size="lg" paddingLeft="10px">
          Benutzername
        </Heading>
        <Text textAlign="left" mb="3" paddingLeft="10px">
          Wir wollen wissen, wie du heißt
        </Text>
        <HStack>
          <Input
            flex={1}
            value={username}
            size="lg"
            onChangeText={(value) => setUsername(value)}
          />
          <Button
            bgColor="#ae4951"
            isDisabled={!username}
            onPress={() => {
              storeUsername(username).then(() =>
                makeToast("Benutzername erfolgreich gespeichert.")
              );
              props.setUsername(username);
            }}
          >
            {<Feather name="save" size={24} color="black" />}
          </Button>
        </HStack>
        <Divider my="3" thickness="1" />
        <Heading textAlign="left" mb="2" size="lg" paddingLeft="10px">
          Anzahl Vokabeln in einer Lernsession
        </Heading>
        {props.allVocs === undefined ||
        props.allVocs === null ||
        props.allVocs.length <= 0 ? (
          <Text textAlign="left" mb="3" paddingLeft="10px">
            Füge erst Wörter hinzu, um diese Funktion freizuschalten.
          </Text>
        ) : (
          <>
            <Text textAlign="left" mb="3" paddingLeft="10px">
              Wie viele Wörter sollen in einer Lernsession abgefragt werden?
            </Text>
            <HStack display="flex" alignItems="center" space="sm">
              <Input
                textAlign="center"
                keyboardType="number-pad"
                paddingLeft="5px"
                value={amountOfVocsPerUnit.toString()}
                onChangeText={(value: string) => {
                  let inputNumber;
                  if (!value || parseInt(value) < 0) {
                    inputNumber = 0;
                  } else if (parseInt(value) > props.allVocs?.length) {
                    inputNumber = props.allVocs?.length;
                  } else {
                    inputNumber = parseInt(value);
                  }
                  setAmountOfVocsPerUnit(inputNumber);
                }}
              />
              <Slider
                flex={1}
                value={amountOfVocsPerUnit}
                step={1}
                minValue={0}
                maxValue={props.allVocs.length}
                onChange={(value) => {
                  setAmountOfVocsPerUnit(value);
                }}
              >
                <Slider.Track bg="#d4b0b3">
                  <Slider.FilledTrack bg="#ae4951" />
                </Slider.Track>
                <Slider.Thumb bg="#ae4951" />
              </Slider>
              <Button
                bgColor="#ae4951"
                isDisabled={!amountOfVocsPerUnit}
                onPress={() => {
                  storeAmountOfVocsPerUnit(amountOfVocsPerUnit.toString()).then(
                    () => makeToast("Anzahl erfolgreich gespeichert.")
                  );
                  props.setAmountOfVocsPerUnit(amountOfVocsPerUnit);
                }}
              >
                {<Feather name="save" size={24} color="black" />}
              </Button>
            </HStack>
          </>
        )}
        <Divider my="3" thickness="1" />
        <Heading textAlign="left" mb="2" size="lg" paddingLeft="10px">
          Beleuchtungsmodus
        </Heading>
        <Text textAlign="left" mb="3" paddingLeft="10px">
          Wechsle zwischen Dark- und Light-Mode
        </Text>
        <HStack display="flex" alignItems="center">
          <HStack flex={1} space={2} alignItems="center" paddingLeft="20px">
            <Feather
              name="moon"
              size={24}
              color={colorMode === "light" ? "black" : "white"}
            />
            <Switch
              onThumbColor="#ae4951"
              onTrackColor="#d4b0b3"
              size="lg"
              isChecked={selectedColorMode === "light" ? true : false}
              onToggle={() => {
                setSelectedColorMode(
                  selectedColorMode === "light" ? "dark" : "light"
                );
              }}
            />
            <Feather
              name="sun"
              size={24}
              color={colorMode === "light" ? "black" : "white"}
            />
          </HStack>
          <Button
            bgColor="#ae4951"
            isDisabled={colorMode === selectedColorMode}
            onPress={() => {
              toggleColorMode();
              storeColorMode(!selectedColorMode ? "light" : selectedColorMode);
            }}
          >
            {<Feather name="save" size={24} color="black" />}
          </Button>
        </HStack>
        <Divider my="3" thickness="1" />
        <Text alignSelf="center">Version {Constants.manifest?.version}</Text>
      </ScrollView>
    </Stack>
  );
};
