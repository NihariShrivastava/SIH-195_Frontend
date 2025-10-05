// src/models/userModel.js
import { db } from "../config/firebaseAdmin.js";

// Firestore collection reference
const usersCollection = db.collection("users");

// ---------------------- CREATE USER ----------------------
export const createUser = async ({ name, email, password, employeeId, role = "employee" }) => {
  try {
    // Ensure role is valid
    const validRoles = ["admin", "employee"];
    if (!validRoles.includes(role)) role = "employee";

    // Add user to Firestore
    const docRef = await usersCollection.add({
      name,
      email,
      password,
      employeeId,
      role,           // admin or employee
      createdAt: new Date(),
    });

    const userSnapshot = await docRef.get();
    return { id: docRef.id, ...userSnapshot.data() };
  } catch (err) {
    console.error("Error creating user:", err.message);
    throw new Error("Failed to create user");
  }
};

// ---------------------- GET USER BY EMAIL ----------------------
export const getUserByEmail = async (email) => {
  try {
    const snapshot = await usersCollection.where("email", "==", email).get();
    if (snapshot.empty) return null;

    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() };
  } catch (err) {
    console.error("Error fetching user by email:", err.message);
    throw new Error("Failed to fetch user");
  }
};

// ---------------------- GET ALL USERS ----------------------
export const getUsers = async () => {
  try {
    const snapshot = await usersCollection.get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (err) {
    console.error("Error fetching users:", err.message);
    throw new Error("Failed to fetch users");
  }
};

// ---------------------- GET ADMINS ----------------------
export const getAdmins = async () => {
  try {
    const snapshot = await usersCollection.where("role", "==", "admin").get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (err) {
    console.error("Error fetching admins:", err.message);
    throw new Error("Failed to fetch admins");
  }
};

// ---------------------- GET EMPLOYEES ----------------------
export const getEmployees = async () => {
  try {
    const snapshot = await usersCollection.where("role", "==", "employee").get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (err) {
    console.error("Error fetching employees:", err.message);
    throw new Error("Failed to fetch employees");
  }
};
