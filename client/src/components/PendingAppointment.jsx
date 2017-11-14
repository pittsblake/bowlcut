import React from 'react';
import { Link } from 'react-router-dom'

const PendingAppointment = (props) => {
    return (
        <div>
            {props.stylist.map((appointment) => {
                return (
                    <div>
                        <Link to={`/appointment/${appointment.id}`}> {appointment.start_time} </Link>
                    </div>
                )
            })}
        </div>
    );
};

export default PendingAppointment;