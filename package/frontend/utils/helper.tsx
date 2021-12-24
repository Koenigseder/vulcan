import AsyncStorage from "@react-native-async-storage/async-storage";
import { Toast } from "native-base";
import { VocabularyInterface } from "../interfaces/VocabularyInterface";

export let lastEditTime = 0;

// function that generates a Toast
export const makeToast = (message: string) => {
  Toast.show({
    title: message,
    duration: 1500,
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
    return null;
  } catch (e) {
    console.log(e);
    makeToast("Da ist leider etwas schiefgelaufen...");
  }
};

// update username to savefile
export const storeUsername = async (value: string) => {
  try {
    await AsyncStorage.setItem("USERNAME", value);
    storeLastEditTime(false);
  } catch (e) {
    console.log(e);
    makeToast("Benutzername konnte nicht gespeichert werden.");
  }
};

// get amout of vocs per unit
export const getAmountVocsPerUnit = async () => {
  try {
    const value = await AsyncStorage.getItem("AMOUNT_OF_VOCS_PER_UNIT");
    if (value !== null) {
      return value;
    }
    return null;
  } catch (e) {
    console.log(e);
    makeToast("Da ist leider etwas schiefgelaufen...");
  }
};

// update amount of vocs per unit to savefile
export const storeAmountOfVocsPerUnit = async (value: string) => {
  try {
    await AsyncStorage.setItem("AMOUNT_OF_VOCS_PER_UNIT", value);
    storeLastEditTime(false);
  } catch (e) {
    console.log(e);
    makeToast("Anzahl konnte nicht gespeichert werden.");
  }
};

// get colormode from savefile
export const getColorMode = async () => {
  try {
    const value = await AsyncStorage.getItem("COLORMODE");
    if (value !== null) {
      return value;
    }
    return false;
  } catch (e) {
    console.log(e);
    makeToast("Da ist leider etwas schiefgelaufen...");
  }
};

// update colormode to savefile
export const storeColorMode = async (value: "dark" | "light" | undefined) => {
  try {
    await AsyncStorage.setItem(
      "COLORMODE",
      value === undefined ? "light" : value
    );
    storeLastEditTime(false);
  } catch (e) {
    console.log(e);
    makeToast("Da ist leider etwas schiefgelaufen...");
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
    return null;
  } catch (e) {
    console.log(e);
    makeToast("Da ist leider etwas schiefgelaufen...");
  }
};

export const storeAllVocs = async (vocs: VocabularyInterface[]) => {
  try {
    await AsyncStorage.setItem("VOCABULARY", JSON.stringify(vocs));
    storeLastEditTime(false);
  } catch (e) {
    console.log(e);
  }
};

// add voc to existing vocs
export const createVoc = async (voc: VocabularyInterface) => {
  try {
    const allVocs = await AsyncStorage.getItem("VOCABULARY");
    if (allVocs !== null) {
      let allVocsJSON: VocabularyInterface[] = JSON.parse(allVocs);
      if (allVocsJSON.length > 0) {
        allVocsJSON.push({
          ...voc,
          id: allVocsJSON[allVocsJSON.length - 1].id + 1,
          repeated_without_mistake: null,
        });
        await AsyncStorage.setItem("VOCABULARY", JSON.stringify(allVocsJSON));
        makeToast("Vokabel erfolgreich gespeichert!");
      } else {
        let newVoc: VocabularyInterface[] = [
          { ...voc, id: 0, repeated_without_mistake: null },
        ];
        await AsyncStorage.setItem("VOCABULARY", JSON.stringify(newVoc));
        makeToast("Vokabel erfolgreich gespeichert!");
      }
    } else {
      let newVoc: VocabularyInterface[] = [
        { ...voc, id: 0, repeated_without_mistake: null },
      ];
      await AsyncStorage.setItem("VOCABULARY", JSON.stringify(newVoc));
      makeToast("Vokabel erfolgreich gespeichert!");
    }
    storeLastEditTime(false);
  } catch (e) {
    console.log(e);
    makeToast("Da ist leider etwas schiefgelaufen...");
  }
};

// edit a voc
export const editVoc = async (voc: VocabularyInterface, index: number) => {
  try {
    const allVocs = await AsyncStorage.getItem("VOCABULARY");
    if (allVocs !== null) {
      let allVocsJSON: VocabularyInterface[] = JSON.parse(allVocs);
      allVocsJSON[index] = {
        ...allVocsJSON[index],
        foreign_word: voc.foreign_word,
        known_word: voc.known_word,
      };
      await AsyncStorage.setItem("VOCABULARY", JSON.stringify(allVocsJSON));
      makeToast("Vokabel erfolgreich gespeichert!");
    }
    storeLastEditTime(false);
  } catch (e) {
    console.log(e);
    makeToast("Da ist leider etwas schiefgelaufen...");
  }
};

// remove a voc
export const deleteVoc = async (index: number) => {
  try {
    const allVocs = await AsyncStorage.getItem("VOCABULARY");
    if (allVocs !== null) {
      const allVocsJSON: VocabularyInterface[] = JSON.parse(allVocs);
      allVocsJSON.splice(index, 1);
      await AsyncStorage.setItem("VOCABULARY", JSON.stringify(allVocsJSON));
      makeToast("Vokabel erfolgreich gelöscht!");
    }
    storeLastEditTime(false);
  } catch (e) {
    console.log(e);
    makeToast("Da ist leider etwas schiefgelaufen...");
  }
};

export const editRepeatCountVoc = async (
  repeatCount: number,
  index: number
) => {
  try {
    const allVocs = await AsyncStorage.getItem("VOCABULARY");
    if (allVocs !== null) {
      let allVocsJSON: VocabularyInterface[] = JSON.parse(allVocs);
      allVocsJSON[index] = {
        ...allVocsJSON[index],
        repeated_without_mistake: repeatCount,
      };
      await AsyncStorage.setItem("VOCABULARY", JSON.stringify(allVocsJSON));
    }
    storeLastEditTime(false);
  } catch (e) {
    console.log(e);
    makeToast("Da ist leider etwas schiefgelaufen...");
  }
};

export const getLastEditTime = async () => {
  try {
    const value = await AsyncStorage.getItem("LAST_EDIT_TIME");
    if (value !== null) {
      lastEditTime = parseInt(value);
    }
  } catch (e) {
    console.log(e);
  }
};

export const storeLastEditTime = async (
  fromFirestore: boolean,
  time?: number
) => {
  try {
    const timestamp = fromFirestore ? time : new Date().getTime();
    await AsyncStorage.setItem("LAST_EDIT_TIME", timestamp.toString());
    lastEditTime = timestamp;
  } catch (e) {
    console.log(e);
  }
};

// removes an item from savefile
export const removeItem = async (key: string, message?: string) => {
  try {
    await AsyncStorage.removeItem(key);
    makeToast(message || "Erfolgreich gelöscht!");
    storeLastEditTime(false);
  } catch (e) {
    console.log("removeItem");
    makeToast("Etwas ist schiefgelaufen...");
  }
};
