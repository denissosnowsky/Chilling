import './App.css';
import React, { useEffect } from 'react';
import HeaderContainer from './components/Header/HeaderContainer';
import Navbar from './components/Navbar/Navbar';
import { Redirect, Route, Switch, withRouter } from 'react-router';
import UserProfile from './components/UserProfile/UserProfile';
import FriendsContainer from './components/Friends/FriendsContainer';
import GlobalContainer from './components/Global/GlobalContainer';
import NewsContainer from './components/News/NewsContainer';
import MessagesContainer from './components/Messages/MessagesContainer';
import Music from './components/Music/Music';
import LogSignContainer from './components/LogSign/LogSignContainer';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { verifyAuthThunk } from './redux/authReducer';
import Initializator from './components/common/Initializator/Initializator';
import DialogContainer from './components/Dialog/DialogContainer';
import Error from './components/Error/Error';

function App({isLogged, verifyAuthThunk, isInitialized, order}) {

  useEffect(()=>{
    verifyAuthThunk();
  }, []);
  
  if(!isInitialized){
    return <Initializator />
  }

  if(!isLogged){
    return <LogSignContainer/>;
  } 
  return (
    <div className="app">
      <div className="app__background"></div>
        <HeaderContainer />
        <div className="app__wrapper">
          <Navbar />
          <div className="app__content border border-1 containerForContent">
            <Switch>
              <Route exact path='/' render={()=><Redirect to={`/profile/${order}`}/>}/>
              <Route exact path='/profile' render={()=><Redirect to={`/profile/${order}`}/>}/>
              <Route path='/profile/:id?' render={()=><UserProfile />}/>
              <Route path='/friends' render={()=><FriendsContainer/>}/>
              <Route path='/global' render={()=><GlobalContainer />}/>
              <Route path='/news' render={()=><NewsContainer />} />
              <Route path='/messages/:id' render={()=><DialogContainer />} />
              <Route exact path='/messages' render={()=><MessagesContainer />} />
              <Route path='/music' render={()=><Music />} />
              <Route path='/error404' render={()=><Error />}/>
              <Route path='*' render={()=><Error />}/>
            </Switch>
          </div>
        </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  isLogged: state.authPage.isLogged,
  isInitialized: state.authPage.isInitialized,
  order: state.authPage.order
});

export default compose(withRouter, connect(mapStateToProps, {verifyAuthThunk}))(App);
