import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Main from './components/Main';
import './App.css';

class App extends Component {

  render () {
  return (
    <div className="App">
        <BrowserRouter>
          <Switch>
            <Route path='/:id1/:id' component={Main} />   
            <Route path='/:id' component={Main} />          
            <Route path='/' component={Main} />
          </Switch>
        </BrowserRouter>
    </div>
  );
  }
}

export default App;
