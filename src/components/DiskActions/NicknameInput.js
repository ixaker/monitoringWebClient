import React from "react";
import { Form, InputGroup } from "react-bootstrap";
import { BiCheck } from "react-icons/bi";

const NicknameInput = ({
  value,
  onChange,
  onBlur,
  handleEditEnd,
  onKeyDown,
}) => {
  return (
    <InputGroup className="">
      <Form.Control
        type="text"
        value={value}
        placeholder={value}
        autoComplete="off"
        autoFocus
        onChange={onChange}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        style={{
          fontWeight: 600,
          fontSize: 20,
          resize: "vertical",
        }}
      />
      {/* elements for password visibly */}
      <span className="input-group-text p-0" onClick={handleEditEnd}>
        <BiCheck onClick={handleEditEnd} size={30} color="green" />
      </span>
    </InputGroup>
  );
};

export default NicknameInput;
