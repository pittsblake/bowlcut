import React, { Component } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'

class UserProfilePage extends Component {
    state = {
        user: {
            appointments: [],
            user: {}
        }
    }

    componentWillMount = async () => {
        this.getUser()
    }

    getUser = async () => {
        try {
            const { id } = this.props.match.params
            const res = await axios.get(`/api/users/${id}`)
            console.log(res.data)
            this.setState({ user: res.data })
        } catch (err) {
            console.log(err)
        }
    }

    render() {
        return (
            <div>
                <Link to="/stylists"> Stylists </Link>
                <br />
                <br />

                <img src={this.state.user.user.image} alt="profile pic" />
                <h1>{this.state.user.user.name}</h1>
                <h3>Previous Appointments:</h3>

                {this.state.user.appointments.map((appointment) => {
                    return (

                        <div key={appointment.id}>
                            {
                                appointment.finish ?
                                    null : <div>
                                        <h5>{appointment.stylist_name}</h5>
                                        <h5>{appointment.start_time}</h5>
                                    </div>
                            }
                        </div>

                    )
                })}

            </div>
        );
    }
}

export default UserProfilePage;


