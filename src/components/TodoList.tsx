// src/components/TodoList.tsx
import React, { useState } from "react";
import TodoItem from "./TodoItem";
import { Item } from "../model";

export default function TodoList() {
  const [onlyRemaining, setOnlyRemaining] = useState(false);
  const [requiredTags, setRequiredTags] = useState<string[]>([]);
  const [list, setList] = useState<Item[]>([
    {
      title: "Make this app",
      isDone: true,
      tags: ["making", "stuff"],
    },
    {
      title: "Fall in love with TypeScript",
      isDone: false,
      tags: ["romantic", "microsoft", "making", "ragequit"],
    },
    {
      title: "Ditch TypeScript because it's too much work",
      isDone: false,
      tags: ["ragequit", "stuff"],
    },
  ]);

  const toggleTodoItemWithId = (title: string) => {
    // this is where the state lifting gets hard
    // this is the scoreboard app

    const newList = list.map((item) => {
      // decide whether this item's score needs to be incremented
      if (item.title === title) {
        // and if so, create a new item object,
        return {
          // but first copying over the item object's data
          ...item,
          // and then overriding the score property to be incremented
          isDone: !item.isDone,
        };
      } else {
        // else, just keep them
        return item;
      }
    });

    setList(newList);
  };

  const tags = Array.from(new Set(list.map((item) => item.tags).flat()));

  const toggleTagFilter = (tag: string) => {
    // check if its there, if it is, remove, if not add.
    const isThere = requiredTags.includes(tag);

    if (isThere) {
      const newTags = requiredTags.filter((tagName) => tagName !== tag);
      setRequiredTags(newTags);
    } else {
      setRequiredTags([...requiredTags, tag]);
    }
  };
  console.log(requiredTags);

  const filteredList =
    requiredTags.length === 0
      ? list
      : list.filter((item) =>
          item.tags.some((tag) => requiredTags.includes(tag))
        );
  // check the item tags
  //item.tags => []
  // filteredTags => []

  // ^^^ state management
  // --------------------
  // ___ view

  return (
    <div>
      <div>
        {tags.map((tag) => (
          <button
            style={{
              margin: 5,
              backgroundColor: requiredTags.includes(tag) ? "red" : "",
            }}
            onClick={() => toggleTagFilter(tag)}
            key={tag}
          >
            {tag}
          </button>
        ))}
      </div>
      <span>Active filters: {requiredTags.join(" -- ")}</span>
      <ul>
        {filteredList.map((item) => (
          <TodoItem
            item={item}
            onToggle={() => {
              toggleTodoItemWithId(item.title);
            }}
          />
        ))}
      </ul>
    </div>
  );
}
