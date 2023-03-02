export default class BlockManager{
  
   constructor(getUserConfirmation){
    this.prompt = null;
    this.getUserConfirmation  = getUserConfirmation;
   }
  /**
   * 添加阻塞
   * @param {*} func 
   * @returns 
   */
  addBlock(prompt){
    this.prompt = prompt;
    return ()=>{
      this.prompt = null;
    }
  }  
 /**
  * 触发阻塞
  * @param {*} location 
  * @param {*} action 
  */
  triggerBlock(location,action,callback){
     let message = null;
     let prompt = this.prompt;
     if(typeof prompt == "string"){
      message = prompt;
     }else if(typeof prompt ==  'function'){
      message = prompt(location,action);
     }
     if(message == null){
       callback();
     }else{
      this.getUserConfirmation(message, (flag)=>{
        if(flag == true){
          callback();
        }
      });
     }
  }
}