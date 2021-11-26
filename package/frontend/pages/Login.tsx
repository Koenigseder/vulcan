import React, { useState } from "react";
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
} from "native-base";
import FontAwesome from "@expo/vector-icons/build/FontAwesome";
import Foundation from "@expo/vector-icons/build/Foundation";

export const Login = () => {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  return (
    <ScrollView>
      <Stack alignItems="center">
        <Heading
          size="xl"
          textAlign="center"
        >{`Melde dich bei Vulcan an!`}</Heading>
        <Image
          mt="20px"
          size={150}
          borderRadius={100}
          alt="Vulcan Icon"
          source={require("../../../assets/Vulcan.png")}
        />
        <Text mt="20px" fontSize="md" textAlign="center">
          Melde dich bei Vulcan an, um deine Daten zu sichern und zu
          synchronisieren!
        </Text>
        <HStack mt="20px" mb="20px">
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
            flex={0.8}
            placeholder="Passwort"
            value={passwordInput}
            size="lg"
            onChangeText={(value) => setPasswordInput(value)}
          />
        </HStack>
        <Button size="lg" bgColor="#ae4951">
          Anmelden
        </Button>
        <HStack alignItems="center">
          <Divider />
          <Text bold margin="3">
            ODER
          </Text>
          <Divider />
        </HStack>
        <Button size="lg" bgColor="#ae4951">
          Registrieren
        </Button>
        <Text mt="3" bold>
          Erstelle einen kostenlosen Vulcan-Account!
        </Text>
      </Stack>
    </ScrollView>
  );
};
