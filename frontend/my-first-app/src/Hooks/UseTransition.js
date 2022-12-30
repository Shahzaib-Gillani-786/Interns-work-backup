import React, { useState, useTransition, startTransition } from "react";

export default function UseTransition() {
  const [input, setInput] = useState("");
  const [list, setList] = useState([]);
  const [isPending, startTransition] = useTransition();

  const count = 20000;

  function handleChange(e) {
    setInput(e.target.value);
    startTransition(() => {
      const arr = [];
      for (var i = 0; i < count; i++) {
        arr.push(e.target.value);
      }
      console.log(arr);
      setList(arr);
    });
  }
  return (
    <>
      <input type="text" value={input} onChange={handleChange}></input>
      {isPending
        ? "loading"
        : list.map((item, index) => {
            return <div key={index}>{item}</div>;
          })}
    </>
  );

  
}
