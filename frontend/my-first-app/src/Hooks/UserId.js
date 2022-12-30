import { useId } from "react";
import React from "react";

export default function UserId() {
  return (
    <>
     <label>First Name</label>
      <div>
        <input id={useId()+ '-firstName'} type="text" />
      </div>
      <label>Last Name</label>
      <div>
        <input id={useId() + '-lastName'} type="text" />
      </div>
     
    </>
  );
}
