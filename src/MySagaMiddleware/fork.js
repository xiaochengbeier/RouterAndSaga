import sagaRun from "./sagaRun";
import { createSagaEffect, isPromise, SagaEffectType } from "./utils";

export function fork(iteratorFunc){
  return createSagaEffect(SagaEffectType.fork,{
    iteratorFunc
  })
}
export function forkEffectHand(effect,next,env){
  const { iteratorFunc } = effect.payload;
  const sagaTask = sagaRun(env,iteratorFunc);
  // 直接调用 sagaRun 方法
  next(sagaTask,null,false);
}