import React, { Component } from 'react';
import axios from 'axios'
import styled from 'styled-components'
import PendingAppointment from './PendingAppointment'
import { Redirect } from 'react-router-dom'


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
        const res = await axios.get(`/api/stylists/5`)
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
        const res = await axios.patch(`/api/stylists/5`, payload)
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
        const res = await axios.patch(`/api/stylists/5`, payload)
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
        );
    }
}

export default StylistProfilePage;