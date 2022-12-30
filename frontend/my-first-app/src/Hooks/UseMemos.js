import React, { useState } from 'react'

export default function UseMemos() {
  const[number,setnumber]=useState(0);
  function handleChange(e){
    setnumber(e.target.value)
  };
  
return (
<>
<input type='number' value={number} onChange={handleChange}></input>
< div> assdsd {setnumber}</div>
</>
)
}
