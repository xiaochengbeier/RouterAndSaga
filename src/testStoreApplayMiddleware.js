/* eslint-disable no-unreachable */
import {createStore,applayMiddleware,bindActionCreators} from './MyRedux';

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
function Middleware1(store){
  return function(next){
      return function(action){
        console.log("Middleware1改变前==>",action, store.getState());
        next(action);
        console.log("Middleware1改变后==>",action, store.getState());
      }
  }
}
function Middleware2(store){
  return function(next){
      return function(action){
        console.log("Middleware2改变前==>",action, store.getState());
        next(action);
        console.log("Middleware2改变后==>",action, store.getState());
      }
  }
}
function Middleware3(store){
  return function(next){
      return function(action){
        console.log("Middleware3改变前==>",action, store.getState());
        next(action);
        console.log("Middleware3改变后==>",action, store.getState());
      }
  }
}
/**
 * 中间jian的两种使用创建使用方式 其实底层事一种 createStore 中也是
 * 直接调用的 applayMiddleware 这种方式
 */
const store = createStore(cityReducer,applayMiddleware(Middleware1,Middleware2,Middleware3));
// const store = applayMiddleware(Middleware1,Middleware2,Middleware3)(createStore)(cityReducer);
store.subscribe(()=>{
  console.log("测试applayMiddleware改变==>",store.getState());
});
const applayMiddlewareDispatch =   bindActionCreators({
  changeCityNameActionCreator,
  changeCityPeopleActionCreator,
  changeCityCodeActionCreator,
},store.dispatch);
window.applayMiddle = applayMiddlewareDispatch;
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