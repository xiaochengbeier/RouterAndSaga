import {isPlan,INIT_ACTION} from './util';
function createStore(reduce,initState,initState2){
   //  如果说 initState 是一个function的话那么直接进入 applayMiddleware 模式
   if(typeof initState === "function"){
    return initState(createStore)(reduce,initState2);
   }
  let lastReducer = reduce;
  let lastState = initState;
  const subscribes = [];
  /**
   * 分发action
   * @param {*} action 
   */
  function dispatch(action){
    if(!isPlan(action)){
      throw new Error("action 必须是一个平面对象 ");
    }
    lastState =  lastReducer(lastState, action);
    for(let item of subscribes){
      item();
    }
  }
  /**
   * 获得state
   * @returns 
   */
  function getState(){
    return lastState;
  }
  /**
   * 监听store改变
   * @param {*} callback 
   * @returns 
   */
  function  subscribe(callback){
    if(typeof callback === "function"){
      subscribes.push(callback);
      const index = subscribes.indexOf(callback);
      return ()=>{
        subscribes.splice(index,1);
      }
    }
  }
  dispatch({
    type: INIT_ACTION
  });
  return {
    dispatch,
    getState,
    subscribe
  };
}
export default createStore;