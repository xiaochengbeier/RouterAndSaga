import {createStore,bindActionCreators} from './MyRedux';
const store = createStore(reducer, {val: 999,age: 18,name:"GuoLiCheng"});
function  reducer(state,action){
  console.log(state,action);
  if(action.type === 'increase'){
    return {
      ...state,
      val: state.val - 1,
    }
  }else if(action.type === 'decrease'){
    return {
      ...state,
      val: state.val + 1,
    }
  }else if(action.type === 'replaceNameActionCreator'){
    return {
      ...state,
      ...action.payload,
    }
  }else if(action.type === 'replaceAgeActionCreator'){
    return {
      ...state,
      ...action.payload,
    }
  }
  return state;
}


function replaceNameActionCreator(name){
  return {
    type: "replaceNameActionCreator",
    payload: {name}
  }
}

function replaceAgeActionCreator(age){
  return {
    type: "replaceNameActionCreator",
    payload: {age}
  }
}

/**
 * 监听store改变
 */
store.subscribe(()=>{
  console.log('store===改变了===>',store.getState());
});
window.increase = () => store.dispatch({
  type: 'increase'
});
window.decrease = () =>  store.dispatch({
  type: 'decrease'
});
/**
 * bindActionCreator
 */
const dispatchSuper = bindActionCreators({
  replaceNameActionCreator,
  replaceAgeActionCreator
},store.dispatch); 
window.dispatchSuper = dispatchSuper;
console.log("store=初始化结果==>",store.getState());
