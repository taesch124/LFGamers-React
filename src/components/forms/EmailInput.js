import React from 'react';

function EmailInput(props) {
    return (
        <div>
            <div className="input-field col s12">
                <input placeholder="Enter email (optional)" id="email" name="email" type="email" onChange={props.onChange}/>
                <label htmlFor="email" className="active">E-mail</label>
                <span className="helper-text" ref={input => props.emailValidation = input}></span>
            </div>
        </div>
    );
}

export default EmailInput;