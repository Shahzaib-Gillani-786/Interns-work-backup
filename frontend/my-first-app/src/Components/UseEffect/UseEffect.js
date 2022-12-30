import React, { useEffect, useState } from "react";
import PrevPage from "./PrevPage";
import NextPage from "./NextPage";
import { check } from "prettier";

export default function UseEffect() {
  const [pages, setPages] = useState("This is Current Page");

  useEffect(() => {
    console.log("It will run for pages");
  }, [pages]);
  function check() {
    console.log("it will run on check");
  }

  return (
    <>
      <div className="container my-5">
        <div className="row">
          <div className="col-sm-3">
            <button className="btn btn-danger" onClick={() => setPages()}>
              Previous Page
            </button>
          </div>
          <div className="col-sm-3">
            <button className="btn btn-primary" onClick={() => setPages()}>
              Next Page
            </button>
          </div>
          <div className="col-sm-3">
            <button className="btn btn-primary" onClick={check}>
              Check
            </button>
          </div>
        </div>
      </div>
      <h1>{pages}</h1>
    </>
  );
}
