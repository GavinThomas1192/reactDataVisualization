import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import DayInTheLife from "../src/components/DayInTheLife";
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">React Data Visualization</h1>
        </header>
        <p className="App-intro">Current Wind speed</p>
        <div className="polarChart">
          <DayInTheLife />
        </div>
      </div>
    );
  }
}

export default App;
