import {isPlan,INIT_ACTION,INIT_RANDOM_ACTION} from './util';
export default function combineReducers(reducers){
  if(!isPlan(reducers)){
    throw new Error("reducers 必须是一个平面对象");
  }
  function reducer(state = {},action){
    const newState = {};
    for (const key in reducers) {
      if (Object.hasOwnProperty.call(reducers, key)) {
        const element = reducers[key];
        // 第一次校验 当前reducer 是否有默认值
        const init1 =  element(null,{type: INIT_ACTION});
        if(init1 == null){
          throw new Error("第一次校验 当前reducer 是否有默认值");
        }
        // 第二次校验 当前reducer 是否有默认值
        const init2 =  element(null,{type: INIT_RANDOM_ACTION});
        if(init2 == null){
          throw new Error(" 第二次校验 当前reducer 是否有默认值");
        }
        newState[key] = element(state[key],action);
      }
    }
    return newState;
  }
  return reducer;
}