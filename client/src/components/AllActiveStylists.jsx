import React, { Component } from 'react';
import axios from 'axios'
import { Link, Redirect } from 'react-router-dom'
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
        user: {},
        activeStylists: [],
        appointment: {},
        showStylistShowPage: false,
        redirectToAppointmentPage: false
    }

    async componentWillMount() {
        await this.getAllStylists()
        await this.getAllActiveStylists()
        this.getUser()
    }

    getAllStylists = async () => {
        const res = await axios.get('/api/stylists')
        this.setState({ stylists: res.data })
    }

    getAllActiveStylists = () => {
        const stylists = this.state.stylists
        const activeStylists = stylists.filter(stylist => stylist.active)
        this.setState({ activeStylists })
    }

    getUser = async () => {
        const res = await axios.get(`/api/users/4`)
        this.setState({
            user: res.data.user
        })
    }

    setAppointmentState = (appointment) => {
        console.log(appointment)
        this.setState({
            appointment: appointment,
            redirectToAppointmentPage: true
        })
    }

    getStylist = async (id) => {
        if (this.state.showStylistShowPage) {
            this.setState({ showStylistShowPage: !this.state.showStylistShowPage })
        }
        try {
            const stylistId = id
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
        if (this.state.redirectToAppointmentPage){
           return <Redirect to={`/appointment/${this.state.appointment.id}`} />
        }
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
                    this.state.showStylistShowPage ? <StylistShowPage
                        stylist={this.state.stylist.stylist}
                        user={this.state.user}
                        appointment={this.state.appointment}
                        setAppointmentState={this.setAppointmentState}
                    /> : null
                }
            </div>
        );
    }
}

export default AllActiveStylists;