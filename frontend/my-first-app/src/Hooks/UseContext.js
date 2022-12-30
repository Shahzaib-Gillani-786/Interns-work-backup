import React, { useContext, useState } from "react";
import UseEffect from "./UseEffect/UseEffect";


export default function UseContext() {
    const value=useContext()
    let person={
     name:'ahsan',
     adddress:'Sangla Hill'
    }
  return (
    <>
        <h3>This is {person.name} with addrrss is {person.adddress}</h3>
    </>
  )
}
