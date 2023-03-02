export default function applayMiddleware(...middles){
    return function(createStore){
      return function(reducer,initProps){
        const store = createStore(reducer,initProps);
        let dispatch = ()=> {
          throw new Error("dispatch 还未重新赋予值哦 ！！！")
        };
        const midStore = { 
          dispatch: (...args) =>dispatch(...args),
          getState: store.getState,
        };
        // 给中间件三层剥掉第一层 注入 阉割版的  store 
        const middlewares = middles.map(item => item(midStore));
        // 给中间件三层剥掉第二层 注入下一个 中间件 next
        dispatch = middlewares.reverse().reduce((pre,cur,curIndex,arr)=>{
          return cur(pre);
        },store.dispatch);
        return {
          ...store,
          dispatch: dispatch
        };
      }
    }
}