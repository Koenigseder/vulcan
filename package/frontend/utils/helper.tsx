import AsyncStorage from "@react-native-async-storage/async-storage";
import { Toast } from "native-base";

export const makeToast = (message: string, success?: string) => {
  Toast.show({
    title: message,
    // status: success === "true" ? "success" : success === "false" ? "error" : "",
    mb: "50px",
  });
};

export const getUsername = async () => {
  try {
    const value = await AsyncStorage.getItem("USERNAME");
    if (value !== null) {
      return value;
    }
  } catch (e) {
    makeToast("Da ist leider etwas schiefgelaufen...", "error");
    console.log(e);
  }
};

export const storeUsername = async (value: string) => {
  try {
    await AsyncStorage.setItem("USERNAME", value);
    makeToast("Benutzername erfogreich gespeichert!", "false");
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const removeItem = async (key: string, message?: string) => {
  try {
    await AsyncStorage.removeItem(key);
    console.log(message);
  } catch (e) {
    console.log("removeItem");
  }
};
