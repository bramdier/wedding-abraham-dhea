import { initializeApp } from "firebase/app";
import {
  getFirestore,
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDvYqu46AK9cZnVTwhzZtKH_aiSwNkOHqA",
  authDomain: "wedding-bram-dhea.firebaseapp.com",
  projectId: "wedding-bram-dhea",
  storageBucket: "wedding-bram-dhea.firebasestorage.app",
  messagingSenderId: "518630027183",
  appId: "1:518630027183:web:fa0c82dd68e0b6c99d895a",
  measurementId: "G-2JZBT77P4W"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function sendReservation(
  name: string,
  wish: string,
  presence: string,
  numOfPeople: string | null,
  waktuKehadiran: string | null
) {
  try {
    await addDoc(collection(db, "reservation"), {
      name: name,
      wish: wish,
      presence: presence,
      time: serverTimestamp(),
      numOfPeople: numOfPeople,
      waktuKehadiran: waktuKehadiran,
    });
  } catch (e) {
    alert(e);
  }
}

export { db, sendReservation };
