import { auth, database } from "../../../firebase";
import { UserDataInterface } from "../interfaces/UserDataInterface";

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
      console.log("Document written");
    })
    .catch((error) => {
      console.error("Error saving document: ", error);
    });
};
