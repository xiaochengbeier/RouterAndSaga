import { allEffectHand } from "./all";
import { callEffectHand } from "./call";
import { cancelEffectHand } from "./cancel";
import { forkEffectHand } from "./fork";
import { putEffectHand } from "./put";
import SagaTask from "./SagaTask";
import { selectEffectHand } from "./select";
import { takeEffectHand } from "./take";
import { isPromise, isIterator, isSagaEffect, SagaEffectType} from "./utils";
export default function sagaRun(env, iteratorFunc){
  const iterator = iteratorFunc();
  // console.log(iterator.constructor);
  return  recursionIterator(env,iterator);
}
/**
 * 递归执行迭代器
 * @param {*} iterator 
 */
export function recursionIterator(env,iterator){
  if(!isIterator(iterator)){
    return ;
  } 
  const finishCallBackObj = {
    callBack: ()=>{},
  };
  function next(value, error,isOver){
    let result = null;
    if(isOver === true){
      // 如果说 isOver === true 那么我们直接调用 迭代器的 return 方法
      result = iterator.return();
      finishCallBackObj.callBack();
    }else if(error != null){
     // 如果说 error 存在 那么我们直接调用 迭代器的 throw  方法
      result = iterator.throw(error);
    }else{
      // 正常情况 那么我们直接调用 迭代器的 next  方法
      result = iterator.next(value)
    }
    const {value: sagaEffect, done} = result;
    if(done == true){
      // 如果已经迭代完成 
      finishCallBackObj.callBack();
      return false;
    }
    // 判断 sagaEffect 的类型
    if(isSagaEffect(sagaEffect)){
      switch (sagaEffect.type) {
        case SagaEffectType.call:
          callEffectHand(sagaEffect,next,env);
          break;
        case SagaEffectType.put:
          putEffectHand(sagaEffect,next,env);
          break;
        case SagaEffectType.select:
          selectEffectHand(sagaEffect,next,env);
          break;
        case SagaEffectType.take:
          takeEffectHand(sagaEffect,next,env);
          break;
        case SagaEffectType.fork:
          forkEffectHand(sagaEffect,next,env);
          break;
        case SagaEffectType.cancel:
          cancelEffectHand(sagaEffect,next,env);
          break;
        case SagaEffectType.all:
          allEffectHand(sagaEffect,next,env);
          break;
        default:
          break;
      }
    }else if(isPromise(sagaEffect)){
      sagaEffect.then((data)=>{
        next(data, null, false)
      }).catch((error)=>{
        next(null, error, false);
      })
    }

  } 
  next();
  return new SagaTask(next,finishCallBackObj);
}