import { auth, database } from "../../../firebase";

export const getUserData = () => {
    const docRef = database.collection("user_data").doc(auth.currentUser?.uid);

    docRef.get().then((doc) => {
    if (doc.exists) {
        console.log("Document data:", JSON.stringify(doc.data()));
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
}
        

export const save = () => {
    database.collection('users-data').doc('Ktm3fvSLNmTJiqvo7KYpb9eKirE2').set(
      {
        first: 'Ada',
        last: 'Lovelace',
        middle: 'test1',
        born: 1815
      })
      .then((docRef) => {
        console.log("Document written with ID: ", docRef);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      })
}
