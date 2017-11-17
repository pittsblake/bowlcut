import React, { Component } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Moment from 'react-moment';

const BodyOfComponent = styled.div`
    background-color: lightcyan
`

const Image = styled.img`
    height: 40vh;
    width: 25vw
`

const CardContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: lightcyan;
    
`
const Card = styled.div`
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0   6px 20px 0 rgba(0, 0, 0, 0.19);
    padding-top: 5px;
    padding-bottom: 10px;
    background-color: white;
    opacity: .8;
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    h3 {
        border-bottom: solid thin
    }
`
const AppointmentContainer = styled.div`
    border-bottom: solid thin
`
const ButtonDiv = styled.div`
    display: flex;
    justify-content: flex-end
`

const Button = styled.button`
    text-decoration: none;
    background-color: #686569; 
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    opacity: 0.7;
    margin-top: 10px;
    margin-right: 10px;
    margin-bottom: 2px;
    a {
        text-decoration: none;
        color: white
    }
    &:hover {
        box-shadow: 2px 4px 5px grey; 
        cursor: grab;
    }
}
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
            <BodyOfComponent>
                <ButtonDiv>
                <Button> <a href="/stylists"> Stylists </a> </Button>
                </ButtonDiv>
                <br />
                <br />
                <CardContainer>
                    <Card>
                    <Image src={this.state.user.user.image} alt="profile pic" />
                    <h1>{this.state.user.user.name}</h1>
                    <h3>Previous Appointments</h3>

                    {this.state.user.appointments.map((appointment) => {
                        return (

                            <div key={appointment.id}>
                                {
                                    appointment.finish ?
                                        null : 
                                        <AppointmentContainer>
                                            <h5><Moment fromNow>{appointment.created_at}</Moment> </h5>
                                            <h5>With: {appointment.stylist_name}</h5>
                                        </AppointmentContainer>
                                }
                            </div>

                        )
                    })}
                    </Card>
                </CardContainer>
            </BodyOfComponent>
        );
    }
}

export default UserProfilePage;


