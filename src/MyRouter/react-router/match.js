import pathToRegexp from "path-to-regexp";
export default function getMatch(path,pathname,options = {}){
  const keys = [];
  const optionsDefault = {
    sensitive: false,
    strict: false,
    exact: false,
    ...options,
  }
  const optionsFinal = {
    sensitive: optionsDefault.sensitive,
    strict: optionsDefault.strict,
    end: optionsDefault.exact
  }
  const pathReg = pathToRegexp(path,keys,optionsFinal);
  const pathResult =  pathReg.exec(pathname);
  if(pathResult == null){
    // 如果是空的那么返回空
    return null;
  }
  // 讲匹配到的类数组转换成数组
  const [execPath,...paramArr] =  Array.from(pathResult);
  // 是否是完全匹配
  const isExact = execPath === pathname;
  // path 就是参数path
  // url  就是execPath
  const url = execPath;
  // params key 在 keys 中 值在  paramArr 并且索引是一一对应的
  const params = keys.reduce((pre,curItem,curIndex,arr)=>{
    const key = curItem.name;
    const value = paramArr[curIndex];
    pre[key] = value;
    return pre;
  },{});
  return {
    isExact: isExact,
    params: params,
    url: url,
    path:path,
  };
}
getMatch("/a/b/c/:d","/a/b/c/d",{})
window.h = getMatch;
window.pathTo = pathToRegexp;