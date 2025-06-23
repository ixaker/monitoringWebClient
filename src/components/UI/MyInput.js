import React, { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MyInput = ({
  value,
  onChange,
  isPasswordValid,
  placeholderText,
  errorMessage,
  autoFocus,
  onKeyDown,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <InputGroup className="mb-2">
      <Form.Control
        className={`form-control-lg disk-input ${
          isPasswordValid
            ? "is-valid"
            : isPasswordValid === false
            ? "is-invalid"
            : ""
        }`}
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholderText || "введіть пароль (не менше 8 символів)"}
        autoComplete="off"
        isValid={isPasswordValid === true}
        isInvalid={isPasswordValid === false}
        autoFocus={autoFocus}
        onKeyDown={onKeyDown}
      />
      {/* elements for password visibly */}
      <span
        className="input-group-text"
        onClick={() => setShowPassword(!showPassword)}
      >
        <FontAwesomeIcon
          icon={showPassword ? faEye : faEyeSlash}
          className="fa-lg"
        />
      </span>
      {/* Feedback for error message */}
      {errorMessage && (
        <Form.Control.Feedback type="invalid">
          {errorMessage}
        </Form.Control.Feedback>
      )}
    </InputGroup>
  );
};

export default MyInput;
