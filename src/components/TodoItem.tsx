// src/components/TodoItem.tsx
import React from "react";
import { Item } from "../model";

type Props = {
  item: Item;
  onToggle: () => void;
};

export default function TodoItem({ item, onToggle }: Props) {
  return (
    <div
      onClick={() => {
        // we want to make item.isDone reversed
        console.log("yes this is clicked");
        // setIsDone(!isDone); // !!
        onToggle();
      }}
    >
      [{item.isDone ? "x" : " "}] <strong>{item.title}</strong>{" "}
      <span style={{ marginLeft: "10px" }}>
        (
        {item.tags.map((tag, i) => {
          const isLastTag = item.tags.length - 1 === i;
          return (
            <span key={tag}>
              <span style={{ margin: 3, textDecoration: "underline" }}>
                {tag}
              </span>
              {isLastTag ? null : ", "}
            </span>
          );
        })}
        )
      </span>
    </div>
  );
}
