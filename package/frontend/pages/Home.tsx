import {
  Button,
  Divider,
  Heading,
  Icon,
  ScrollView,
  Stack,
  Text,
} from "native-base";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { makeToast } from "../utils/helper";

interface HomeProps {
  username: string;
}

export const Home = (props: HomeProps) => {
  return (
    <>
      <Stack>
        <Heading textAlign="center" mb="10" size="xl">
          Home
        </Heading>
        <ScrollView>
          <Heading textAlign="center" mb="2" size="md">
            {`Hallo ${props.username}, schön dich wiederzusehen!`}
          </Heading>
          <Divider my="3" thickness="1" />
          <Heading textAlign="left" mb="2" size="md" paddingLeft="10px">
            Hier sind deine Statistiken:
          </Heading>
          <Text paddingLeft="10px">
            Hier sieht es aktuell noch sehr leer aus...
          </Text>
        </ScrollView>
      </Stack>
      <Button
        bgColor="#ae4951"
        leftIcon={<Icon as={Ionicons} name="school" size="sm" />}
        style={{ position: "absolute", bottom: 20, alignSelf: "center" }}
        onPress={() => makeToast("Leider noch nicht verfügbar...", null)}
      >
        Jetzt lernen!
      </Button>
    </>
  );
};
