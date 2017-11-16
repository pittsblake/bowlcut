import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from './components/HomePage'
import AllActiveStylists from './components/AllActiveStylists'
import StylistShowPage from './components/StylistShowPage'
import StylistProfilePage from './components/StylistProfilePage'
import UserProfilePage from './components/UserProfilePage'
import AppointmentPage from './components/AppointmentPage'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
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
              <Route
                exact path="/stylist/12"
                component={StylistProfilePage}
              />
              <Route
                exact path="/user/9"
                component={UserProfilePage}
              />

              <Route
                exact path="/appointment/:id"
                component={AppointmentPage}
              />

            </Switch>
          </div>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;
