export default class TakeChannel  {
  listeners = {};
  addListener(actionType,func){
    if(actionType != null && typeof func == "function"){
      if(this.listeners[actionType] == null){
        this.listeners[actionType] = [];
      }
      this.listeners[actionType].push(func);
    }
  };
  triggerListener(actionType, action){
    const execuFuncs = this.listeners[actionType] || [];
    delete this.listeners[actionType];
    for(let func of execuFuncs){
      func(action);
    }
  };
}
