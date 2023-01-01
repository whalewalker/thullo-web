import AuthSection from "../../components/AuthSection";
import {SubmitHandler, useForm} from "react-hook-form";
import InputComponent from "../../components/InputComponent";
import {registrationOption} from "../../utils/formValidation";
import {AiOutlineMail} from "react-icons/ai";
import {IoMdLock} from "react-icons/io";
import FormCard from "../../components/FormCard";
import React from "react";
import {Link} from "react-router-dom"
import {useAppDispatch, useAppSelector} from "../../hooks/customHook";
import {login} from "../../actions/authAction";

const Login = () => {
    const dispatchFn = useAppDispatch();
    const isLoading  = useAppSelector((state: any) => state.auth.isLoading);
    const errorMsg = useAppSelector((state: any) => state.auth.errorMsg);
    const error = useAppSelector((state: any) => state.auth.error);

    const LoginForm = () => {
        type FormData = {
            email: string;
            password: string;
        };

        const {
            register,
            handleSubmit,
            reset,
            formState: {errors},
        } = useForm<FormData>({
            defaultValues: {
                email: "",
                password: "",
            },
        });

        const onSubmit: SubmitHandler<FormData> = (data) => {
            dispatchFn(login(data));
            reset({
                email: "",
                password: "",
            });
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
                <InputComponent
                    placeholder={"Password"}
                    type={"password"}
                    register={register}
                    error={errors}
                    name={"password"}
                    validation={registrationOption.password}
                    icon={
                        <IoMdLock className="absolute w-5 h-5 top-2.5 left-2.5 text-color-border"/>
                    }
                />
                <button
                    disabled={isLoading}
                    type="submit"
                    className="bg-color-btn text-color-white w-full py-2 border border-color-btn rounded-lg hover:bg-color-white hover:text-color-btn transition-all duration-300 ease-in"
                >
                    {isLoading && <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24"/>}
                    {isLoading ? "Loading..." : "Get started coding"}
                </button>

            </form>
        );
    };

    return (
        <FormCard>
            <AuthSection/>
            <LoginForm/>
            <p className="mt-2.5 text-center md:mt-6 xl:mt-4">Not a member?
                <Link to="/sign-up" className="text-color-btn ml-1">
                    Create an account
                </Link>
            </p>
        </FormCard>
    );
};

export default Login;
