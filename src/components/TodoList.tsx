// src/components/TodoList.tsx
import React, { useState } from "react";

import { Item } from "../model"; // we need to import the type
import TodoItem from "./TodoItem";

export default function TodoList() {
  // note the <Item[]> syntax!
  const [list, setList] = useState<Item[]>([
    {
      id: 0,
      text: "Make this app",
      tags: ["react", "typescript"],
      isDone: false,
    },
    {
      id: 1,
      text: "Fall in love with TypeScript",
      tags: ["romantic", "typescript"],
      isDone: true,
    },
  ]);
  const toggle = (id: number) => {
    // TODO implement. Tip: use map
  };
  return (
    <div>
      <p>TODO: make the TODO app</p>
      {list.map((item, index) => {
        return (
          <TodoItem
            key={item.id}
            item={item}
            toggleDone={() => toggle(item.id)}
          />
        );
      })}
    </div>
  );
}
