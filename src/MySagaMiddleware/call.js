import { createSagaEffect, isPromise, SagaEffectType } from "./utils";

export function call(func,...args){
  return createSagaEffect(SagaEffectType.call,{
    func,
    args
  })
}

export function callEffectHand(effect,next){
  const {func, args} = effect.payload;
  let _this = null;
  let funcExecu = func;
  if(Array.isArray(func)){
    _this = func[0];
    funcExecu = func[1];
  }
  const execResult = funcExecu.call(_this,...args);
  // 如果 execResult 是isPromise 那么在回掉中执行 next
  if(isPromise(execResult)){
    execResult.then((data)=>{
      next(data,null,false);
    }).catch((error)=>{
      next(null,error,false);
    })
  }else{
    next(execResult,null,false);
  }
}