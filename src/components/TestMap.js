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
  componentDidMount() {}
  componentDidUpdate() {
    // console.log("app updated", this.state);
    // try {
    //   console.log("map updated");
    //   this.map.state.map.flyTo({
    //     center: [this.props.weather.longitude, this.props.weather.latitude]
    //   });
    // } catch (error) {
    //   console.log("no map yet", error);
    // }
  }

  componentWillReceiveProps(nextProps) {
    // console.log("********************", nextProps, nextProps.weather.length);
    nextProps.weather.length == undefined &&
    nextProps.weather.longitude !== this.state.longitude
      ? this.setState({
          longitude: nextProps.weather.longitude,
          latitude: nextProps.weather.latitude,
          dynamicZoom: 12
        })
      : undefined;
  }
  render() {
    return (
      <div>
        {/* {this.props.weather.latitude !== undefined ? ( */}
        <Map
          ref={e => {
            this.map = e;
          }}
          style="mapbox://styles/mapbox/streets-v9"
          containerStyle={{
            height: "100vh",
            width: "100vw"
          }}
          center={[this.state.longitude, this.state.latitude]}
          zoom={[this.state.dynamicZoom]}
        >
          <Layer
            type="symbol"
            id="marker"
            layout={{ "icon-image": "marker-15" }}
          >
            {/* <Feature coordinates={[2.2137, 46.22276]} /> */}
          </Layer>
        </Map>
        {/* ) : (
          <h1>NO location data yet.</h1>
        )} */}
      </div>

      //       // fly with default options to null island
      // map.flyTo({center: [0, 0], zoom: 9});
      // // using flyTo options
      // map.flyTo({
      //   center: [0, 0],
      //   zoom: 9,
      //   speed: 0.2,
      //   curve: 1,
      //   easing(t) {
      //     return t;
      //   }
      // });
    );
  }
}
let mapStateToProps = state => ({
  weather: state.weather,
  location: state.location
});

let mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(TestMap);
