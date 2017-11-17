import React, { Component } from 'react';
import axios from 'axios'
import styled from 'styled-components'
import PendingAppointment from './PendingAppointment'
import { Redirect } from 'react-router-dom'


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
        const res = await axios.get(`/api/stylists/12`)
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
        const res = await axios.patch(`/api/stylists/12`, payload)
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
        const res = await axios.patch(`/api/stylists/12`, payload)
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
                        <button onClick={this.onClick}>Stop Making Money</button>
                        :
                        <button onClick={this.onClick}>Ready to Cut</button>

                }
                <div>
                    <TextArea
                        onSubmit={this.handleSubmit}
                        onChange={this.handleChange}
                        name="description"
                        cols="62"
                        rows="22"
                        value={this.state.stylist.description}>
                    </TextArea>
                </div>
                
                <button onClick={this.handleSubmit}>Submit</button>

                <h2>Pending Appointments</h2>

                <PendingAppointment
                    stylist={this.state.appointments}
                />

            </div>
        );
    }
}

export default StylistProfilePage;