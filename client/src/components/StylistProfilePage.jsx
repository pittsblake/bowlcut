import React, { Component } from 'react';
import axios from 'axios'

class StylistProfilePage extends Component {
    state={
        stylist: {}
    }

    componentWillMount = async () => {
        this.getStylist()
    }

    getStylist = async () => {
        const res = await axios.get(`/api/stylists/13`)

        this.setState({ stylist: res.data })
    }

    render() {
        return (
            <div>
                <img src={this.state.stylist.image} alt="Profile picture"/>
                <h2>{this.state.stylist.name}</h2>
                <h3>{this.state.stylist.description}</h3>
            </div>
        );
    }
}

export default StylistProfilePage;