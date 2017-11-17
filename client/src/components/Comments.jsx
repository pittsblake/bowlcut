import React from 'react';
import styled from 'styled-components';

const Input = styled.input`
    outline: none;
    border: none;
    border-bottom: solid thin;
    font-size: 15px;
`
const Messages = styled.div`
    height:auto;
    min-height:30px;
    width: 300px;
    max-width: 500px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    padding: 10px;
    background-color: #f2f2f2;
    border-radius: 1%;
    box-shadow: 1px 2px 5px;
`
const MessageContainer = styled.div`
    background-color: #3333ff;
    height: auto;
    width: auto;
    min-width: 40px;
    border-radius: 12px 12px 0px 12px;
    margin-bottom: 5px;
    padding: 3px;
    display: flex;
    justify-content: flex-end;
    h5 {
        color: white;
        margin: none;
        padding: none
    }
`
const Button = styled.button`
    text-decoration: none;
    background-color: #686569; 
    border: none;
    color: white;
    padding: 10px 25px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    opacity: 0.7;
    margin-top: 6px;
    margin-right: 6px;
    margin-bottom: 2px;
    a {
        text-decoration: none;
        color: white
    }
    &:hover {
        box-shadow: 2px 4px 5px grey; 
        cursor: grab;
    }
}
`

const Comments = (props) => {
    return (
        <div>
            <Messages>
                {props.comments.map((comment) => {
                    return (
                        <MessageContainer>
                            <h5 key={comment.id}>{comment.description}</h5>
                        </MessageContainer>
                    )
                })}
            </Messages>
            <br/>
            <form onSubmit={props.handleSubmit}>
                <Input
                    onChange={props.handleChange}
                    onSubmit={props.handleSubmit}
                    name="description"
                    value={props.comments.description
                    }
                >
                </Input>
            </form>
            <br />
            <Button onClick={props.handleSubmit}>Send</Button>
        </div>
    );
};

export default Comments;