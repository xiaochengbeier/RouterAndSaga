import sagaRun, { recursionIterator } from "./sagaRun";
import { createSagaEffect, SagaEffectType } from "./utils";

export function all(iterators){
  return createSagaEffect(SagaEffectType.all,{
    iterators
  })
}
export function allEffectHand(effect,next,env){
  const { iterators } = effect.payload;
  // 执行 iterators
  const sagaTasks = [...iterators].map(item => recursionIterator(env,item));
  const sagaTasksPromise = [...sagaTasks].map(item => item.toPromise());
  Promise.all(sagaTasksPromise).then(data=>{
    next(data,null,false);
  }).catch(error=>{
    next(null,error,false);
  });
}