//class components

import './App.css'
import { Component } from 'react'
import ErrorCatcher from './ErrorCatching'

function App() {

  return (
    <>
    <ComponentWithError1 />
  <ErrorCatcher>
    <ComponentWithError />
  </ErrorCatcher>
  <ErrorCatcher>
  <ClassComponentRender />
  </ErrorCatcher>
  <ErrorCatcher>
    <ComponentWithError2 />
  </ErrorCatcher>
    </>
  )
}

//Checking Error Handeler
const ComponentWithError = () => {
  throw new Error('No')
  return<>
  <div>
  Hi am i error Free???
  </div>
  </>
}
const ComponentWithError1 = () => {

  return<>
  <div>
  Hi am i error Free1???
  </div>
  </>
}
const ComponentWithError2 = () => {
  
  throw new Error('No')
  return<>
  <div>
  Hi am i error Free2???
  </div>
  </>
}




class ClassComponentRender extends Component {
  state = { count: 0 };

  handleClick = () => {
    try {
      this.setState({ count: this.state.count + 1 });
      throw new Error("Simulated error in handleClick");
    } catch (error) {
      console.error("Caught error:", error);
    }
  };

  render() {
    return (
      <>
        <div>{this.state.count}</div>
        <button onClick={this.handleClick}>Increase</button>
      </>
    );
  }
}

export default App
