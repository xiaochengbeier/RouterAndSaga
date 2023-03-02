import { createSagaEffect, isPromise, SagaEffectType } from "./utils";

export function cancel(sagaTask){
  return createSagaEffect(SagaEffectType.cancel,{
    sagaTask
  })
}

export function cancelEffectHand(effect,next){
  const {sagaTask} = effect.payload;
  sagaTask.cancel();
  next(null,null,false);
}