import React from "react";
import FormCard from "../../components/FormCard";
import InputComponent from "../../components/Input";
import {SubmitHandler, useForm} from "react-hook-form";
import {registrationOption} from "../../utils/formValidation";
import {AiOutlineMail} from "react-icons/ai";
import thulloLogo from "../../asset/img/thullo-logo.png";
import {useAppDispatch, useAppSelector} from "../../hooks/customHook";
import {useNavigate} from "react-router-dom";
import {forgetPassword} from "../../actions/authAction";
import ReactLoading from "react-loading";

const ForgotPassword = () => {
    const dispatchFn = useAppDispatch();
    const isLoading = useAppSelector((state: any) => state.auth.isLoading);


    const navigate: Function = useNavigate();

    const ForgotPasswordForm = () => {
        type FormData = {
            email: string;
        };

        const {
            register,
            handleSubmit,
            reset,
            formState: {errors},
        } = useForm<FormData>({
            defaultValues: {
                email: "",
            },
        });

        const onSubmit: SubmitHandler<FormData> = (data) => {
            dispatchFn(forgetPassword(data.email, () => {
                reset({
                    email: "",
                });
                navigate("/reset-password");
            }))
        };

        return (
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <InputComponent
                    placeholder={"Email"}
                    type={"email"}
                    register={register}
                    error={errors}
                    name={"email"}
                    validation={registrationOption.email}
                    icon={
                        <AiOutlineMail className="absolute w-5 h-5 top-2.5 left-2.5 text-color-border"/>
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
                    {isLoading ? "" : "Restore"}
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
            <h2 className=" text-2xl mt-6 mb-1">Forgot password</h2>
            <p className="mb-6">Please enter your email to set a new password</p>
            <ForgotPasswordForm/>
        </FormCard>
    );
};
export default ForgotPassword;
