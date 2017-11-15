import React from 'react';

const Comments = (props) => {
    return (
        <div>
            {props.comments.map((comment) => {
                return (
                    <h5 key={comment.id}>{comment.description}</h5>
                )
            })}
            <textarea 
                onChange={props.handleChange}
                onSubmit={props.handleSubmit}
                name="description"
                value={props.comments.description}
                cols="15"
                rows="1">
            </textarea>
            <br />
            <button>Message</button>
            <button onClick={props.handleSubmit}>Submit</button>
        </div>
    );
};

export default Comments;