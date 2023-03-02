import { createSagaEffect, isPromise, SagaEffectType } from "./utils";

export function put(action){
  return createSagaEffect(SagaEffectType.put,{
    action
  })
}

export function putEffectHand(effect,next,env){
  const { action } = effect.payload;
  const dispatchResult = env.store.dispatch(action);
  next(dispatchResult,null,false);
}