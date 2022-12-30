import React, { useState, useDeferredValue } from "react";

export default function UseDeferredValue() {
  const [input, setInput] = useState("");
  const [list, setList] = useState([]);
  const defferedvalue = useDeferredValue(input);

  const count = 200;

  function handleChange(e) {
    setInput(e.target.value);
    const arr = [];
    for (var i = 0; i < count; i++) {
      arr.push(e.target.value);
    }
    console.log(arr);
    setList(arr);
  }
  return (
    <>
      <input type="text" value={defferedvalue} onChange={handleChange}></input>
      {list.map((item, index) => {
        return <div key={index}>{item}</div>;
      })}
    </>
  );
}
