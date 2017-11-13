import React, { Component } from 'react';
import axios from 'axios'
import Comments from './Comments'

class AppointmentPage extends Component {
    state = {
        appointment: {},
        comments: []
    }

    componentWillMount = async () => {
        await this.getAppointment()
    }

    getAppointment = async () => {
        const res = await axios.get(`/api/users/4`)
        console.log(res.data.appointments)
        this.setState({
            
        })
    }

    handleChange = (event) => {
        const attribute = event.target.name 
        const updateComments = {...this.state.comments}
        updateComments[attribute] = event.target.value
        this.setState({ comments: updateComments })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const payload = {
            description: this.state.comments.description
        }
    }

    render() {
        return (
            <div>
                <h1>Appointment Page</h1>
                <Comments handleChange={this.handleChange}/>
            </div>
        );
    }
}

export default AppointmentPage;