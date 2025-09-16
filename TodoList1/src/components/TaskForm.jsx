
import React, { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export default function TaskForm({ listId, uid }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [due, setDue] = useState("");
  const [priority, setPriority] = useState("Medium");

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    const tasksCol = collection(db, "users", uid, "lists", listId, "tasks");
    await addDoc(tasksCol, {
      title: title.trim(),
      description: desc,
      dueDate: due || null,
      priority,
      createdAt: serverTimestamp(),
    });
    setTitle("");
    setDesc("");
    setDue("");
    setPriority("Medium");
  };

  return (
    <form onSubmit={handleAdd} className="space-y-3">
      <input
        className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
        placeholder="Description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        rows={3}
      />
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="date"
          className="border px-3 py-2 rounded flex-1 focus:outline-none focus:ring-2 focus:ring-green-500"
          value={due}
          onChange={(e) => setDue(e.target.value)}
        />
        <select
          className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full sm:w-auto bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
      >
        Add Task
      </button>
    </form>
  );
}






