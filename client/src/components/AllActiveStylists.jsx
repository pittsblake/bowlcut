import React, { Component } from 'react';
import axios from 'axios'
import { Link, Redirect } from 'react-router-dom'
import styled from 'styled-components'
import StylistShowPage from './StylistShowPage'
import Modal from 'react-modal'


const NavBar = styled.div`
    display: flex;
    justify-content: flex-end;
    padding: 10px;
    margin-right: 10px
`

const BackgroundImage = styled.div`
    background-repeat:no-repeat;
    background-size:cover;
    background-position:center;
    height: 100vh;
    width: 100%;    
    position: relative;

    &:after{
        content: '';
        background-image: url("https://i.imgur.com/TiEuMyG.jpg");
        background-size: cover;
        position:absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        opacity: 0.7;
        z-index: -1;
    }
`

const AllStylist = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    margin: 150px auto;
    height: 300px;
    background-color: rgba(255,255,255, .7);
    /* &:after {
        z-index: -1
    } */
`
const ButtonContainer = styled.div`
    margin: none;
    border: none;
`

const Button = styled.button`
    text-decoration: none;
    padding: 0;
    border: none;
    margin: none;
    background-color: rgba(255, 255, 255, .7)
`
const CenterStylistName = styled.div`
    display: flex;
    justify-content: center;
    font-family: 'Josefin Sans', sans-serif
`
const Image = styled.img`
    height: 25vh;
    max-width: 20vw;
    margin: none;
    border: none;
    z-index: 1;
    &:hover {
        height:27vh;
        max-width: 22vw;
        box-shadow: 2px 4px 5px grey; 
        cursor: grab;
    }
    &:active {
        cursor: grabbing;
    }
`

const ProfileButton = styled.button`
    text-decoration: none;
    background-color: #686569; 
    border: none;
    color: white;
    margin-right: 10px;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    opacity: 0.7;
    &:hover {
        box-shadow: 2px 4px 5px black; 
        cursor: grab;
    }
    a {
        text-decoration: none;
        color: white
    }
}
`

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    }
};


class AllActiveStylists extends Component {

    state = {
        stylists: [],
        stylist: {},
        user: {},
        activeStylists: [],
        appointment: {},
        showStylistShowPage: false,
        redirectToAppointmentPage: false,
        modalIsOpen: false
    }
    openModal = () => {
        this.setState({ modalIsOpen: true });
    }

    // afterOpenModal() {
    //     // references are now sync'd and can be accessed.
    //     this.subtitle.style.color = '#f00';
    // }

    closeModal = () => {
        this.setState({ modalIsOpen: false });
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
        const res = await axios.get(`/api/users/1`)
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

    onClick = (id) => {
        this.getStylist(id)
        this.openModal()
    }

    render() {
        if (this.state.redirectToAppointmentPage) {
            return <Redirect to={`/appointment/${this.state.appointment.id}`} />
        }
        return (
            <BackgroundImage>
                <NavBar>
                    <ProfileButton><a href="/user/1"> User Profile </a></ProfileButton>
                    <ProfileButton><a href="/stylist/1"> Stylist Profile </a></ProfileButton>
                </NavBar>
                <AllStylist>
                    {this.state.activeStylists.map((stylist) => {
                        return (
                            <ButtonContainer>
                                <Button key={stylist.id} onClick={() => this.onClick(stylist.id)}>
                                    <Image src={stylist.image} alt="Stylist Pic" />
                                </Button>
                                <CenterStylistName>
                                    <h1>{stylist.name}</h1>
                                </CenterStylistName>
                            </ButtonContainer>
                        )
                    })}
                </AllStylist>


                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Example Modal" >
                    {
                        this.state.showStylistShowPage ? <StylistShowPage
                            stylist={this.state.stylist.stylist}
                            user={this.state.user}
                            appointment={this.state.appointment}
                            setAppointmentState={this.setAppointmentState}
                        /> : null
                    }
                </Modal>
            </BackgroundImage>
        );
    }
}

export default AllActiveStylists;