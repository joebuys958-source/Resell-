// YOUR FIREBASE CONFIG HERE
const firebaseConfig = {
  apiKey: "YOUR_KEY",
  authDomain: "YOUR_DOMAIN",
  projectId: "YOUR_PROJECT",
  storageBucket: "YOUR_BUCKET",
  messagingSenderId: "YOUR_SENDER",
  appId: "YOUR_APP_ID"
};

import { initializeApp } from 
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

import { 
  getFirestore, collection, addDoc,
  onSnapshot, deleteDoc, doc 
} from 
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const itemName = document.getElementById("item-name");
const itemStock = document.getElementById("item-stock");
const inventoryList = document.getElementById("inventory-list");

async function addItem() {
  if (!itemName.value || !itemStock.value) return;

  await addDoc(collection(db, "inventory"), {
    name: itemName.value,
    stock: Number(itemStock.value)
  });

  itemName.value = "";
  itemStock.value = "";
}

onSnapshot(collection(db, "inventory"), (snapshot) => {
  inventoryList.innerHTML = "";
  snapshot.forEach(docSnap => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${docSnap.data().name} (Stock: ${docSnap.data().stock})
      <button onclick="deleteItem('${docSnap.id}')">Delete</button>
    `;
    inventoryList.appendChild(li);
  });
});

async function deleteItem(id) {
  await deleteDoc(doc(db, "inventory", id));
}
