const SagaEffeteFlag = "@Saga/effect.a.b.c";

export function isIterator(iterator){
  return Object.prototype.toString.call(iterator) === '[object Generator]';
}

export function isPromise(promise){
  return Object.prototype.toString.call(promise) === '[object Promise]';
}

export function isSagaEffect(sagaEffect){
  return sagaEffect && sagaEffect.SagaEffeteFlag === SagaEffeteFlag;
}
export const SagaEffectType = {
   call: "CALL",
   delay: "DELAY",
   put: "PUT",
   select: "SELECT",
   take: "TAKE",
   fork: "FORK",
   cancel: "CANCEL",
   takeEvery: "TAKE_EVERY",
   all: "ALL",
}
export function createSagaEffect(type , payload){
  return {
    SagaEffeteFlag,
    type,
    payload: {
      ...payload,
    }
  }
}
