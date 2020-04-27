import { combineReducers } from 'redux';

import {
    ADD_IMAGE,
    UPDATE_PORTFOLIO,
    ADD_PORTFOLIO,
    UPDATE_CURRENT,
    REMOVE_IMAGE,
    EMPTY_LIST
} from '../actions';


const initialState = {
  firstName: '',
  lastName: '',
  mobile: '',
  email: '',
  height: '',
  address: '',
  weight: '',
  dob: '',
  images: []
}

function currentUser(state = initialState, action) {
    switch (action.type) {
      case UPDATE_CURRENT:
        return Object.assign({}, state, action.payload)
      case ADD_IMAGE:
        return Object.assign({}, state, {
          images: state.images.concat(action.payload)
        })
      case REMOVE_IMAGE:
        return Object.assign({}, state, {
          images: state.images.filter(img=>{
            return (img.url !== action.payload.url)
          })
        })
      default:
        return state
    }
  }


function allPortfolios(state=[],action){
    switch(action.type){
        case ADD_PORTFOLIO:
          return [...state,action.payload];
          
        case UPDATE_PORTFOLIO:
          return state.map(portfolio=>{
            if(portfolio.id == action.payload.id){
              return action.payload
            }
            return portfolio;
          })
        case EMPTY_LIST:
          return []
        default:
          return state
    }
}

const rootReducer = combineReducers({
    currentUser,
    allPortfolios
  })
  
  export default rootReducer