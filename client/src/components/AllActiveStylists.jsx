import React, { Component } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import StylistShowPage from './StylistShowPage'

const AllStylist = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
`


class AllActiveStylists extends Component {

    state = {
        stylists: [],
        activeStylists: [],
        showStylistShowPage: false
    }

    async componentWillMount() {
        await this.getAllStylists()
        await this.getAllActiveStylists()
        await this.getStylist()
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

    getStylist = async () => {
        try {
            const { id } = this.props.match.params
            const res = await axios.get(`/api/stylists/${id}`)
            this.setState({ stylist: res.data })
        } catch (err) {
            console.log(err)
        }
    }

    onClick = async (event) => {
        await event.preventDefault();
        await this.setState({ showStylistShowPage: !this.state.showStylistShowPage })
        await this.getStylist()
    }

    render() {
        return (
            <div>
                <Link to="/user/17"> Profile </Link>

                <AllStylist>
                    {this.state.stylists.map((stylist) => {
                        return (
                            <div>
                                <button key={stylist.id} onClick={this.onClick}>
                                    {stylist.name}
                                </button>

                            </div>
                        )
                    })}
                </AllStylist>
                {
                    this.state.showStylistShowPage ? <StylistShowPage stylist={this.state.stylists} /> : null
                }
            </div>
        );
    }
}

export default AllActiveStylists;