/* eslint-disable no-unreachable */
import {createStore,combineReducers,bindActionCreators} from './MyRedux';

function classReducer(state,action){
  switch (action.type) {
    case "changeClassName":
      return {
        ...state,
        className: action.payload.className,
      }
    break;
    case "changePeople":
      return {
        ...state,
        people: action.payload.people,
      }
    break;
    case "changeLeader":
      return {
        ...state,
        leader: action.payload.leader,
      }
    break;
    default:
      return {
        ...state
      }
    break;
  }
}

function cityReducer(state,action){
  switch (action.type) {
    case "changeCityName":
      return {
        ...state,
        cityName: action.payload.cityName,
      }
    break;
    case "changeCityPeople":
      return {
        ...state,
        cityPeople: action.payload.cityPeople,
      }
    break;
    case "changeCityCode":
      return {
        ...state,
        cityCode: action.payload.cityCode,
      }
    break;
    default:
      return {
        ...state
      }
    break;
  }
}

const reducer = combineReducers({
  cityReducer,
  classReducer
});
const store = createStore(reducer);
store.subscribe(()=>{
  console.log("测试combineReducers改变==>",store.getState());
});

const combineSuperDispatch =   bindActionCreators({
  changeClassNameActionCreator,
  changePeopleActionCreator,
  changeLeaderActionCreator,

  changeCityNameActionCreator,
  changeCityPeopleActionCreator,
  changeCityCodeActionCreator,
},store.dispatch);
window.combine = combineSuperDispatch;
function changeClassNameActionCreator(className){
  return {
    type: 'changeClassName',
    payload: {className}
  }
}
function changePeopleActionCreator(people){
  return {
    type: 'changePeople',
    payload: {people}
  }
}
function changeLeaderActionCreator(leader){
  return {
    type: 'changeLeader',
    payload: {leader}
  }
}


function changeCityNameActionCreator(cityName){
  return {
    type: 'changeCityName',
    payload: {cityName}
  }
}


function changeCityPeopleActionCreator(cityPeople){
  return {
    type: 'changeCityPeople',
    payload: {cityPeople}
  }
}

function changeCityCodeActionCreator(cityCode){
  return {
    type: 'changeCityCode',
    payload: {cityCode}
  }
}






