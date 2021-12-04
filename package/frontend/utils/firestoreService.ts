import { auth, database } from "../../../firebase";
import { UserDataInterface } from "../interfaces/UserDataInterface";

export const getUserData = () => {
    const docRef = database.collection("user_data").doc(auth.currentUser?.uid);

    docRef.get()
    .then((doc) => {
      if(doc.exists) {
        return doc.data();
      }
      return null;
    })
    .catch((error) => {console.log("getUserData: " + error)});
}
        

export const saveUserData = (data: UserDataInterface) => {
    const docRef = database.collection("user_data").doc(auth.currentUser?.uid);

    docRef.set(data)
      .catch((error) => {
        console.log("saveUserData: " + error);
      })
}
