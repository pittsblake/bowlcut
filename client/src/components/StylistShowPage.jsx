import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

// const CardContainer = styled.div`
//   position: relative;
//   z-index: 1;
//   margin: 32px auto;
//   max-width: 720px;
//   height: 420px;
//   perspective: 1000px;
// `
// const Card = styled.div`
//   box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
//   transition: 0.3s;
//   border-radius: 5px;

// `

// const Image = styled.img`
//   max-width: 100px;
//   max-height: 100px;
// `


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
        <Card>
            <div>
                <div>

                    <button onClick={() => createAppointment()}>
                        Book it
                    </button>
                    
                    <img src={props.stylist.image} alt="Profile Picture" />
                    
                    <h1>{props.stylist.name}</h1>
                    <h3>{props.stylist.description}</h3>

                </div>
            </div>
        </Card>
    );
}

export default StylistShowPage;