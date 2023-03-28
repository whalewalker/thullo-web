import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const InputComponent: React.FC<any> = (props) => {
  const [visible, setVisible] = useState(false);

  const displayPassword = (): void => {
    setVisible(!visible);
  };

  let error =
    props.error[props.name] && props.error[props.name].message
      ? "text-color-red border-color-red"
      : "border-color-border text-text-p-color";

  return (
    <div className={`flex flex-col ${props.my ? props.my : "my-4"} `}>
      {props.label && (
        <label htmlFor={props.name} className="capitalize font-thin">
          {props.label}
        </label>
      )}
      <div className="flex relative w-full">
        <input
          autoFocus={props.autoFocus}
          disabled={props.disabled}
          type={
            props.type === "password"
              ? visible
                ? "text"
                : "password"
              : props.type
          }
          placeholder={props.placeholder}
          {...props.register(props.name, props.validation)}
          className={`${props.border ? "" : "border"} py-2 relative ${
            props.pl ? props.pl : "pl-11"
          } pr-3 ${props.width ? props.width : "w-full"} 
          ${props.height && props.height} 
          ${props.shadow && props.shadow}
          
           rounded-lg outline-0 ${error} md:w-full`}
        />
        {props.icon}
        {props.type === "password" ? (
          visible ? (
            <FaEye
              className="absolute w-5 h-5 top-2.5 right-2.5 text-color-border cursor-pointer"
              onClick={displayPassword}
            />
          ) : (
            <FaEyeSlash
              className="absolute w-5 h-5 top-2.5 right-2.5 text-color-border cursor-pointer"
              onClick={displayPassword}
            />
          )
        ) : null}
      </div>
      {props.error && (
        <small
          className={`text-color-red ${
            props.name === "columnName" ? "" : "pt-1"
          }`}
        >
          {props.error[props.name] && props.error[props.name].message}
        </small>
      )}
    </div>
  );
};

InputComponent.defaultProps = {
  autoFocus: false,
};

export default InputComponent;
