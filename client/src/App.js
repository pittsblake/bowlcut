import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from './components/HomePage'
import AllActiveStylists from './components/AllActiveStylists'
import StylistShowPage from './components/StylistShowPage'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route
              exact path="/"
              component={HomePage}
            />
            <Route
              exact path="/stylists"
              component={AllActiveStylists}
            />
            <Route
              exact path="/stylists/:id"
              component={StylistShowPage}
            />

          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
