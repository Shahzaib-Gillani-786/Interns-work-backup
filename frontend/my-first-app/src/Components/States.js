import { Button } from 'bootstrap';
import React, { Component } from 'react'

export default class States extends Component {
constructor(){
    super();
    this.state={ 
name:'ashan',
email:'ashaniqbal52932@gmail.com',
count:0
    }
}
updateName(){
    this.setState({
        name:'Ali',
        email:'ali220@gmail.com',
        count:this.state.count+1
    })
}
  render() {
    console.log('render called');
    return (
      <div>
      
        <h1>Hi Mr. {this.state.name}</h1>
        <h2>Your email address is {this.state.email}</h2>
        <h3>Your Count  is {this.state.count}</h3>
        <button onClick={()=>this.updateName()}>Click me</button>
      </div>
    )
  }
}
