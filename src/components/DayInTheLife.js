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
import Button from "material-ui/Button";

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
      windGust: "",
      homeState: ""
    };
  }

  componentDidMount() {
    console.log("DayInTheLife did mount", this.props);

    // this.setStateInterval = window.setInterval(() => {
    //   this.getWindDataFromUnderground();
    // }, 100000);
  }

  componentDidUpdate() {
    console.log("DayInTheLife update", this.props);
  }

  componentWillReceiveProps(nextProps) {
    // {
    //   nextProps.start
    //     ? this.setState({ homeState: nextProps.homeState })
    //     : undefined;
    // }
    // console.log("NEXTPROPS", nextProps);
  }

  handleRefresh = () => {
    console.log("refreshed");
  };
  getWindDataFromUnderground = () => {
    axios
      .post("http://localhost:3001/api/darksky", {
        lat: this.props.homeState.weatherLocation.latLong.lat,
        long: this.props.homeState.weatherLocation.latLong.lng
      })
      .then(response => {
        console.log(
          "this is the response from my express server",
          response.data.currently.windSpeed,
          response.data.currently.windBearing
        );
        {
          this.state.windNew.length === 0
            ? this.setState(
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
                  console.log(
                    "updated state from my express server",
                    this.state
                  );
                  this.props.updateHomeWeather(response.data);
                }
              )
            : undefined;
        }
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
      <div>
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
          {this.props.homeState.weatherLocation.latLong !== undefined
            ? this.getWindDataFromUnderground()
            : undefined}

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
        <Button
          onClick={this.handleRefresh}
          style={{ margin: "2em" }}
          variant="raised"
          color="primary"
        >
          Update Data
        </Button>
      </div>
    );
  }
}

// ReactDOM.render(<App />, mountNode);
