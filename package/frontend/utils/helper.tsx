import AsyncStorage from "@react-native-async-storage/async-storage";
import { Toast } from "native-base";
import { useState } from "react";
import { VocabularyInterface } from "../interfaces/VocabularyInterface";

// function that generates a Toast
export const makeToast = (message: string, success: boolean | null) => {
  Toast.show({
    title: message,
    backgroundColor: success === null ? null : success ? "#076300" : "#ff0000",
    duration: 1000,
    mb: "50px",
  });
};

// get username from savefile
export const getUsername = async () => {
  try {
    const value = await AsyncStorage.getItem("USERNAME");
    if (value !== null) {
      return value;
    }
  } catch (e) {
    makeToast("Da ist leider etwas schiefgelaufen...", false);
    console.log(e);
  }
};

// update username to savefile
export const storeUsername = async (value: string) => {
  try {
    await AsyncStorage.setItem("USERNAME", value);
    makeToast("Benutzername erfolgreich gespeichert!", true);
  } catch (e) {
    console.log(e);
    makeToast("Benutzername konnte nicht gespeichert werden.", false);
  }
};

// get amout of vocs per unit
export const getAmountVocsPerUnit = async () => {
  try {
    const value = await AsyncStorage.getItem("AMOUNT_OF_VOCS_PER_UNIT");
    if (value !== null) {
      return value;
    }
  } catch (e) {
    console.log(e);
    makeToast("Da ist leider etwas schiefgelaufen...", false);
  }
};

// update amount of vocs per unit to savefile
export const storeAmountOfVocsPerUnit = async (value: string) => {
  try {
    await AsyncStorage.setItem("AMOUNT_OF_VOCS_PER_UNIT", value);
    makeToast("Anzahl erfolgreich gespeichert!", true);
  } catch (e) {
    console.log(e);
    makeToast("Anzahl konnte nicht gespeichert werden.", false);
  }
};

// get colormode from savefile
export const getColorMode = async () => {
  try {
    const value = await AsyncStorage.getItem("COLORMODE");
    if (value !== null) {
      return value;
    }
  } catch (e) {
    console.log(e);
    makeToast("Da ist leider etwas schiefgelaufen...", false);
  }
};

// update colormode to savefile
export const storeColorMode = async (value: "dark" | "light" | undefined) => {
  try {
    await AsyncStorage.setItem(
      "COLORMODE",
      value === undefined ? "light" : value
    );
  } catch (e) {
    console.log(e);
    makeToast("Da ist leider etwas schiefgelaufen...", false);
  }
};

// get all vocs
export const getVocs = async () => {
  try {
    let value = await AsyncStorage.getItem("VOCABULARY");
    if (value !== null) {
      value = JSON.parse(value);
      return value;
    }
  } catch (e) {
    console.log(e);
    makeToast("Da ist leider etwas schiefgelaufen...", false);
  }
};

export const addVoc = async (voc: VocabularyInterface) => {
  try {
    const allVocs = await AsyncStorage.getItem("VOCABULARY");
    if (allVocs !== null) {
      let allVocsJSON: VocabularyInterface[] = JSON.parse(allVocs);
      allVocsJSON.push({
        ...voc,
        id: allVocsJSON[allVocsJSON.length - 1].id + 1,
      });
      await AsyncStorage.setItem("VOCABULARY", JSON.stringify(allVocsJSON));
      makeToast("Vokabel erfolgreich gespeichert!", true);
    } else {
      let newVoc: VocabularyInterface[] = [{ ...voc, id: 0 }];
      await AsyncStorage.setItem("VOCABULARY", JSON.stringify(newVoc));
      makeToast("Vokabel erfolgreich gespeichert!", true);
    }
  } catch (e) {
    console.log(e);
    makeToast("Da ist leider etwas schiefgelaufen...", false);
  }
};

// // add an item to list of vocs
// export const addVoc = async (voc: VocabularyInterface) => {
//   try {
//     await AsyncStorage.
//   }
// }

// removes an item from savefile
export const removeItem = async (key: string, message?: string) => {
  try {
    await AsyncStorage.removeItem(key);
    console.log(message);
    makeToast("Erfolgreich gelöscht!", true);
  } catch (e) {
    console.log("removeItem");
    makeToast("Etwas ist schiefgelaufen...", false);
  }
};
