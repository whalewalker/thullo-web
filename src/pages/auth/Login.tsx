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
import ReactLoading from "react-loading";

const Login = () => {
    const dispatchFn = useAppDispatch();
    const isLoading: boolean = useAppSelector((state: any) => state.auth.isLoading);


    const LoginForm = () => {
        type FormData = {
            email: string;
            password: string;
        };

        const {
            register,
            handleSubmit,
            formState: {errors},
        } = useForm<FormData>({
            defaultValues: {
                email: "",
                password: "",
            },
        });



        const onSubmit: SubmitHandler<FormData> = (data) => {
            dispatchFn(login(data, ()=> {}));
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
                    className={` ${!isLoading && "py-2"} flex justify-center items-center bg-color-btn text-color-white w-full border border-color-btn rounded-lg ${!isLoading && "hover:bg-color-white hover:text-color-btn transition-all duration-300 ease-in"} ${isLoading && "opacity-75"}`}
                >
                    {isLoading && (
                        <ReactLoading type="bubbles" color="#fff" width={40} height={40}/>
                    )}
                    {isLoading ? "" : "Login"}
                </button>

            </form>
        );
    };

  return (
    <FormCard>
      <AuthSection />
      <LoginForm />
      <Link to={"/forgot-password"} className="mt-1 block text-color-btn text-sm text-right">
        Forgot password?
      </Link>
      <p className=" text-sm mt-2.5 text-center md:mt-6 xl:mt-4">
        Not a member?
        <Link to="/sign-up" className="text-color-btn ml-1">
          Create an account
        </Link>
      </p>
    </FormCard>
  );
};

export default Login;
