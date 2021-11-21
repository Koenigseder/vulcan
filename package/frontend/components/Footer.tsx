import { Center, HStack, Icon, Pressable, Text } from "native-base";
import { Ionicons, Feather, FontAwesome5 } from "@expo/vector-icons";
import React from "react";

interface FooterProps {
  selectedElement: number;
  setSelectedElement: (n: number) => void;
  isAllVocsLoading: boolean;
}

export const Footer = (props: FooterProps) => {
  return (
    props.selectedElement !== 4 &&
    !props.isAllVocsLoading && (
      <HStack bg="#ae4951" alignItems="center" shadow={6}>
        {props.selectedElement !== 3 ? (
          <>
            <Pressable
              opacity={props.selectedElement === 0 ? 1 : 0.5}
              py="3"
              flex={1}
              onPress={() => props.setSelectedElement(0)}
            >
              <Center>
                <Icon
                  mb="1"
                  as={
                    <Feather
                      name={props.selectedElement === 0 ? "book-open" : "book"}
                    />
                  }
                  color="white"
                  size="sm"
                />
                <Text color="white" fontSize="12">
                  Vokabeln
                </Text>
              </Center>
            </Pressable>
            <Pressable
              opacity={props.selectedElement === 1 ? 1 : 0.5}
              py="2"
              flex={1}
              onPress={() => props.setSelectedElement(1)}
            >
              <Center>
                <Icon
                  mb="1"
                  as={
                    <Ionicons
                      name={
                        props.selectedElement === 1
                          ? "md-home"
                          : "md-home-outline"
                      }
                    />
                  }
                  color="white"
                  size="sm"
                />
                <Text color="white" fontSize="12">
                  Home
                </Text>
              </Center>
            </Pressable>
            <Pressable
              opacity={props.selectedElement === 2 ? 1 : 0.6}
              py="2"
              flex={1}
              onPress={() => props.setSelectedElement(2)}
            >
              <Center>
                <Icon
                  mb={1}
                  as={
                    <Ionicons
                      name={
                        props.selectedElement === 2
                          ? "settings"
                          : "settings-outline"
                      }
                    />
                  }
                  color="white"
                  size="sm"
                />
                <Text color="white" fontSize={12}>
                  Einstellungen
                </Text>
              </Center>
            </Pressable>
          </>
        ) : (
          <Pressable
            opacity={props.selectedElement === 3 ? 1 : 0.6}
            py="2"
            flex={1}
            onPress={() => props.setSelectedElement(1)}
          >
            <Center>
              <Icon
                mb={1}
                as={<FontAwesome5 name={"running"} />}
                color="white"
                size="sm"
              />
              <Text color="white" fontSize={12}>
                Verlassen
              </Text>
            </Center>
          </Pressable>
        )}
      </HStack>
    )
  );
};
