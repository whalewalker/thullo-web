import React, {useState} from 'react';
import { Controller } from "react-hook-form";
import {FaEye, FaEyeSlash} from "react-icons/fa";

const CustomInput = (props: any) => {
    const [visible, setVisible] = useState(false);

    const displayPassword = (): void => {
        setVisible(!visible);
    }

    return (
        <Controller
            control={props.control}
            name={props.name}
            rules={{...props.validation}}

            render={({
                field: {value, onChange},
                fieldState: { error },

            }) => {
                return(
                    <div className="flex flex-col mb-3.5">
                        <div className="flex relative w-full">
                            <input
                                type={
                                    props.type === "password" ?
                                        visible ? "text" : "password"
                                        : props.type
                                }
                                placeholder={props.placeholder}
                                value={value}
                                onChange={onChange}
                                className={`border py-2 pl-11 pr-3 w-full rounded-lg outline-0 ${error ? "text-color-red border-color-red"
                                    : "border-color-border text-text-p-color"}`}
                            />
                            {props.icon}
                            {
                                props.type === "password" ?
                                    visible ?
                                        <FaEyeSlash className="absolute w-5 h-5 top-2.5 right-2.5 text-color-border cursor-pointer"
                                                    onClick={displayPassword}
                                        /> :
                                        <FaEye className="absolute w-5 h-5 top-2.5 right-2.5 text-color-border cursor-pointer"
                                               onClick={displayPassword}
                                        />
                                    : null
                            }

                        </div>
                        <small className="text-color-red pt-1">
                            {error && error.message}
                        </small>
                    </div>
                )
            }
        }
        />
    );
};

{/*{...props.register(props.name, props.validation)}*/}

export default CustomInput;