import React, { Component } from 'react';
import axios from 'axios'
import styled from 'styled-components'

class StylistProfilePage extends Component {
    state = {
        stylist: {
            active: ''
        }
    }

    componentWillMount = async () => {
        this.getStylist()
    }

    getStylist = async () => {
        const res = await axios.get(`/api/stylists/13`)
        this.setState({ stylist: res.data })
    }

    handleChange = (event) => {
        const attribute = event.target.name
        const updateStylist = { ...this.state.stylist }
        updateStylist[attribute] = event.target.value
        this.setState({ stylist: updateStylist })
    }

    handleSubmit = async (event) => {
        event.preventDefault()
        const payload = {
            description: this.state.stylist.description,
        }
        const res = await axios.patch(`/api/stylists/13`, payload)
        console.log(res.data)
        await this.setState({ stylist: res.data })
    }

    toggleIsActive = () => {
        const updateStylist = { ...this.state.stylist }
        updateStylist.active = !this.state.stylist.active
        this.setState({
            stylist: updateStylist
        })
    }

    updateActiveStatus = async (event) => {
        event.preventDefault()
        const payload = {
            active: this.state.stylist.active
        }
        const res = await axios.patch(`/api/stylists/13`, payload)
        await this.setState({stylist: res.data})
    }

    onClick = async (event) => {
            await this.toggleIsActive();
            await this.updateActiveStatus(event)
        }

    render() {

        return (
            <div>
                <img src={this.state.stylist.image} alt="Profile picture" />
                <h2>{this.state.stylist.name}</h2>
                
                {
                    this.state.stylist.active ?
                    <h3>Status: active</h3>
                    :
                    <h3>Status: inactive</h3>
                }
                {
                    this.state.stylist.active ? 
                    <button onClick={this.onClick}>Stop Making Money</button>
                    : 
                    <button onClick={this.onClick}>Ready to Cut</button>

                }
                <div>
                    <textarea
                        onSubmit={this.handleSubmit}
                        onChange={this.handleChange}
                        name="description"
                        cols="100"
                        rows="10"
                        value={this.state.stylist.description}>
                    </textarea>
                </div>
                <button>Edit</button>
                <button onClick={this.handleSubmit}>Submit</button>

            </div>
        );
    }
}

export default StylistProfilePage;