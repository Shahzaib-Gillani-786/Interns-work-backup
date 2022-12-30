import React, { useEffect } from 'react'

export default function NextPage() {
    useEffect(()=>{
        alert('Welcome to Next Page');
        return()=>{
            alert('Leave from Next Page'); 
        }
            });
  return (
    <>   
       <h2>This is Next page</h2>
    </>

  )
}
