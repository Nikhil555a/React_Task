
import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase/firebaseConfig";
import { signOut } from "firebase/auth";
import {
  collection,
  addDoc,
  onSnapshot,
  serverTimestamp,
  doc,
  updateDoc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
import ListCard from "./ListCard";
import { DragDropContext } from "@hello-pangea/dnd";

export default function Dashboard() {
  const user = auth.currentUser;
  const uid = user.uid;
  const [lists, setLists] = useState([]);
  const [newListName, setNewListName] = useState("");

  useEffect(() => {
    const q = collection(db, "users", uid, "lists");
    const unsub = onSnapshot(q, (snap) => {
      const arr = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setLists(arr);
    });
    return () => unsub();
  }, [uid]);

  const createList = async () => {
    if (!newListName.trim()) return;
    await addDoc(collection(db, "users", uid, "lists"), {
      name: newListName.trim(),
      createdAt: serverTimestamp(),
    });
    setNewListName("");
  };

  const handleSignOut = async () => {
    await signOut(auth);
    window.location.href = "/";
  };

  const onDragEnd = async (result) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;

    // Priority update
    if (destination.droppableId.startsWith("priority-")) {
      const [, listId, priority] = destination.droppableId.split("-");
      const taskRef = doc(
        db,
        "users",
        uid,
        "lists",
        source.droppableId,
        "tasks",
        draggableId
      );
      await updateDoc(taskRef, { priority });
      return;
    }

    // Move between lists
    if (source.droppableId !== destination.droppableId) {
      const sourceTaskRef = doc(
        db,
        "users",
        uid,
        "lists",
        source.droppableId,
        "tasks",
        draggableId
      );
      const snap = await getDoc(sourceTaskRef);
      if (!snap.exists()) return;
      const data = snap.data();
      await addDoc(
        collection(db, "users", uid, "lists", destination.droppableId, "tasks"),
        { ...data, movedAt: serverTimestamp() }
      );
      await deleteDoc(sourceTaskRef);
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold flex-1 mb-3 sm:mb-0 text-center sm:text-left">
          To-Do Lists
        </h1>
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2 w-full sm:w-auto">
          <input
            className="border px-3 py-2 rounded mb-2 sm:mb-0 w-full sm:w-auto"
            placeholder="New list name"
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
          />
          <button
            onClick={createList}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-2 sm:mb-0"
          >
            Add List
          </button>
          <button
            onClick={handleSignOut}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* Lists Grid */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {lists.map((list) => (
            <ListCard key={list.id} list={list} uid={uid} />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}





