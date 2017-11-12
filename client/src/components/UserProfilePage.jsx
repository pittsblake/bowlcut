import React, { Component } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'

class UserProfilePage extends Component {
    state = {
        user: {}
    }

    componentWillMount = async () => {
        this.getUser()
    }

    getUser = async () => {
        const res = await axios.get(`/api/users/17`)
        this.setState({ user: res.data })
    }

    render() {
        return (
            <div>
                <Link to="/stylists"> Stylists </Link>
                <br/>
                <br/>
                
                <img src={this.state.user.image} alt="profile pic"/>
                <h1>{this.state.user.name}</h1>
                <h3>Previous Appointments:</h3>
            </div>
        );
    }
}

export default UserProfilePage;