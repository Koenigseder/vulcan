import { Box, Divider, HStack, IconButton, Stack, Text } from "native-base";
import { AntDesign, Octicons } from "@expo/vector-icons";
import React from "react";

interface VocCardProps {
  index: number;
  setEditKey: (i: number) => void;
  setModalVisible: (b: boolean) => void;
  foreign_word: string;
  known_word: string;
  repeated_without_mistake: number | null;
}

export const VocCard = (props: VocCardProps) => {
  return (
    <Box
      bg={{
        linearGradient: {
          colors: ["#be632c", "#ae4951", "#57233a"],
          start: [0, 0],
          end: [1, 1],
        },
      }}
      p="3"
      rounded="xl"
      marginBottom="10px"
    >
      <HStack display="flex" alignItems="center">
        <Box flex={1}>
          <Stack justifyContent="space-between">
            <HStack display="flex" alignItems="center">
              <Text fontSize="lg" bold color="white" marginRight="10px">
                {props.foreign_word}
              </Text>
              <Octicons
                name="primitive-dot"
                size={24}
                color={
                  !props.repeated_without_mistake
                    ? "red"
                    : props.repeated_without_mistake < 8
                    ? "orange"
                    : "green"
                }
              />
            </HStack>
            <Divider my="3" thickness="2" bgColor="white" />
            <Text fontSize="lg" color="white">
              {props.known_word}
            </Text>
          </Stack>
        </Box>
        <IconButton
          key="edit"
          variant="ghost"
          _icon={{ as: AntDesign, name: "edit", color: "white" }}
          onPress={() => {
            props.setEditKey(props.index);
            props.setModalVisible(true);
          }}
        />
      </HStack>
    </Box>
  );
};
