import React from "react";
import MyInput from "../UI/MyInput";
import { Form, Button, InputGroup } from 'react-bootstrap'; 
import { GiConfirmed } from "react-icons/gi";

const NicknameInput = ({value, handleEditEnd, onChange, onBlur}) => {

    return(
        <InputGroup className="mb-2">
            <Form.Control
                type="text"
                value={value}
                placeholder={value}
                autoComplete="off"
                autoFocus
                onChange={onChange}
                onBlur={onBlur}
            />
            {/* elements for password visibly */}
            <span className="input-group-text" onClick={handleEditEnd}>
                <GiConfirmed onClick={handleEditEnd} />
            </span>
            
            
        </InputGroup>
    )
}

export default NicknameInput