import { auth, database } from "../../../firebase";
import { UserDataInterface } from "../interfaces/UserDataInterface";
import { makeToast } from "./helper";

export const getUserDataFromFirestore = async () => {
  const docRef = database.collection("user_data").doc(auth.currentUser?.uid);

  let docData;

  await docRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        docData = doc.data();
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });

  return docData;
};

export const saveUserDataToFirestore = (userData: UserDataInterface) => {
  database
    .collection("user_data")
    .doc(auth.currentUser?.uid)
    .set(userData)
    .then(() => {
      makeToast("Daten erfolgreich synchronisiert.");
    })
    .catch((error) => {
      makeToast("Da ist leider etwas schiefgelaufen...");
      console.log(error);
    });
};
