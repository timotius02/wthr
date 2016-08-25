import { weatherApiKey } from './apiKeys'

export default function fetchWeather(lat, long, timeArray) {
  const url = `https://api.forecast.io/forecast/${weatherApiKey}/${lat},${long}`;

  return fetch(url)
    .then((response) => response.json())
    .then((responseJson) => responseJson.hourly.data )
    .then((hourlyData) => {
      return timeArray.map((time) => {

        return hourlyData.find((curr, index, arr) => {
          const next = arr[index + 1];

          if (next === null ) {
            return curr;
          }
          else if (Math.abs(next.time - time) >= Math.abs(curr.time - time)) {
            return curr;
          }
        })
      })
    })
    .catch((error) => {
      console.error(error);
    });
}