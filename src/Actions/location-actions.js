import axios from "axios";
import { getWindData } from "./weather-actions";

export const locationSet = location => ({
  type: "LOCATION_SET",
  payload: location
});

export const locationCreate = location => ({
  type: "LOCATION_CREATE",
  payload: location
});

export const locationUpdate = location => ({
  type: "LOCATION_UPDATE",
  payload: location
});

export const getGeoLocation = zip => dispatch => {
  axios
    .get(
      `http://maps.googleapis.com/maps/api/geocode/json?address=${zip}&sensor=true`
    )
    .then(response => {
      try {
        console.log(
          "Response from google geolocation api based on zip code",
          response.data.results[0].geometry.location,
          response.data.results[0].formatted_address
        );
        let specificGeoAdress = {
          name: response.data.results[0].formatted_address,
          latLong: response.data.results[0].geometry.location
        };
        dispatch(locationSet(specificGeoAdress));
      } catch (error) {
        return console.log("NOT A VALID ZIPCODE! error");
      }
    })
    .then(() => {
      dispatch(getWindData());
    });
};
