import { createSagaEffect, isPromise, SagaEffectType } from "./utils";

export function select(selectFunc){
  return createSagaEffect(SagaEffectType.select,{
    selectFunc,
  })
}

export function selectEffectHand(effect,next,env){
  const { selectFunc } = effect.payload;
  let state = env.store.getState();
  if(typeof(selectFunc) === "function"){
    state = selectFunc(state);
  }
  next(state,null,false);
}