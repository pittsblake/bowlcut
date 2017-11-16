import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'

// const CardContainer = styled.div`
//   position: relative;
//   z-index: 1;
//   margin: 32px auto;
//   max-width: 720px;
//   height: 420px;
//   perspective: 1000px;
// `
const Card = styled.div`
  width: 500px;
  border: 1px solid gray;
  box-shadow: 1px 1px 3px #888;
  min-height: 250px;
  padding-: 10px;
  margin: 10px;
`
const MainBox = styled.div`
  font-family: calibri;
  box-sizing: border-box;
  justify-content: center;
  display: flex;
  flex-wrap: wrap;
`

const Picture = styled.img`
  max-width: 300px;
  max-height: 300px;
`

const BioBox = styled.div`
    border: 1px solid black;
    width: 450px;
    border-radius: 5%;
    padding: 10px
`
const CenterItemsOnCard = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center
`
const ButtonOnRightSideOfCard = styled.div`
    width: 500px;
    display: flex;
    justify-content: flex-end
`


const StylistShowPage = (props) => {

    const createAppointment = async () => {
        const payload = {
            appointment: {
                user_id: props.user.id,
                stylist_id: props.stylist.id,
                start_time: new Date,
                end_time: '',
            }
        }
        try {
            const res = await axios.post(`/api/appointments`, payload)
            console.log(res.data)
            props.setAppointmentState(res.data)
        } catch (err) {
            console.log(err)
        }
    }


    return (
        <MainBox>
            <Card>

                <CenterItemsOnCard>
                    <ButtonOnRightSideOfCard>
                        <button onClick={() => createAppointment()}> Book it </button>
                    </ButtonOnRightSideOfCard>
                    <Picture src={props.stylist.image} alt="Profile Picture" />

                    <h1>{props.stylist.name}</h1>
                    <BioBox>
                        <p>{props.stylist.description}</p>
                    </BioBox>
                </CenterItemsOnCard>

            </Card>
        </MainBox>
    );
}

export default StylistShowPage;