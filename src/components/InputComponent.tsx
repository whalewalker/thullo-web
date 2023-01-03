import React, {useState} from "react";
import {FaEye, FaEyeSlash} from "react-icons/fa";


const InputComponent: React.FC<any> = (props) => {
    const [visible, setVisible] = useState(false);

    const displayPassword = (): void => {
        setVisible(!visible);
    }


    let error = props.error[props.name] && props.error[props.name].message
        ? "text-color-red border-color-red"
        : "border-color-border text-text-p-color";

    return (
        <div className="flex flex-col mb-3.5">
            <div className="flex relative w-full">
                <input
                    type={
                        props.type === "password" ?
                            visible ? "text" : "password"
                            : props.type
                    }
                    placeholder={props.placeholder}
                    {...props.register(props.name, props.validation)}
                    className={`border  py-2 pl-11 pr-3 w-full rounded-lg outline-0 ${error}`}
                />
                {props.icon}
                {
                    props.type === "password" ?
                        visible ?
                            <FaEye className="absolute w-5 h-5 top-2.5 right-2.5 text-color-border cursor-pointer"
                                   onClick={displayPassword}
                            /> : <FaEyeSlash className="absolute w-5 h-5 top-2.5 right-2.5 text-color-border cursor-pointer"
                                        onClick={displayPassword}
                            />
                        : null
                }

            </div>
            <small className="text-color-red pt-1">
                {props.error[props.name] && props.error[props.name].message}
            </small>
        </div>
    );
};

export default InputComponent;
