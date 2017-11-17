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
            <button onClick={props.handleSubmit}>Send</button>
        </div>
    );
};

export default Comments;