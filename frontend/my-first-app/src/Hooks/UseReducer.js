import React, { useReducer } from "react";

const initialState=0;

const reducer=(state,action)=>{
    if(action.type==='increment'){
       return state+1;
    }
    if(action.type==='decrement'){
       return state-1;
    }
   
    if(action.type==='reset'){
        return state=0;     
    }

}
export default function UseReducer() {
    
   
    const [state,dispatch]=useReducer(reducer,initialState);
  return (
    <>
    <div className="container my-5">
    <h1>{state}</h1>
      <button className="btn btn-primary" onClick={()=>dispatch({type:'increment'})}>Increase</button>
      <button className="btn btn-primary" onClick={()=>dispatch({type:'decrement'})}>decrement</button>
      <button className="btn btn-danger" onClick={()=>dispatch({type:'reset'})}>Reset</button>
    </div>
    </>
  )
}
