import sagaRun from "./sagaRun";
import TakeChannel from "./TakeChannel";
export default function createSagaMiddleware(){
  // 返回的是中间件三层函数
  return function sagaMiddleware(store){
      const env = {
        store,
        channel: new TakeChannel(),
      }
      sagaMiddleware.run = sagaRun.bind(null,env);
      return function(next){
        return function(action){
          // 触发 channel
          env.channel.triggerListener(action.type, action);
          // saga 不会阻塞 所以直接执行下一个
          next(action);
        }
      }
  }
}