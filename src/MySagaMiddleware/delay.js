import { createSagaEffect, SagaEffectType } from "./utils";
export function delay(duration){
  return createSagaEffect(SagaEffectType.call,{
    func: ()=>new Promise(resolve=>setTimeout(()=> resolve(),duration)),
    args: [],
  })
}