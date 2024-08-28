import React from "react";
import MyInput from "../UI/MyInput";
import { Form, Button, InputGroup } from 'react-bootstrap';
import { BiCheck } from 'react-icons/bi';

const NicknameInput = ({ value, handleEditEnd, onChange, onBlur, hadleKeyDown }) => {

    return (
        <InputGroup className="">
            <Form.Control
                type="text"
                value={value}
                placeholder={value}
                autoComplete="off"
                autoFocus
                onChange={onChange}
                onBlur={handleEditEnd}
                onKeyDown={hadleKeyDown}
                style={{
                    fontWeight: 600,
                    fontSize: 20,
                    resize: "vertical"
                }}
            />
            {/* elements for password visibly */}
            <span className="input-group-text p-0" onClick={handleEditEnd}>
                <BiCheck
                    onClick={handleEditEnd}
                    size={30}
                    color="green"
                />
            </span>


        </InputGroup>
    )
}

export default NicknameInput