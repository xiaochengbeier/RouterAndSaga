import logo from './logo.svg';
import './App.css';
import './MyRouter/react-router/history'
import './MyRouter/react-router/match';
import  {BrowserRouter,Route,Link,NavLink,widthRouter} from './MyRouter/react-router-dom';
/**
 * 组件1
 * @param {*} props 
 * @returns 
 */
function Component1(props){
  console.log("Component1(props){===>",props);
  const jump = ()=>{
    props.history.push("/xasfa/fasfa",{target:"Component3"})
  }
  return (
  <div className='com1-wrap'> 
    <div  className='my-com'>我是 Component1(props)</div>
    <span className='my-click-1' onClick={jump}>点我跳转Component3</span>
  </div>)
}
/**
 * 组件2
 * @param {*} props 
 * @returns 
 */
function Component2(props){
  console.log("Component2(props){===>",props);
  const jump = ()=>{
    props.history.push({
      pathname:"/new/guo/li/xian/lihai",
      state: {target:"Component1"}
    })
  }
  return (
    <div className='com2-wrap'> 
      <div className='my-com'>我是 Component2(props)</div>
      <span className='my-click-2'  onClick={jump} > 点我跳转Component1 </span>
    </div>)
}
/**
 * 组件3
 * @param {*} props 
 * @returns 
 */
function Component3(props){
  console.log("Component3(props){===>",props);
  const jump = ()=>{
    props.history.push({
      pathname:"/falsfa/rifgnal",
      state: {target:"Component4"}
    })
  }
  return (
    <div className='com3-wrap'> 
      <div className='my-com'>我是 Component3(props)</div>
      <span  className='my-click-3' onClick={jump}>点我跳转Component4</span>
    </div>)
}

/**
 * 组件3
 * @param {*} props 
 * @returns 
 */
function Component4(props){
  console.log("Component3(props){===>",props);
  return (
    <div className='com3-wrap'> 
      <div className='my-com'>我是 Component4(props) 点击link跳转呀</div>
      <Link to="/fafaskkg/fsleri">点击link跳转去 Component5</Link>
    </div>)
}
function Component5(props){
  console.log("Component3(props){===>",props);
  return (
    <div className='com3-wrap'> 
       <div className='my-com'>我是 Component4(props) 点击NavLink跳转呀</div>
      <NavLink to="/new/guo/li/component5/component5link">点击link跳转去 Component1</NavLink>
    </div>)
}

function TestWidthRouter(props){
  console.log("TestWidthRouter(props){===>",props);
  return (
    <div className='com3-wrap'> 
       我是测试widthRouter的 看我console即可
    </div>)
}
function AppTestRouter() {
 const TestWidthRouterComp =  widthRouter(TestWidthRouter);
  return (
    <div className="App">
      <BrowserRouter>
       <Route path="/new/guo/li/:name/:age"  component={Component1}/>
       <Route path="/age/aa" component={Component2}/>
       <Route path="/xasfa/fasfa" component={Component3}/>
       <Route path="/falsfa/rifgnal" component={Component4}/>
       <Route path="/fafaskkg/fsleri" component={Component5}/>
       <Route>
        {(ctxValue)=>{
          console.log("ctxValue==点我跳转Component2==>",ctxValue);
          return (
            <div className='click-child' onClick={()=> ctxValue.history.push({
              pathname: '/age/aa',
              state: {target:"Component2"}
            })}>点我跳转Component2</div>
          );
        }}
       </Route>

       <div className='NavLink-wrap'> 
        <div className='NavLink-com'>我是 Component4(props) 点击NavLink跳转呀 精准匹配就变色</div>
        <NavLink activeClassName="activeClassNameMy" to="/new/guo/li/component5/component5link">点击link跳转去 Component1</NavLink>
      </div>
       <TestWidthRouterComp/>
      </BrowserRouter>
    </div>
  );
}

export default AppTestRouter;
