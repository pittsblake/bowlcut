import React from 'react';
import { Link } from 'react-router-dom'

const PendingAppointment = (props) => {
    return (
        <div>
            {props.stylist.map((appointment) => {
                return (
                    <div>
                        {appointment.finish ?
                            <Link to={`/appointment/${appointment.id}`}> {appointment.start_time} </Link> : null
                        }
                    </div>
                )
            })}
        </div>
    );
};

export default PendingAppointment;