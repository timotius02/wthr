import fetchWeatherApi from '../api/api';

export const OPEN_MENU = 'OPEN_MENU';
export const CLOSE_MENU = 'CLOSE_MENU';
export const UPDATE_LOCATION = 'UPDATE_LOCATION';
export const LOCATION_ERROR = 'LOCATION_ERROR';
export const RECEIVED_WEATHER = 'RECEIVED_WEATHER';
export const SET_SELECTED_TIME = 'SET_SELECTED_TIME';

export function openMenu() {
  return {
    type: OPEN_MENU
  }
}

export function closeMenu() {
  return {
    type: CLOSE_MENU
  }
}

export function setSelectedTime(time) {
  return {
    type: SET_SELECTED_TIME,
    selected: time
  }
}

export function updateLocation(latitude, longitude) {
  return {
    type: UPDATE_LOCATION,
    coords: {latitude, longitude}
  }
}

export function locationFailure(error) {
  return {
    type: LOCATION_ERROR,
    error
  }
}

export function getLocation() {
  return (dispatch) => {
    return new Promise((resolve, reject) =>{
       navigator.geolocation.getCurrentPosition(
        (position) => {
          const {latitude, longitude} = position.coords;
          dispatch(updateLocation(latitude, longitude));
          resolve({latitude, longitude});
        },
        (error) => {
          dispatch(locationFailure(error))
          reject(error);
        },
        {enableHighAccuracy: false}
      );

    });
  }
}
export function receivedWeather(weather) {
    const morning = weather[0];
    const afternoon = weather[1];
    const evening = weather[2];
    const night = weather[3];

    return {
      type: RECEIVED_WEATHER,
      morning,
      afternoon,
      evening,
      night
  };

}

export function fetchWeather(times) {

  return dispatch => {
    dispatch(getLocation())
      .then(({latitude, longitude}) => {
        return fetchWeatherApi(latitude, longitude, times);
      })
      .then((weather) => {
        dispatch(receivedWeather(weather));
      })
      .catch((error) => {
        console.log(error);
      })
  }
}

