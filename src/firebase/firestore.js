import { 
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  where
} from "firebase/firestore";

import { db } from "./firebase";

// Add inventory item
export async function addItem(uid, itemData) {
  return await addDoc(collection(db, "users", uid, "inventory"), itemData);
}

// Update item
export async function updateItem(uid, itemId, newData) {
  return await updateDoc(doc(db, "users", uid, "inventory", itemId), newData);
}

// Delete item
export async function deleteItem(uid, itemId) {
  return await deleteDoc(doc(db, "users", uid, "inventory", itemId));
}

// Fetch inventory
export async function getInventory(uid) {
  const q = query(collection(db, "users", uid, "inventory"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// Add expense
export async function addExpense(uid, expenseData) {
  return await addDoc(collection(db, "users", uid, "expenses"), expenseData);
}

// Fetch expenses
export async function getExpenses(uid) {
  const q = query(collection(db, "users", uid, "expenses"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}
