import React from 'react';
import { Link } from 'react-router-dom'
import NavBar from './NavBar'
import styled from 'styled-components'


const Image = styled.div`
  background-image: url("https://i.imgur.com/sNm9TYq.jpg");
  background-repeat:no-repeat;
  background-size:cover;
  background-position:center;
  height: 100vh;
  width: 100%;
  opacity: 0.7
`
const Logo = styled.h1`
    font-family: 'Josefin Sans', sans-serif;
    color: white;
    font-size: 7vw
`

const Contents = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    margin: 0 100px 0 0
`
const A = styled.a`

    text-decoration: none;
    color: white
`

const Links = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin: 0 auto
`

const Button = styled.button`
    text-decoration: none;
    background-color: #686569; 
    border: none;
    color: white;
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
}
`

const HomePage = () => {
    return (
        <Image>
            

            <br />
            <Contents>
                <div>
                <Logo>bowlcut</Logo>
                <Links>
                    <Button><A href='/stylists'>Get a Cut</A></Button> 
                    <Button><A href='/stylist/20'>Give a Cut</A></Button>
                </Links>
                </div>
            </Contents>
        </Image>
    );
};

export default HomePage;