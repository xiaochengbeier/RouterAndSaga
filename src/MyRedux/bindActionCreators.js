import {isPlan} from './util';
export default function bindActionCreator(actions,dispatch){
  if(isPlan(actions) ||  typeof actions == 'function'){
      // actions 是一个函数的情况
      if(typeof actions === "function"){
        return bindActionCreatorHand(actions,dispatch);
      }
      // actions 是一个对象的情况
      const bindActionObj = {};
      if(typeof actions == 'object'){
        for (const key in actions) {
          if (Object.hasOwnProperty.call(actions, key)) {
            const element = actions[key];
            const action = element();
            if(action.type == null || !isPlan(action)){
              throw new Error("actionCreator 返回 必须是一个带有type属性的平面对象哦  ");
            }
            bindActionObj[key] = bindActionCreatorHand(element,dispatch);
          }
        }
      }
      return bindActionObj;
  }else{
    throw new Error("actions 必须是一个平面对象哦 ");
  }
};
/**
 * 给定一个 actionCreatorFunc 函数返回一个增强
 * @param {*} actionCreatorFunc 
 */
function bindActionCreatorHand(actionCreatorFunc,dispatch){
  return function(...args){
    const action = actionCreatorFunc(...args);
    dispatch(action);
  }
};