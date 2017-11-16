import React, { Component } from 'react';
import axios from 'axios'
import { Link, Redirect } from 'react-router-dom'
import styled from 'styled-components'
import StylistShowPage from './StylistShowPage'


const NavBar = styled.div`
    display: flex;
    justify-content: flex-end;
    padding: 10px;
    margin-right: 10px
`

const BackgroundImage = styled.div`
    background-image: url("https://i.imgur.com/TiEuMyG.jpg");
    background-repeat:no-repeat;
    background-size:cover;
    background-position:center;
    height: 100vh;
    width: 100%;
    opacity: 0.7;
`

const AllStylist = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    background-color: white;
    margin: 150px auto;
    height: 450px;
    z-index: auto
`
const Button = styled.button`
    text-decoration: none;
    border: none
`
const CenterStylistName = styled.div`
    display: flex;
    justify-content: center;
    font-family: 'Josefin Sans', sans-serif
`
const StylistContainer = styled.div`
    
`
const Image = styled.img`
    height: 40vh;
    max-width: 35vw;
    &:hover {
        height: 45vh;
        box-shadow: 2px 4px 5px grey; 
        cursor: grab;
    }
    &:active {
        cursor: grabbing;
    }
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
        const res = await axios.get(`/api/users/9`)
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
        if (this.state.redirectToAppointmentPage) {
            return <Redirect to={`/appointment/${this.state.appointment.id}`} />
        }
        return (
            <BackgroundImage>
                <NavBar>
                    <Link to="/user/9"> Profile </Link>
                </NavBar>
                <AllStylist>
                    {this.state.activeStylists.map((stylist) => {
                        return (
                            <div>
                                <Button key={stylist.id} onClick={() => this.getStylist(stylist.id)}>
                                    <Image src={stylist.image} alt="Stylist Pic" />
                                </Button>
                                <CenterStylistName>
                                    <h1>{stylist.name}</h1>
                                </CenterStylistName>

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
            </BackgroundImage>
        );
    }
}

export default AllActiveStylists;