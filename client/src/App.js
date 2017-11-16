import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import HomePage from './components/HomePage'
import AllActiveStylists from './components/AllActiveStylists'
import StylistShowPage from './components/StylistShowPage'
import StylistProfilePage from './components/StylistProfilePage'
import UserProfilePage from './components/UserProfilePage'
import AppointmentPage from './components/AppointmentPage'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SignUpLogIn from './components/SignUpLogIn'
import axios from 'axios'
import {clearAuthTokens, saveAuthTokens, setAxiosDefaults, userIsLoggedIn} from "./util/SessionHeaderUtil";



class App extends Component {
  state = {
    signedIn: false
  }

  async componentWillMount() {
    try {
        const signedIn = userIsLoggedIn()

        if (signedIn) {
            setAxiosDefaults()      
        }

        this.setState({
            signedIn,
        })
    } catch(error) {
        console.log(error)
    }
}

  signUp = async (email, password, password_confirmation) => {
    try {
        const payload = {
            email: email,
            password: password,
            password_confirmation: password_confirmation,
        }
        const response = await axios.post('/auth', payload)
        saveAuthTokens(response.headers)

        this.setState({
            signedIn: true,
        })

    } catch (error) {
        console.log(error)
    }
}

signIn = async (email, password) => {
    try {
        const payload = {
            email,
            password
        }
        const response = await axios.post('/auth/sign_in', payload)
        saveAuthTokens(response.headers)
        

        this.setState({
            signedIn: true,
        })

    } catch (error) {
        console.log(error)
    }
}

signOut = async (event) => {
  event.preventDefault()
  try {
      console.log('hello burns')
      
      await axios.delete('/auth/sign_out')

      clearAuthTokens();
      console.log(localStorage)

      this.setState({signedIn: false})
  } catch(error) {
      console.log(error)
  }
}

  render() {

    const SignUpLogInComponent = () => (
      <SignUpLogIn
        signUp={this.signUp}
        signIn={this.signIn} />
    )

    return (
      <MuiThemeProvider>
        <Router>
          <div>
          <button onClick={this.signOut}>Sign Out</button>
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
                exact path="/user/:id"
                component={UserProfilePage}
              />

              <Route
                exact path="/appointment/:id"
                component={AppointmentPage}
              />

              <Route exact path="/signUp" render={SignUpLogInComponent}/>

            </Switch>

            {this.state.signedIn ? <Redirect to="/stylists"/> : <Redirect to="/signUp"/>}

          </div>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;
