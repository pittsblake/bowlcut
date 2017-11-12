import React, { Component } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import StylistProfilePage from '/StylistProfilePage'

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

    onClick = (event) => {
        event.preventDefault();
        this.setState({ showStylistShowPage: !this.state.showStylistShowPage})
    }

    render() {
        return (
            <div>
                <Link to="/user/17"> Profile </Link>

                <AllStylist>
                    {this.state.stylists.map((stylist) => {
                        return (

                            <Link key={stylist.id} to={`stylists/${stylist.id}`}>
                                <div>
                                    <h3>{stylist.name}</h3>
                                </div>
                            </Link>

                        )
                    })}
                </AllStylist>
            </div>
        );
    }
}

export default AllActiveStylists;