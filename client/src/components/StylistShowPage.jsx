import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'


const StylistShowPage = (props) => {

    const createAppointment = async () => {
        const payload = {
            appointment: {
                user_id: props.user.id,
                stylist_id: props.stylist.id,
                start_time: new Date,
                end_time: '',
            }
        }
        try {
            const res = await axios.post(`/api/appointments`, payload)
            console.log(res.data)
            props.setAppointmentState(res.data)
        } catch (err) {
            console.log(err)
        }
    }

    
    return (
        <div>
            <button onClick={() => createAppointment()}>
                Book it
            </button>
            <h1>{props.stylist.name}</h1>
            <h3>{props.stylist.description}</h3>
        </div>
    );
}

export default StylistShowPage;