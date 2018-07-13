import React, { Component } from 'react';
import Header from './components/Header';
import { Switch, Route } from 'react-router-dom'

import Feed from './components/Feed'
import Profile from './components/Profile'
import WeaponView from './components/WeaponView'
import Editor from './components/Editor'
import requireAuthentication from './utils/requireAuth'
import SignInWith from './components/SignInWith'

class App extends Component {
    render() {
        const pathname = window.location.pathname
        return (
            <div>
                {!pathname.includes('editor') ? <Header /> : ''}
                <SignInWith />
                <Switch>

                    <Route exact path="/" component={Feed} />

                    <Route path="/profile/:id" component={Profile} />
                    <Route path="/weaponview/:id" component={WeaponView} />
                    <Route path="/editor" component={requireAuthentication(Editor)} />
                    <Route path="**" component={Feed} />
                </Switch>
            </div>
        );
    }
}

export default App;