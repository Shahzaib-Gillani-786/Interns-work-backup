import React from 'react';
import Child from './Child';
import { useState ,useEffect} from "react";

export default function LiftingUp() {
  const [user, setUser] = useState([
    "ashan",
    "ali",
    "mohsin",
    "musa",
    "shozi",
    "yousaf",
    "zaheer",
    "tariz",
    "zuni",
    "shabo",
    "arham",
    "Muzammil",
    "sheri"
  ]);
  function deleteItem(index){
  const newUser=user.filter((obj,id)=>{
      return id!=index
  });
  
  setUser(newUser);
  }
  let count=0;
  useEffect(()=>{
    count++;
 console.log(`count called ${count}`);
  },[user])
  return (
    <>
      {
            <Child data={user} del={deleteItem}/>
      }
      
    </>
  );
}







