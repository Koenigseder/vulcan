import React, { useEffect, useState } from "react";
import { Entypo } from "@expo/vector-icons";
import {
  Heading,
  Stack,
  Text,
  Image,
  HStack,
  Input,
  ScrollView,
  Divider,
  Button,
  Alert,
  Collapse,
  Icon,
} from "native-base";
import { auth } from "../../../firebase";

interface LoginProps {
  setSelectedElement: (n: number) => void;
  setIsUserLoggedIn: (b: boolean) => void;
}

export const Login = (props: LoginProps) => {
  const { setSelectedElement, setIsUserLoggedIn } = props;

  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [returnPasswordInput, setReturnPasswordInput] = useState("");
  const [isOnLogin, setIsOnLogin] = useState(true);

  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user: any) => {
      if (user?.email) {
        setSelectedElement(2);
      }
    });

    return unsubscribe;
  }, []);

  const handleSignUp = () => {
    const pattern = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+$"
    );
    if (passwordInput !== returnPasswordInput) {
      setErrorMessage("Das Passwort wurde nicht korrekt wiederholt.");
      setShowError(true);
      return;
    }
    if (passwordInput.length < 8 || !pattern.test(passwordInput)) {
      setErrorMessage(
        `Das Passwort ist zu schwach.\n- Mindestens 8 Zeichen\n- Groß- und Kleinbuchstaben\n- Mindestens eine Nummer\n- Mindestens ein Sonderzeichen`
      );
      setShowError(true);
      return;
    }
    auth
      .createUserWithEmailAndPassword(emailInput, passwordInput)
      .then(() => {
        setIsUserLoggedIn(true);
      })
      .catch((error: any) => {
        if (error.code === "auth/invalid-email") {
          setErrorMessage(`"${emailInput}" ist keine gültige E-Mail-Adresse.`);
        } else if (error.code === "auth/email-already-in-use") {
          setErrorMessage(`Diese E-Mail-Adresse ist bereits vergeben.`);
        } else if (error.code === "auth/weak-password") {
          setErrorMessage(`Das Passwort ist zu schwach.`);
        } else if (error.code === "auth/network-request-failed") {
          setErrorMessage(`Keine Internetverbindung.`);
        } else {
          setErrorMessage(error.code);
        }
        setShowError(true);
      });
  };

  const handleSignIn = () => {
    auth
      .signInWithEmailAndPassword(emailInput, passwordInput)
      .then(() => {
        setIsUserLoggedIn(true);
      })
      .catch((error: any) => {
        if (error.code === "auth/user-not-found") {
          setErrorMessage(`"${emailInput}" ist nicht vorhanden.`);
        } else if (error.code === "auth/wrong-password") {
          setErrorMessage(`Das eingegebene Passwort ist falsch.`);
        } else if (error.code === "auth/invalid-email") {
          setErrorMessage(`"${emailInput}" ist keine gültige E-Mail-Adresse.`);
        } else if (error.code === "auth/network-request-failed") {
          setErrorMessage(`Keine Internetverbindung.`);
        } else {
          setErrorMessage(error.code);
        }
        setShowError(true);
      });
  };

  return (
    <ScrollView>
      <Stack alignItems="center">
        <Heading size="xl" textAlign="center">
          {isOnLogin
            ? "Melde dich bei Vulcan an!"
            : "Registriere dich bei Vulcan!"}
        </Heading>
        <Image
          mt="20px"
          size={150}
          borderRadius={100}
          alt="Vulcan Icon"
          source={require("../../../assets/Vulcan.png")}
        />
        <Text mt="20px" fontSize="md" textAlign="center">
          {`${isOnLogin ? "Melde" : "Registriere"} dich bei Vulcan${
            isOnLogin ? " an" : ""
          }, um deine Daten zu sichern und zu synchronisieren!`}
        </Text>
        <HStack mt="20px" mb="3">
          <Input
            flex={0.8}
            placeholder="E-Mail-Adresse"
            value={emailInput}
            size="lg"
            onChangeText={(value) => setEmailInput(value)}
          />
        </HStack>
        <HStack mb="3">
          <Input
            InputRightElement={
              <Icon
                mr="2"
                size="5"
                color="gray.500"
                as={
                  <Entypo
                    name={isPasswordVisible ? "eye-with-line" : "eye"}
                    onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                  />
                }
              />
            }
            flex={0.8}
            placeholder="Passwort"
            secureTextEntry={!isPasswordVisible}
            value={passwordInput}
            size="lg"
            onChangeText={(value) => setPasswordInput(value)}
          />
        </HStack>
        {!isOnLogin && (
          <HStack mb="3">
            <Input
              flex={0.8}
              placeholder="Wiederhole das Passwort"
              secureTextEntry
              value={returnPasswordInput}
              size="lg"
              onChangeText={(value) => setReturnPasswordInput(value)}
            />
          </HStack>
        )}
        <Collapse isOpen={showError}>
          {showError && (
            <Alert status="error">
              <HStack alignItems="center">
                <Alert.Icon />
                <Text ml="1">{errorMessage}</Text>
              </HStack>
            </Alert>
          )}
        </Collapse>
        <Button
          mt="3"
          size="lg"
          bgColor="#ae4951"
          isDisabled={
            emailInput.trim() === "" ||
            passwordInput.trim() === "" ||
            (!isOnLogin && returnPasswordInput === "")
          }
          onPress={isOnLogin ? handleSignIn : handleSignUp}
        >
          {isOnLogin ? "Anmelden" : "Jetzt registrieren!"}
        </Button>
        <HStack alignItems="center">
          <Divider />
          <Text bold margin="3">
            ODER
          </Text>
          <Divider />
        </HStack>
        <Button
          size="lg"
          bgColor="#ae4951"
          onPress={() => {
            setIsOnLogin(!isOnLogin);
            setEmailInput("");
            setPasswordInput("");
            setReturnPasswordInput("");
          }}
        >
          {isOnLogin ? "Registrieren" : "Anmelden"}
        </Button>
        <Text mt="3" bold>
          {isOnLogin
            ? "Erstelle einen kostenlosen Vulcan-Account!"
            : "Melde dich mit einem bestehenden Vulcan-Account an!"}
        </Text>
      </Stack>
    </ScrollView>
  );
};
