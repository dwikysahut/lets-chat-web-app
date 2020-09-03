import React, {Component}from 'react';
import { BrowserRouter as Router,Switch, Route } from "react-router-dom";
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import ChatList from './pages/ChatList'
import ChatRoom from './pages/ChatRoom'



const App = ()=>{
    return(
      <Router>
        <Switch>
        <Route path='/' exact component={Home}/>
        <Route path='/login' exact component={Login}/>
        <Route path='/register' exact component={Register}/>
        <Route path='/chatroom' exact component={ChatRoom}/>
        <Route path='/chatlist' exact component={ChatList}/>
        </Switch>

        </Router>

    )

}
export default App;