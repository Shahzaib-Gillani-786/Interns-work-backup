import React, { useLayoutEffect, useState } from "react";
export default function UseLayoutEffect() {
  const [count, setCount] = useState(0);
  const [show, setShow] = useState();
  useLayoutEffect(() => {
  }, [count]);


  function showData(){

    setShow("<h1>This is seperate Fucation without Use layout Effects</h1>")
  }
  return (
    <div>
      <h1>The count is {count} </h1>
      <button className="btn btn-primary" onClick={() => setCount(count + 1)}>Click Me</button>
      <button className="btn btn-primary" onClick={show}>Click Me</button>
    </div>
  );
}
