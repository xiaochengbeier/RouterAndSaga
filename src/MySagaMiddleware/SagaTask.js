export default class SagaTask{
  cancelFunc = null;
  constructor(cancelFunc,finishCallBackObj){
    this.cancelFunc = cancelFunc;
    this.resolveFunc = null;
    finishCallBackObj.callBack = ()=>{
      this.resolveFunc &&  this.resolveFunc();
    }
  }
  cancel(){
    this.cancelFunc(null,null,true);
  };
  toPromise(){
    return new Promise((resolve,reject)=>{
      this.resolveFunc = resolve;
    })
  };
}