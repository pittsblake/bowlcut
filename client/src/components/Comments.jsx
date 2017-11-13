import React from 'react';

const Comments = (props) => {
    return (
        <div>
            <textarea onChange={props.handleChange} name="" id="" cols="100" rows="20"></textarea>
            <br/>
            <button>Message</button>
        </div>
    );
};

export default Comments;