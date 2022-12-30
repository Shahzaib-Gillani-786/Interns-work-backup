import React from "react";
import { useState } from "react";


export default function Child({ data, id, del }) {
  return (
    <>
      {data.map((value, index) => {
        return (
          <div className="container" key={index}>
            {/* <div className="card">
             <div className="card-body"> */}
                <div className="row ">
                  <div className="col-xs-6 col-sm-4">
                    <h1>{value}</h1>
                  </div>
                  <div className="col-xs-6 col-sm-8">
                    <button
                      className="btn btn-primary"
                      onClick={() => del(index)}
                    >
                      Delete
                    </button>
                  </div>
                {/* </div>
                </div> */}
            </div>
          </div>
        );
      })}
    </>
  );
}
