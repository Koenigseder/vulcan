import { Box, Divider, HStack, IconButton, Stack, Text } from "native-base";
import { AntDesign } from "@expo/vector-icons";
import React from "react";

interface VocCardProps {
  foreign_word: string;
  known_word: string;
}

export const VocCard = (props: VocCardProps) => {
  return (
    <Box
      bg={{
        linearGradient: {
          colors: ["lightBlue.300", "violet.800"],
          start: [0, 0],
          end: [1, 0],
        },
      }}
      p="6"
      rounded="xl"
      marginBottom="10px"
    >
      <HStack display="flex" alignItems="center">
        <Box flex={1}>
          <Stack justifyContent="space-between">
            <Text fontSize="lg" bold>
              {props.foreign_word}
            </Text>
            <Divider my="3" thickness="2" />
            <Text fontSize="lg">{props.known_word}</Text>
          </Stack>
        </Box>
        <IconButton
          key="add"
          variant="ghost"
          _icon={{ as: AntDesign, name: "edit" }}
        />
      </HStack>
    </Box>
  );
};
