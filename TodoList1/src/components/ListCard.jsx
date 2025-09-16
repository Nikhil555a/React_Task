
import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import TaskCard from "./TaskCard";
import TaskForm from "./TaskForm";
import { Droppable } from "@hello-pangea/dnd";

export default function ListCard({ list, uid }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const tasksCol = collection(db, "users", uid, "lists", list.id, "tasks");
    const q = query(tasksCol, orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      const arr = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setTasks(arr);
    });
    return () => unsub();
  }, [list.id, uid]);

  return (
    <div className="bg-white rounded-xl shadow p-4 flex flex-col gap-4 w-full sm:w-[300px] md:w-[350px]">
      <h3 className="text-lg sm:text-xl font-semibold break-words">{list.name}</h3>

      {/* Tasks */}
      <Droppable droppableId={list.id} type="TASK">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="flex flex-col gap-3 min-h-[50px]"
          >
            {tasks.map((task, idx) => (
              <TaskCard
                key={task.id}
                task={task}
                index={idx}
                listId={list.id}
                uid={uid}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      {/* Add Task */}
      <TaskForm listId={list.id} uid={uid} />

      {/* Priority drop zones */}
      <div className="mt-3 space-y-2">
        <p className="text-sm sm:text-base text-gray-600">Change Task Priority</p>
        {["High", "Medium", "Low"].map((p) => (
          <Droppable
            key={p}
            droppableId={`priority-${list.id}-${p}`}
            type="TASK"
          >
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`p-3 rounded border text-sm sm:text-base break-words ${
                  p === "High"
                    ? "border-red-400 bg-red-50"
                    : p === "Medium"
                    ? "border-yellow-400 bg-yellow-50"
                    : "border-green-400 bg-green-50"
                }`}
              >
                {p}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </div>
  );
}





