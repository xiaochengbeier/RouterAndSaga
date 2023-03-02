export default class ListenerManager{
   listenerFuncs = [];
   /**
    * 添加监听函数
    * @param {*} func 
    * @returns 
    */
   addListener(func){
    this.listenerFuncs.push(func);
    const  unListener = () => {
      const funcIndex = this.listenerFuncs.indexOf(func);
      this.listenerFuncs.splice(funcIndex);
    }
    return unListener;
   }  
  /**
   * 触发监听函数
   * @param {*} location 
   * @param {*} action 
   */
   triggerListener(location,action){
      this.listenerFuncs.forEach(item =>{
        item(location,action);
      });
   }
}