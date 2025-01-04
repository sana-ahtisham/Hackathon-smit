import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getFirestore, addDoc, collection } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

// Firebase Configuration
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyA-W4WusEgBqhP_GmcdVg12QiP9zA4CmXk",
    authDomain: "emailauthapp-c5560.firebaseapp.com",
    projectId: "emailauthapp-c5560",
    storageBucket: "emailauthapp-c5560.firebasestorage.app",
    messagingSenderId: "217092144094",
    appId: "1:217092144094:web:53b806ec25cfe511e07b4f"
  };
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.getElementById("contactForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  try {
    await addDoc(collection(db, "contacts"), {
      name,
      email,
      message,
      timestamp: new Date(),
    });

    alert("Message sent successfully!");
    e.target.reset();
  } catch (error) {
    console.error("Error adding document: ", error);
    alert("Failed to send message. Please try again.");
  }
});