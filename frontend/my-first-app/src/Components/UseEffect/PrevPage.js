import React, { useEffect } from "react";

export default function PrevPage() {
  useEffect(() => {
    alert("Welcome to Previous Page");
    return () => {
      alert("Leave from Previous Page");
    };
  });
  return (
    <>
      <h1>This is Previous Page</h1>
    </>
  );
}
