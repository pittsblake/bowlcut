import React, { Component } from 'react';
import axios from 'axios'
import Comments from './Comments'
import { Redirect } from 'react-router-dom'


class AppointmentPage extends Component {
    state = {
        appointment: {},
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
            this.setState({
                appointment: res.data
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
    }

    deleteAppointment = async (appointment) => {
        const { id } = this.props.match.params
        const res = await axios.delete(`/api/appointments/${id}`)
        this.setState({
            appointment: res.data
        })
    } 

    render() {
        return (
            <div>
                <h1>Appointment Page</h1>
                <Comments
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                    comments={this.state.comments}
                    comment={this.state.comment}
                />
                <button>Finish</button>
            </div>
        );
    }
}

export default AppointmentPage;