import React from 'react';
import { Link } from 'react-router-dom'
import NavBar from './NavBar'

const HomePage = () => {
    return (
        <div>
            <NavBar />

            <br />

            <h1>BowlCut</h1>
            <Link to='/stylists'>Get a Cut</Link>
            <br />
            <Link to='#'>Give a Cut</Link>
        </div>
    );
};

export default HomePage;