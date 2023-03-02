import {createStore,applayMiddleware} from './MyRedux';
import {createSagaMiddleware} from './MySagaMiddleware';
import { all } from './MySagaMiddleware/all';
import { call } from './MySagaMiddleware/call';
import { cancel } from './MySagaMiddleware/cancel';
import { delay } from './MySagaMiddleware/delay';
import { fork } from './MySagaMiddleware/fork';
import { put } from './MySagaMiddleware/put';
import { select } from './MySagaMiddleware/select';
import { take } from './MySagaMiddleware/take';
import { takeEvery } from './MySagaMiddleware/takeEvery';
function cityReducer(state,action){
  switch (action.type) {
    case "changeCityName":
      return {
        ...state,
        cityName: action.payload.cityName,
      }
    break;
    case "changeCityPeople":
      return {
        ...state,
        cityPeople: action.payload.cityPeople,
      }
    break;
    case "changeCityCode":
      return {
        ...state,
        cityCode: action.payload.cityCode,
      }
    break;
    default:
      return {
        ...state
      }
    break;
  }
}
const sagaMiddleware = createSagaMiddleware()
const initValue = {
  cityName: "陕西省",
  cityPeople: 99999999,
  cityCode: 2482984
}
const store = applayMiddleware(sagaMiddleware)(createStore)(cityReducer,initValue);
function* mySaga() {
  // 测试 yield 后边是一个 promise
  //  const obj =  yield new Promise((resolve, reject)=>{setTimeout(()=>resolve({name:"郭立成",age: 25}),2000)})
  //  console.log("测试 yield 后边是一个 promise==>",obj);

  // 测试 delay 指令
  // yield delay(5000);
  // console.log("// 测试 delay 指令===>");

  // 测试 call 指令
  // const testCallResult =  yield call([123,testCall],"测试","call","指令");
  // console.log("// 测试 call 指令==testCallResult==>",testCallResult);

  // 测试put指令
  // yield put({
  //   type: 'changeCityName',
  //   payload: {
  //     cityName: "// 测试put指令"
  //   }
  // });

  // 测试select 指令
  //  const selectResult = yield select((state)=> state.cityName);
  //  console.log("// 测试select 指令=selectResult==>",selectResult);

  // 测试take 指令
  // const takeResult =  yield take("changeCityCode");
  // console.log("// 测试take 指令==takeResult==会阻塞==>",takeResult);

  // 测试fork 指令
  // const sagaTask =  yield fork(testFork);
  // console.log("// 测试fork 指令==不会阻塞==> ");
  // 阻塞监听 changeCityPeople 
  // const takeResult = yield take("changeCityPeople");
  // 测试 cancel
  // yield cancel(sagaTask);
  // console.log("// 测试 cancel===取消的是sagaTask===>");

  // 测试 takeEvery
  // yield takeEvery("changeCityPeople",takeEvery1);
  // yield takeEvery("changeCityCode",takeEvery2);
  // console.log("// 测试 takeEvery==不会阻塞==>");

  // 测试 all
  yield all([all1(),all2()]);
  console.log("// 测试 all===会阻塞一个没走完都不行===>",);
}
store.subscribe(()=>{
  console.log("测试sagaMiddleware改变==>",store.getState());
});
sagaMiddleware.run(mySaga);

// 将dispatch 挂载到window 方便在 控制台调试
window.md = store.dispatch;

// 测试 call 指令 
function testCall(...argus){
  console.log("测试 call 指令 ==this=>",this);
  console.log("测试 argus 指令 ==this=>",...argus);
  return new Promise((resolve,reject)=>{
    resolve({
      type:"测试 call 指令 ",
    });
  })
}
// 测试 testFork
function * testFork(){
  while(true){
    // 测试fork 指令
    // 我们一直在fork里边监听 changeCityCode
    const takeResult =  yield take("changeCityCode");
    console.log("//测试fork 指令 我们一直在fork里边使用 take 监听 changeCityCode ==>",takeResult);
  }
}
// 测试 takeEvery 1
function *takeEvery1(){
  console.log("// 测试 takeEvery 1===>");
}
// 测试 takeEvery 2
function *takeEvery2(){
  console.log("// 测试 takeEvery 2===>");
}


// 测试 all 1
function * all1(){
  const takeResult =  yield take("changeCityCode");
  console.log("// 测试 all 1===>",takeResult);
}
// 测试 all 2
function * all2(){
  const takeResult = yield take("changeCityPeople");
  console.log("// 测试 all 2===>",takeResult);
}