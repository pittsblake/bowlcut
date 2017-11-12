import React, { Component } from 'react';
import { Link } from 'react-router-dom'

const StylistShowPage = (props) => {
    return (
        <div>
            <a href="#">Book it</a>
            <h1>{props.stylist.name}</h1>
            <h3>{props.stylist.description}</h3>
        </div>
    );
}

export default StylistShowPage;