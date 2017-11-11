import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from './components/HomePage'
import AllActiveStylists from './components/AllActiveStylists'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/stylists" component={AllActiveStylists} />

          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
