import React, { Component } from 'react';
import axios from 'axios'

class AllActiveStylists extends Component {

    state = {
        stylists: [],
        activeStylists: []
    }

    async componentWillMount() {
        await this.getAllStylists()
        await this.getAllActiveStylists()
    }

    getAllStylists = async () => {
        const res = await axios.get('/api/stylists')
        this.setState({ stylists: res.data })
    }

    getAllActiveStylists = () => {
        const stylists = this.state.stylists
        stylists.map((stylist) => {
            if (stylist.active === true) {
                this.setState({
                    activeStylists: stylist
                })
            }
        })
    }

    render() {
        return (
            <div>

            </div>
        );
    }
}

export default AllActiveStylists;