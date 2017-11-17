import React, { Component } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Image = styled.img`
    height: 35vh;
    width: 25vw
`

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
        const res = await axios.get(`/api/users/13`)
        console.log(res.data)
        this.setState({ user: res.data })
    }

    render() {
        return (
            <div>
                <Link to="/stylists"> Stylists </Link>
                <br />
                <br />

                <Image src={this.state.user.user.image} alt="profile pic" />
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


