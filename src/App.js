import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import DayInTheLife from "../src/components/DayInTheLife";
import FloatingActionButtonZoom from "../src/components/InfoDisplay";

import LocationPicker from "../src/components/LocationPicker";
import RadarChart from "../src/components/RadarChart";
import Grid from "material-ui/Grid";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weatherData: "",
      weatherLocation: "",
      start: false
    };
  }

  updateHomeWeather = data => {
    this.setState({ weatherData: data });
  };

  updateHomeLocation = data => {
    this.setState({ weatherLocation: data, start: true });
  };

  componentDidUpdate() {
    console.log("App updated", this.state);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">React Data Visualization</h1>
        </header>
        <div className="polarChartContainer">
          {this.state.weatherLocation !== "" ? (
            <p className="App-intro">
              Current weather for {this.state.weatherLocation.name}.
            </p>
          ) : (
            <p>No Location chosen yet!</p>
          )}
          <Grid container spacing={24}>
            <Grid item xs>
              <p>Settings</p>
              <LocationPicker updateHomeLocation={this.updateHomeLocation} />
            </Grid>
            <Grid item xs={6}>
              <DayInTheLife
                location={this.state.weatherLocation.latLong}
                updateHomeWeather={this.updateHomeWeather}
                homeState={this.state}
              />
            </Grid>
            <Grid item xs>
              <p>Info</p>
              {this.state.weatherData !== "" ? (
                <h2>{this.state.weatherData.daily.summary}</h2>
              ) : (
                undefined
              )}
              {/* <FloatingActionButtonZoom /> */}
            </Grid>
          </Grid>
        </div>
        <div>
          <RadarChart />
        </div>
      </div>
    );
  }
}

export default App;
