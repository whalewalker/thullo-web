import AuthSection from "../../components/AuthSection";
import React from "react";
import FormCard from "../../components/FormCard";
import {SubmitHandler, useForm} from "react-hook-form";
import InputComponent from "../../components/InputComponent";
import {registrationOption} from "../../utils/formValidation";
import {BsPersonCircle} from "react-icons/bs";
import {AiOutlineMail} from "react-icons/ai";
import {IoMdLock} from "react-icons/io";
import {Link} from "react-router-dom";
import {register as registerUser} from "../../actions/authAction";
import {useAppDispatch, useAppSelector} from "../../hooks/customHook";
import {useNavigate} from "react-router-dom";


const SignUp = () => {
    const dispatchFn = useAppDispatch();
    const navigate = useNavigate()

    const isLoading: boolean = useAppSelector((state: any) => state.auth.isLoading);
    const errorMsg: string = useAppSelector((state: any) => state.auth.errorMsg);
    const error: boolean = useAppSelector((state: any) => state.auth.error);

    const SignUpForm = () => {
        type FormData = {
            name: string;
            email: string;
            password: string;
        };

        const {
            register,
            handleSubmit,
            reset,
            formState: { errors },
        } = useForm<FormData>({
            defaultValues: {
                name: "",
                email: "",
                password: "",
            },
        });

        const onSubmit: SubmitHandler<FormData> = (data) => {
            dispatchFn(registerUser(data, ()=> {
                reset({
                    name: "",
                    email: "",
                    password: "",
                });
                navigate("/login")
            }));
        };

        return (
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <InputComponent
                    placeholder={"Full name"}
                    type={"text"}
                    register={register}
                    error={errors}
                    name={"name"}
                    validation={registrationOption.name}
                    icon={
                        <BsPersonCircle className="absolute w-5 h-5 top-2.5 left-2.5 text-color-border" />
                    }
                />
                <InputComponent
                    placeholder={"Email"}
                    type={"email"}
                    register={register}
                    error={errors}
                    name={"email"}
                    validation={registrationOption.email}
                    icon={
                        <AiOutlineMail className="absolute w-5 h-5 top-2.5 left-2.5 text-color-border" />
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
                        <IoMdLock className="absolute w-5 h-5 top-2.5 left-2.5 text-color-border" />
                    }
                />
                <button
                    disabled={isLoading}
                    type="submit"
                    className="flex justify-center items-center bg-color-btn text-color-white w-full py-2 border border-color-btn rounded-lg hover:bg-color-white hover:text-color-btn transition-all duration-300 ease-in"
                >
                    {isLoading && <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24"/>}
                    {isLoading ? "Loading..." : "Start coding now"}
                </button>

            </form>
        );
    }

  return (
      <FormCard>
          <AuthSection/>
          <SignUpForm/>

          <p className="mt-2.5 text-center md:mt-6 xl:mt-4">Already a member?
              <Link to="/login" className="text-color-btn ml-1">Login</Link>
          </p>
      </FormCard>
  );
}

export default SignUp;
