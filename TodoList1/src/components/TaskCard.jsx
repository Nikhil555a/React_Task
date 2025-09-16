
import React from "react";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { format } from "date-fns";
import { Draggable } from "@hello-pangea/dnd";

export default function TaskCard({ task, index, listId, uid }) {
  const onDelete = async () => {
    await deleteDoc(doc(db, "users", uid, "lists", listId, "tasks", task.id));
  };

  const changePriority = async (p) => {
    await updateDoc(
      doc(db, "users", uid, "lists", listId, "tasks", task.id),
      { priority: p }
    );
  };

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          className={`p-3 rounded shadow bg-white border-l-4 transition-colors duration-200
            ${task.priority === "High"
              ? "border-red-500"
              : task.priority === "Medium"
              ? "border-yellow-500"
              : "border-green-500"}
          `}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 gap-2">
            <h4 className="font-semibold text-sm sm:text-base break-words">{task.title}</h4>
            <span
              className={`px-2 py-1 text-xs sm:text-sm rounded ${
                task.priority === "High"
                  ? "bg-red-100 text-red-700"
                  : task.priority === "Medium"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {task.priority || "Medium"}
            </span>
          </div>
          {task.description && (
            <p className="text-xs sm:text-sm text-gray-600 mb-1 break-words">{task.description}</p>
          )}
          <p className="text-xs sm:text-sm text-gray-500 mb-2">
            Due: {task.dueDate ? format(new Date(task.dueDate), "MMM d, yyyy") : "—"}
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => changePriority("High")}
              className="px-2 py-1 text-xs sm:text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition"
            >
              High
            </button>
            <button
              onClick={() => changePriority("Medium")}
              className="px-2 py-1 text-xs sm:text-sm bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200 transition"
            >
              Medium
            </button>
            <button
              onClick={() => changePriority("Low")}
              className="px-2 py-1 text-xs sm:text-sm bg-green-100 text-green-700 rounded hover:bg-green-200 transition"
            >
              Low
            </button>
            <button
              onClick={onDelete}
              className="px-2 py-1 text-xs sm:text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </Draggable>
  );
}





