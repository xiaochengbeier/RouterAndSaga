import { createSagaEffect, isPromise, SagaEffectType } from "./utils";

export function take(actionType){
  return createSagaEffect(SagaEffectType.take,{
    actionType
  })
}

export function takeEffectHand(effect,next,env){
  const { actionType } = effect.payload;
  env.channel.addListener(actionType,(action)=>{
    next(action,null,false);
  })
}