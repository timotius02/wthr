import {
  OPEN_MENU,
  CLOSE_MENU,
  UPDATE_LOCATION,
  LOCATION_ERROR,
  RECEIVED_WEATHER,
  SET_SELECTED_TIME,
  TOGGLE
} from '../actions';

var morningTime = '9:00 am';
var afternoonTime = '12:00 pm';
var eveningTime = '3:00 pm';
var nightTime= '6:00 pm';

const now = new Date();
const morningDate = new Date(`${now.toDateString()} ${morningTime}`);
const afternoonDate = new Date(`${now.toDateString()} ${afternoonTime}`);
const eveningDate = new Date(`${now.toDateString()} ${eveningTime}`);
const nightDate = new Date(`${now.toDateString()} ${nightTime}`);

let selected = 'morning';
    
if (now.getTime() > morningDate.getTime()) {
  selected = 'afternoon';
  morningDate.setDate(morningDate.getDate() + 1);
}
if (now.getTime() > afternoonDate.getTime()) {
  selected = 'evening';  
  afternoonDate.setDate(afternoonDate.getDate() + 1);
}
if (now.getTime() > eveningDate.getTime()) {
  selected = 'night'  
  eveningDate.setDate(eveningDate.getDate() + 1);
}

const initialState = {
  isMenuOpen: false,
  loading: true,
  coords: {latitude: 0, longitude: 0},
  error: '',
  selected,
  times: {
    morning: {
      show: true,
      unixtime: morningDate.getTime() / 1000,
      temperature: 0,
      summary: 'Sunny',
      icon: 'clear-day',
      windSpeed: '7',
      humidity: 0.91 
    },
    afternoon: {
      show: true,
      unixtime: afternoonDate.getTime() / 1000,
      temperature: 0,
      summary: 'Sunny',
      icon: 'clear-day',
      windSpeed: '7',
      humidity: 0.91 
    },
    evening: {
      show: true,
      unixtime: eveningDate.getTime() / 1000,
      temperature: 0,
      summary: 'Sunny',
      icon: 'clear-day',
      windSpeed: '7',
      humidity: 0.91 
    },
    night: {
      show: true,
      unixtime: nightDate.getTime() / 1000,
      temperature: 0,
      summary: 'Sunny',
      icon: 'clear-day',
      windSpeed: '7',
      humidity: 0.91 
    }
  }
}

export default function rootReducer(state = initialState, action) {
  switch(action.type) {
    case OPEN_MENU: {
      return {
        ...state,
        isMenuOpen: true
      };
    }
    case CLOSE_MENU: {
      return {
        ...state,
        isMenuOpen: false
      };
    }
    case UPDATE_LOCATION: {
      const { latitude, longitude } = action.coords;
      return {
        ...state,
        coords: {
          latitude,
          longitude 
        }
      }
    }
    case LOCATION_ERROR: {
      return {
        ...state,
        error: action.error
      }

    }
    case RECEIVED_WEATHER: {
      const { morning, afternoon, evening, night } = action;

      return {
        ...state,
        loading: false,
        times: {
          morning: {
            ...state.times.morning,
            ...morning
          },
          afternoon: {
            ...state.times.afternoon,
            ...afternoon
          },
          evening: {
            ...state.times.evening,
            ...evening
          },
          night: {
            ...state.times.night,
            ...night
          }
        }
      }
    }
    case SET_SELECTED_TIME: {
      return {
        ...state,
        selected: action.selected
      }
    }
    case TOGGLE: {
      const { time } = action;

      return {
        ...state,
        times: {
          ...state.times,
          [time]: {
            ...state.times[time],
            show: !state.times[time].show
          }
        }
      }
    }
    default:
      return state;
  }
}