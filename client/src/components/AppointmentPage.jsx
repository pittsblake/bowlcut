import React, { Component } from 'react';
import axios from 'axios'
import Comments from './Comments'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center
`

class AppointmentPage extends Component {
    state = {
        appointment: {
            finish: false
        },
        comments:[],
        comment: {},
        redirectToStylistProfile: false
    }

    componentWillMount = async () => {
        await this.getAppointment()
        await this.getComments()
    }

    getAppointment = async () => {
        try {
            const { id } = this.props.match.params
            const res = await axios.get(`/api/appointments/${id}`)
            console.log(res.data.start_time)
            const formattedResponse = {
                start_time: res.data.start_time,
                end_time: res.data.end_time,
                finish: res.data.finish    
            }
            this.setState({
                appointment: formattedResponse
            })
        } catch (err) {
            console.log(err)
        }
    }

    getComments = async () => {
        try {
            const { id } = this.props.match.params
            const res = await axios.get(`/api/appointments/${id}`)
            this.setState({
                comments: res.data.comments
            })
        } catch (err) {
            console.log(err)
        }
    }

    handleChange = (event) => {
        const attribute = event.target.name
        const updateComment = { ...this.state.comment }
        updateComment[attribute] = event.target.value
        this.setState({ comment: updateComment })
    }

    handleSubmit = async (event) => {
        event.preventDefault()
        const { id } = this.props.match.params
        const payload = {
            description: this.state.comment.description
        }
        const res = await axios.post(`/api/appointments/${id}/comments`, payload)
        this.setState({ 
            comments: res.data,
         })
         console.log(res.data)
    }

    // deleteAppointment = async (appointment) => {
    //     const { id } = this.props.match.params
    //     const res = await axios.delete(`/api/appointments/${id}`)
    //     this.setState({
    //         appointment: res.data
    //     })
    // } 

    updateFinishState = async (event) => {
        const { id } = this.props.match.params
        const payload ={
            finish: this.state.appointment.finish
        }
        const res = await axios.patch(`/api/appointments/${id}`, payload)
        console.log(res.data)
        // console.log(payload)
        this.setState({
            appointment: res.data,
            redirectToStylistProfile: true
        })
    }

    finishAppointment = () => {
        const appointment = {...this.state.appointment}
        appointment.finish = !this.state.appointment.finish
        this.setState({
            appointment: appointment    
        })
    }
   
    onClick = async (event) => {
        event.preventDefault()
        await this.finishAppointment();
        await this.updateFinishState(event)
    }

    render() {

        if(this.state.redirectToStylistProfile) {
            return <Redirect to={`/stylists`} />
        }

        return (
            <Container>
                <h1>Appointment Page</h1>
                <button onClick={this.onClick}>Finish</button>
                <Comments
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                    comments={this.state.comments}
                    comment={this.state.comment}
                />
                
            </Container>
        );
    }
}

export default AppointmentPage;