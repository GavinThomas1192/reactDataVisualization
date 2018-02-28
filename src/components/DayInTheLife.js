import React from "react";
import axios from "axios";
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryLabel,
  VictoryPolarAxis,
  VictoryStack
} from "victory";

const directions = {
  0: "E",
  45: "NE",
  90: "N",
  135: "NW",
  180: "W",
  225: "SW",
  270: "S",
  315: "SE"
};

const orange = { base: "gold", highlight: "darkOrange" };

const red = { base: "tomato", highlight: "orangeRed" };

const innerRadius = 30;

class CompassCenter extends React.Component {
  render() {
    const { origin } = this.props;
    const circleStyle = {
      stroke: red.base,
      strokeWidth: 2,
      fill: orange.base
    };
    return (
      <g>
        <circle
          cx={origin.x}
          cy={origin.y}
          r={innerRadius}
          style={circleStyle}
        />
      </g>
    );
  }
}

class CenterLabel extends React.Component {
  render() {
    const { datum, active, color } = this.props;
    const text = [`${directions[datum._x]}`, `${Math.round(datum._y1)} mph`];
    const baseStyle = { fill: color.highlight, textAnchor: "middle" };
    const style = [
      { ...baseStyle, fontSize: 18, fontWeight: "bold" },
      { ...baseStyle, fontSize: 12 }
    ];

    return active ? (
      <VictoryLabel text={text} style={style} x={175} y={175} renderInPortal />
    ) : null;
  }
}

export default class DayInTheLife extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wind: this.getWindData(),
      windNew: [],
      windSpeed: "",
      windBearing: "",
      windGust: ""
    };
  }

  componentDidMount() {
    this.setStateInterval = window.setInterval(() => {
      this.setState({ wind: this.getWindData() }, function() {
        console.log("state after getWindData", this.state);
      });
    }, 10000);
  }

  componentWillMount() {
    this.getWindDataFromUnderground();
  }

  getWindDataFromUnderground = () => {
    axios
      .get("http://localhost:3001/api/darksky")
      .then(response => {
        console.log(
          "this is the response from my express server",
          response.data.currently.windSpeed,
          response.data.currently.windBearing
        );
        this.setState(
          {
            windSpeed: response.data.currently.windSpeed,
            windBearing: response.data.currently.windBearing,
            windGust: response.data.currently.windSpeed,
            windNew: [
              ...this.state.windNew,
              {
                windSpeed: response.data.currently.windSpeed,
                windGust: response.data.currently.windSpeed + 0.02,
                windBearing: response.data.currently.windBearing
              },
              {
                windSpeed: response.data.currently.windSpeed,
                windGust: response.data.currently.windSpeed + 0.02,
                windBearing: 45
              },
              {
                windSpeed: response.data.currently.windSpeed,
                windGust: response.data.currently.windSpeed + 0.02,
                windBearing: 90
              },
              {
                windSpeed: response.data.currently.windSpeed,
                windGust: response.data.currently.windSpeed + 0.02,
                windBearing: 135
              },
              {
                windSpeed: response.data.currently.windSpeed,
                windGust: response.data.currently.windSpeed + 0.02,
                windBearing: 180
              },
              {
                windSpeed: response.data.currently.windSpeed,
                windGust: response.data.currently.windSpeed + 0.02,
                windBearing: 225
              },
              {
                windSpeed: response.data.currently.windSpeed,
                windGust: response.data.currently.windSpeed + 0.02,
                windBearing: 270
              },
              {
                windSpeed: response.data.currently.windSpeed,
                windGust: response.data.currently.windSpeed + 0.02,
                windBearing: 315
              }
            ]
          },
          function() {
            console.log("updated state from my express server", this.state);
            this.props.updateHomeWeather(response.data);
          }
        );
      })
      .catch(function(error) {
        console.log(error);
      });
    // https://tile.openweathermap.org/map/{layer}/{z}/{x}/{y}.png?appid={api_key}
  };
  getWindData() {
    return Object.keys(directions).map(d => {
      const speed = Math.floor(Math.random() * 17) + 4;
      return {
        windSpeed: speed,
        windGust: speed + Math.random(2, 10),
        windBearing: +d
      };
    });
  }

  render() {
    return (
      <VictoryChart
        polar
        animate={{ duration: 500, onLoad: { duration: 500 } }}
        theme={VictoryTheme.material}
        innerRadius={innerRadius}
        domainPadding={{ y: 10 }}
        events={[
          {
            childName: "all",
            target: "data",
            eventHandlers: {
              onMouseOver: () => {
                return [
                  { target: "labels", mutation: () => ({ active: true }) },
                  { target: "data", mutation: () => ({ active: true }) }
                ];
              },
              onMouseOut: () => {
                return [
                  { target: "labels", mutation: () => ({ active: false }) },
                  { target: "data", mutation: () => ({ active: false }) }
                ];
              }
            }
          }
        ]}
      >
        <VictoryPolarAxis
          dependentAxis
          labelPlacement="vertical"
          style={{ axis: { stroke: "none" } }}
          tickFormat={() => ""}
        />
        <VictoryPolarAxis
          labelPlacement="parallel"
          tickValues={Object.keys(directions).map(k => +k)}
          tickFormat={Object.values(directions)}
        />
        <VictoryStack>
          <VictoryBar
            style={{
              data: {
                fill: a => (a ? orange.highlight : orange.base),
                width: 40
              }
            }}
            data={this.state.windNew}
            x="windBearing"
            y="windSpeed"
            labels={() => ""}
            labelComponent={<CenterLabel color={orange} />}
          />
          {/* <VictoryBar
            style={{
              data: {
                fill: (d, a) => (a ? red.highlight : red.base),
                width: 40
              }
            }}
            data={this.state.wind}
            x="windBearing"
            y={d => d.windGust - d.windSpeed}
            labels={() => ""}
            labelComponent={<CenterLabel color={red} />}
          /> */}
        </VictoryStack>
        <CompassCenter />
      </VictoryChart>
    );
  }
}

// ReactDOM.render(<App />, mountNode);
