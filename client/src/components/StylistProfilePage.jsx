import React, { Component } from 'react';
import axios from 'axios'
import styled from 'styled-components'
import PendingAppointment from './PendingAppointment'
import { Redirect } from 'react-router-dom'


const NavBar = styled.div`
    display: flex;
    justify-content: flex-end;
    padding: 10px;
    margin-right: 10px;
    background-color: lightcyan;
`

const StylistsButton = styled.button`
    text-decoration: none;
    background-color: #686569; 
    border: none;
    color: white;
    padding: 15px 32px;
    margin-right: 10px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    opacity: 0.7;
    &:hover {
        box-shadow: 2px 4px 5px black; 
        cursor: grab;
    }
    a {
        text-decoration: none;
        color: white
    }
    }
`

const StatusButton = styled.button`
    text-decoration: none;
    background-color: #686569; 
    border: none;
    color: white;
    padding: 15px 32px;
    margin-right: 10px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    opacity: 0.7;
    &:hover {
        box-shadow: 2px 4px 5px black; 
        cursor: grab;
    }
    &:active {
        cursor: grabbing;
    }
`

const CardContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    background-color: lightcyan;
    
`

const Card = styled.div`
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0   6px 20px 0 rgba(0, 0, 0, 0.19);
    padding-top: 5px;
    padding-bottom: 80px;
    margin: 10px auto;
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

const Image = styled.img`
  height: 300px;
  width: 300px
`

const ImageContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center
`

const TextArea = styled.textarea`
    text-decoration: none;
    border: none;
    display: flex;
    justify-content: center;
    padding: 20px;
    &:hover {
        border: solid thin grey;
        border-radius: 1%
    }

`

class StylistProfilePage extends Component {
    state = {
        stylist: {
            active: '',
        },
        appointments: [],
        redirectToAppointmentPage: false
    }

    componentWillMount = async () => {
        this.getStylist()
    }

    getStylist = async () => {
        const res = await axios.get(`/api/stylists/1`)
        const stylist = res.data.stylist
        this.setState({ stylist: stylist, appointments: res.data.appointments })
    }

    handleChange = (event) => {
        const attribute = event.target.name
        const updateStylist = { ...this.state.stylist }
        updateStylist[attribute] = event.target.value
        this.setState({ stylist: updateStylist })
    }

    handleSubmit = async (event) => {
        event.preventDefault()
        const payload = {
            description: this.state.stylist.description,
        }
        const res = await axios.patch(`/api/stylists/1`, payload)
        await this.setState({ stylist: res.data })
    }

    toggleIsActive = () => {
        const updateStylist = { ...this.state.stylist }
        updateStylist.active = !this.state.stylist.active
        this.setState({
            stylist: updateStylist
        })
    }

    updateActiveStatus = async (event) => {
        event.preventDefault()
        const payload = {
            stylist: {
                active: !this.state.stylist.active
            }
        }
        const res = await axios.patch(`/api/stylists/1`, payload)
        console.log(res.data)
        await this.setState({ stylist: res.data.stylist, appointments: res.data.appointments })
    }

    onClick = async (event) => {
        // await this.toggleIsActive();
        this.updateActiveStatus(event)
    }

    setAppointmentState = (appointment) => {
        this.setState({
            redirectToAppointmentPage: true
        })
    }

    render() {

        // if (this.state.redirectToAppointmentPage){
        //     return <Redirect to={`/appointment/${this.state.stylist.appointment.id}`} />
        // }

        return (
            <div>
                <NavBar>
                    <StylistsButton><a href="/stylists"> All Stylists </a></StylistsButton>
                    <StylistsButton><a href="/user/1"> User Profile </a></StylistsButton>
                </NavBar>
                <CardContainer>

                    <Card>
                        <ImageContainer>
                            <Image src={this.state.stylist.image} alt="Profile picture" />
                        </ImageContainer>

                        <h2>{this.state.stylist.name}</h2>

                        {
                            this.state.stylist.active ?
                                <h3>Status: active</h3>
                                :
                                <h3>Status: inactive</h3>
                        }
                        {
                            this.state.stylist.active ?
                                <StatusButton onClick={this.onClick}>Stop Cutting</StatusButton>
                                :
                                <StatusButton onClick={this.onClick}>Ready to Cut</StatusButton>

                        }
                        <div>
                            <TextArea
                                onSubmit={this.handleSubmit}
                                onChange={this.handleChange}
                                name="description"
                                cols="62"
                                rows="12"
                                value={this.state.stylist.description}>
                            </TextArea>
                        </div>

                        <button onClick={this.handleSubmit}>Submit</button>

                        <h2>Pending Appointments</h2>

                        <PendingAppointment
                            stylist={this.state.appointments}
                        />
                    </Card>
                </CardContainer>
            </div>
        );
    }
}

export default StylistProfilePage;