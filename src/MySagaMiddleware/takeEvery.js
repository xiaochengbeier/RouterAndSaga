import { fork } from "./fork";
import { take } from "./take";
import { createSagaEffect, isPromise, SagaEffectType } from "./utils";


export function takeEvery(actionType, iteratorFunc){
  function *takeEveryIteratorHand(){
    while(true){
      yield take(actionType);
      yield fork(iteratorFunc);
    }
  }
  return createSagaEffect(SagaEffectType.fork,{
    iteratorFunc: takeEveryIteratorHand
  })
}
