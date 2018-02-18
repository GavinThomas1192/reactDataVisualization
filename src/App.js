import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import DayInTheLife from "../src/components/DayInTheLife";
import DateAndTimePickers from "../src/components/DatePicker";
import FloatingActionButtonZoom from "../src/components/InfoDisplay";
import Grid from "material-ui/Grid";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">React Data Visualization</h1>
        </header>
        <div className="polarChartContainer">
          <p className="App-intro">Current Wind speed</p>
          <Grid container spacing={24}>
            <Grid item xs>
              <p>Settings</p>
              <DateAndTimePickers />
            </Grid>
            <Grid item xs={6}>
              <DayInTheLife />
            </Grid>
            <Grid item xs>
              <p>Info</p>
              {/* <FloatingActionButtonZoom /> */}
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default App;
