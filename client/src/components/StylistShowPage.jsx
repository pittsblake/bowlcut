import React, { Component } from 'react';
import axios from 'axios'

class StylistShowPage extends Component {
    state = {
        stylist: {}
    }

    componentWillMount = async () => {
        this.getStylist()
    }

    getStylist = async () => {
        try {
            const { id } = this.props.match.params
            const res = await axios.get(`/api/stylists/${id}`)
            this.setState({ stylist: res.data })
        } catch (err) {
            console.log(err)
        }
    }


    render() {
        return (
            <div>
                <button>Book it</button>
                <h1>{this.state.stylist.name}</h1>
                <h3>{this.state.stylist.description}</h3>
            </div>
        );
    }
}

export default StylistShowPage;