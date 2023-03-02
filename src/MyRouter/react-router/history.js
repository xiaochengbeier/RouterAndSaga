import {createBrowserHistory as gH} from 'history';
import ListenerManager from './ListenerManager';
import BlockManager from './BlockManager';
const defaultInitProps = {
  basename: "",
  forceRefresh: false,
  keyLength: 6,
  getUserConfirmation: (message, callback) => {callback(window.confirm(message))},
}
export function crateBrowserHistory(options = {}){
  options = {...defaultInitProps, ...options};
  // 监听器对象
  const listener = new ListenerManager();
  // 阻塞对象
  const blockManger = new BlockManager(options.getUserConfirmation);
  const history = {
    action: "POP",
    location: crateLocation(options.basename),
  }
  function go(n){
    window.history.go(n);
  }
  function back(){
    window.history.back();
  }
  function forward(){
    window.history.forward();
  }
  /**
   * push方法 
   * @param {*} path  可能是对象 也可能是 字符串  如果是字符串 那么 state 是有效参数
   * @param {*} state 如果 path 是对象那么state是无效参数
   */
  function push(path,state){
    changeLocation(path,state,'PUSH');
  }
  /**
   * replace方法 
   * @param {*} path  可能是对象 也可能是 字符串  如果是字符串 那么 state 是有效参数
   * @param {*} state 如果 path 是对象那么state是无效参数
   */
  function replace(path,state){
    changeLocation(path,state,'REPLACE');
  }
  /**
   * 改变路径
   * @param {*} path 
   * @param {*} state 
   * @param {*} action 
   */
  function changeLocation(path,state,action){
    const pathUnite = uniteParams(path,state,options);
    const beforeLocation = crateLocationFromUniteParams(pathUnite,options.basename);
    // 触发阻塞
    blockManger.triggerBlock(beforeLocation,action,()=>{
      if(action == "PUSH"){
        window.history.pushState({
          key: getKey(options.keyLength),
          state: pathUnite.state,
        },null, pathUnite.path);
      }else if(action == "REPLACE"){
        window.history.replaceState({
          key: getKey(options.keyLength),
          state: pathUnite.state,
        },null, pathUnite.path);
      }
      if(options.forceRefresh === true){
        window.location.href = pathUnite.path;
      }
      // 更新location对象
      const currentLocation = crateLocation(options.basename);
      history.location = currentLocation;
      history.action = action;
      listener.triggerListener(currentLocation,action);
    });
  }
  /**
   * 监听路由改变的方法
   * @param {*} func 
   */
  function listen(func){
   return listener.addListener(func);
  }
  /**
   * 添加阻塞
   * @param {*} prompt 
   */
  function block(prompt){
    blockManger.addBlock(prompt);
  }
  /**
   * 监听popState
   */
  function listenPopState(){
    window.addEventListener("popstate",()=>{
      const currentLocation = crateLocation(options.basename);
      listener.triggerListener(currentLocation,"POP");
      history.action = "POP";
      history.location = currentLocation;
    })
  }

  // 监听路由改变
  listenPopState();
  history.go = go;
  history.back = back;
  history.forward = forward;
  history.push = push;
  history.replace = replace;
  history.listen = listen;
  history.block = block;
  return history;
}
/**
 * 创建location对象
 * @param {*} basename 
 * @returns 
 */
function crateLocation(basename){
  const originLocation = window.location;
  const originState = window.history.state;
  const basenameReg = new RegExp(`^${basename}`);
  // 从原有路径中去掉basename
  const pathname = originLocation.pathname.replace(basenameReg,"");
  const location = {
    pathname: pathname,
    hash: originLocation.hash,
    search: originLocation.search,
    key: null,
    state: null,
  };
  
  // 对于state 需要从history.state 中取
  if(originState == null){
    location.state =  null;
  }else if(typeof originState  != "object"){
    // 如果说originState  != "object" 那么直接 设置给 location.state
    location.state = originState;
  }else{
    // 如果说 originState 存在key的话那么说明是 我们自己放入的state 需要取到
    // state 里边的 state key 就是这个state的标示 其长度由crateBrowserHistory 
    // 传入的 参数 keyLength 决定
    if("key" in originState){
      location.key = originState.key;
      location.state = originState.state;
    }else{
      // 如果没有 key 那么直接设置state
      location.state = originState;
    }
  }

  return location;
}
function crateLocationFromUniteParams(pathUnite,basename){
  const {path = "",state} = pathUnite;
  const url = window.origin + path;
  const urlObj = new URL(url);
  let pathname = urlObj.pathname;
  const hash = urlObj.hash;
  const search = urlObj.search;
  const basenameReg = new RegExp(`^${basename}`);
  // 从原有路径中去掉basename
  pathname = pathname.replace(basenameReg,"");
  return {
    pathname,
    search,
    hash,
    state,
  };
}
/**
 * 统一传过来的参数
 * @param {*} path 
 * @param {*} state 
 * @returns 
 */
function uniteParams(path,state,options){
  let pathTemp,stateTemp;
  if(typeof(path) == "object"){
    const {pathname = "",search = "",hash = ""} = path;
    pathTemp = `${options.basename || ''}${pathname}${search}${hash}`;
    stateTemp = path.state;
  }else if(typeof(path) == "string"){
    pathTemp = path;
    stateTemp = state;
  }
  if(pathTemp != null){
    return {
      path:pathTemp,
      state: stateTemp,
    }
  }
  return null;
}
/**
 * 获得指定长度的key
 * @param {*} keyLength 
 */
function getKey(keyLength = 8){
  return Math.random().toString(36).substring(2,keyLength);
}
window.gH = gH
window.My = crateBrowserHistory;