import React, { Component } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

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
                {this.state.stylists.map((stylist) => {
                    return (
                        <Link key={stylist.id} to={`stylists/${stylist.id}`}>
                            <h3>{stylist.name}</h3>
                        </Link>
                    )
                })}

            </div>
        );
    }
}

export default AllActiveStylists;