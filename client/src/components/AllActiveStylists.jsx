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
        stylist: {},
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
        const activeStylists = stylists.filter(stylist => stylist.active)
        this.setState({activeStylists})
    }

    getStylist = async (id) => {
        if (this.state.showStylistShowPage) {
            this.setState({showStylistShowPage: !this.state.showStylistShowPage})
        }
        try {
            const stylistId = id
            console.log(id)
            const res = await axios.get(`/api/stylists/${stylistId}`)
            this.setState({ 
                stylist: res.data,
                showStylistShowPage: !this.state.showStylistShowPage          
            })
        } catch (err) {
            console.log(err)
        }
    }

    render() {
        return (
            <div>
                <Link to="/user/17"> Profile </Link>

                <AllStylist>
                    {this.state.activeStylists.map((stylist) => {
                        return (
                            <div>
                                <button key={stylist.id} onClick={() => this.getStylist(stylist.id)}>
                                    {stylist.name}
                                </button>

                            </div>
                        )
                    })}
                </AllStylist>
                {
                    this.state.showStylistShowPage ? <StylistShowPage stylist={this.state.stylist} /> : null
                }
            </div>
        );
    }
}

export default AllActiveStylists;