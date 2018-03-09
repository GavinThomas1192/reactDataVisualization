import React from "react";
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import { connect } from "react-redux";

const Map = ReactMapboxGl({
  accessToken: `${process.env.REACT_APP_MAP_BOX_TOKEN}`
});

class TestMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      longitude: 2.2137,
      latitude: 46.22276,
      dynamicZoom: 1
    };
  }

  componentWillReceiveProps(nextProps) {
    // console.log("********************", nextProps, nextProps.weather.length);
    {
      nextProps.weather.length == undefined &&
      nextProps.weather.longitude !== this.state.longitude
        ? this.setState({
            longitude: nextProps.weather.longitude,
            latitude: nextProps.weather.latitude,
            dynamicZoom: 12
          })
        : undefined;
    }
  }
  render() {
    return (
      <Map
        ref={e => {
          this.map = e;
        }}
        style="mapbox://styles/mapbox/satellite-streets-v10"
        containerStyle={{
          height: "75vh",
          width: "75vw",
          margin: "auto"
        }}
        center={[this.state.longitude, this.state.latitude]}
        zoom={[this.state.dynamicZoom]}
      >
        <Layer type="symbol" id="marker" layout={{ "icon-image": "marker-15" }}>
          {/* <Feature coordinates={[2.2137, 46.22276]} /> */}
        </Layer>
      </Map>
    );
  }
}
const mapStateToProps = state => ({
  weather: state.weather,
  location: state.location
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(TestMap);
