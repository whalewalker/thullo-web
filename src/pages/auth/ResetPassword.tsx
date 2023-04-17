import React from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks/customHook";
import {useNavigate} from "react-router-dom";
import {SubmitHandler, useForm} from "react-hook-form";
import {resetPassword} from "../../actions/authAction";
import Input from "../../components/Input";
import {registrationOption} from "../../utils/formValidation";
import {IoMdLock} from "react-icons/io";

import FormCard from "../../components/FormCard";
import thulloLogo from "../../asset/img/thullo-logo.png";
import {yupResolver} from '@hookform/resolvers/yup'
import * as Yup from 'yup';
import ReactLoading from "react-loading";


const ResetPassword = () => {
    const dispatchFn = useAppDispatch();
    const isLoading = useAppSelector((state: any) => state.auth.isLoading);
    const token = useAppSelector((state: any) => state.auth.data);

    const navigate: Function = useNavigate();

    const ResetPasswordForm = () => {
        type FormData = {
            password: string;
            confirmPassword: string;
        };

        const formSchema = Yup.object().shape({
            password: Yup.string()
                .required(registrationOption.password.required)
                .min(registrationOption.password.minLength.value, registrationOption.password.minLength.message)
                .max(registrationOption.password.maxLength.value, registrationOption.password.maxLength.message),
            confirmPassword: Yup.string()
                .required(registrationOption.password.required)
                .min(registrationOption.password.minLength.value, registrationOption.password.minLength.message)
                .max(registrationOption.password.maxLength.value, registrationOption.password.maxLength.message)
                .oneOf([Yup.ref('password')], 'Passwords does not match'),
        })

        const formOptions = {resolver: yupResolver(formSchema)}

        const {
            register,
            handleSubmit,
            reset,
            formState: {errors},
            getValues
        } = useForm<FormData>(formOptions);


        const onSubmit: SubmitHandler<FormData> = (data) => {

            dispatchFn(resetPassword({"password": data.password, token}, () => {
                reset({
                    password: "",
                    confirmPassword: ""
                });
                navigate("/login");
            }))
        };



        return (
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <Input
                    placeholder={"New Password"}
                    type={"password"}
                    register={register}
                    error={errors}
                    name={"password"}
                    validation={registrationOption.password}
                    icon={
                        <IoMdLock className="absolute w-5 h-5 top-2.5 left-2.5 text-color-border"/>
                    }

                />
                <Input
                    placeholder={"Confirm Password"}
                    type={"password"}
                    register={register}
                    error={errors}
                    name={"confirmPassword"}
                    validation={registrationOption.password}
                    validate={(val: any) => {
                        const {password} = getValues();
                        return password === val || "Passwords should match!";
                    }}
                    icon={
                        <IoMdLock className="absolute w-5 h-5 top-2.5 left-2.5 text-color-border"/>
                    }
                />

                <button
                    disabled={isLoading}
                    type="submit"
                    className={` ${!isLoading && "py-2"} flex justify-center items-center bg-color-btn text-color-white w-full border border-color-btn rounded-lg ${!isLoading && "hover:bg-color-white hover:text-color-btn transition-all duration-300 ease-in"} ${isLoading && "opacity-75"}`}
                >
                    {isLoading && (
                        <ReactLoading type="bubbles" color="#fff" width={40} height={40}/>
                    )}
                    {isLoading ? "" : "Reset Password"}
                </button>
            </form>
        );
    };

    return (
        <FormCard>
            <img
                src={thulloLogo}
                alt="thullo-logo"
                className="w-24 pb-3 cursor-pointer"
            />
            <h2 className=" text-2xl mt-6 mb-1">Reset password</h2>
            <p className="mb-6">Please enter your new password to reset your password</p>
            <ResetPasswordForm/>
        </FormCard>
    );
};

export default ResetPassword;