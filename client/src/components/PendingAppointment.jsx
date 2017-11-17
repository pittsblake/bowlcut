import React from 'react';
import { Link } from 'react-router-dom'
import Moment from 'react-moment';

const PendingAppointment = (props) => {
    return (
        <div>
            {props.stylist.map((appointment) => {
                return (
                    <div>
                        {appointment.finish ?
                            null : 
                            <Link to={`/appointment/${appointment.id}`}> <Moment fromNow>{appointment.created_at}</Moment> </Link>
                        }
                    </div>
                )
            })}
        </div>
    );
};

export default PendingAppointment;