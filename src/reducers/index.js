import {
  OPEN_MENU,
  CLOSE_MENU,
  UPDATE_LOCATION,
  LOCATION_ERROR,
  RECEIVED_WEATHER,
  SET_SELECTED_TIME
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
      time: morningDate.getTime() / 1000,
      temperature: 0,
      summary: 'Sunny',
      icon: 'clear-day',
      windSpeed: '7',
      humidity: 0.91 
    },
    afternoon: {
      time: afternoonDate.getTime() / 1000,
      temperature: 0,
      summary: 'Sunny',
      icon: 'clear-day',
      windSpeed: '7',
      humidity: 0.91 
    },
    evening: {
      time: eveningDate.getTime() / 1000,
      temperature: 0,
      summary: 'Sunny',
      icon: 'clear-day',
      windSpeed: '7',
      humidity: 0.91 
    },
    night: {
      time: nightDate.getTime() / 1000,
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
            time: state.times.morning.time,
            ...morning
          },
          afternoon: {
            time: state.times.afternoon.time,
            ...afternoon
          },
          evening: {
            time: state.times.evening.time,
            ...evening
          },
          night: {
            time: state.times.night.time,
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
    default:
      return state;
  }
}