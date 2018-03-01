import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import DayInTheLife from "../src/components/DayInTheLife";
import InfoDisplay from "../src/components/InfoDisplay";
import Map from "../src/components/TestMap";
import axios from "axios";
import LocationPicker from "../src/components/LocationPicker";
import RadarChart from "../src/components/RadarChart";
import Grid from "material-ui/Grid";
import { connect } from "react-redux";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weatherData: "",
      weatherLocation: "",
      start: false
    };
  }
  componentDidUpdate() {
    console.log("App Updated", this.state, "PROPS", this.props);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">React Data Visualization</h1>
        </header>
        <div className="polarChartContainer">
          {this.props.location.name !== undefined ? (
            <p className="App-intro">
              Current weather for {this.props.location.name}.
            </p>
          ) : (
            <p>No Location chosen yet!</p>
          )}
          <Grid container spacing={24}>
            <Grid item xs>
              <p>Pick your location</p>
              <LocationPicker />
            </Grid>
            <Grid item xs={6}>
              <DayInTheLife />
            </Grid>
            <Grid item xs>
              <InfoDisplay />
            </Grid>
          </Grid>
        </div>
        <div>
          <Map />
          {/* <RadarChart /> */}
        </div>
      </div>
    );
  }
}

let mapStateToProps = state => ({
  location: state.location,
  weather: state.weather
});

let mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(App);
