import AuthSection from "../../components/AuthSection";
import React from "react";
import FormCard from "../../components/FormCard";
import {SubmitHandler, useForm} from "react-hook-form";
import InputComponent from "../../components/Input";
import {registrationOption} from "../../utils/formValidation";
import {BsPersonCircle} from "react-icons/bs";
import {AiOutlineMail} from "react-icons/ai";
import {IoMdLock} from "react-icons/io";
import {Link} from "react-router-dom";
import {register as registerUser} from "../../actions/authAction";
import {useAppDispatch, useAppSelector} from "../../hooks/customHook";
import {useNavigate} from "react-router-dom";
import ReactLoading from "react-loading";


const SignUp = () => {
    const dispatchFn = useAppDispatch();
    const navigate = useNavigate()

    const isLoading: boolean = useAppSelector((state: any) => state.auth.isLoading);

    const SignUpForm = () => {
        type FormData = {
            name: string;
            email: string;
            password: string;
        };

        const {
            register,
            handleSubmit,
            formState: {errors},
        } = useForm<FormData>({
            defaultValues: {
                name: "",
                email: "",
                password: "",
            },
        });

        const onSubmit: SubmitHandler<FormData> = (data) => {
            dispatchFn(registerUser(data, () => {
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
                        <BsPersonCircle className="absolute w-5 h-5 top-2.5 left-2.5 text-color-border"/>
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
                    {isLoading ? "" : "Start coding now"}
                </button>

            </form>
        );
    }

    return (
        <FormCard>
            <AuthSection/>
            <SignUpForm/>

            <p className="text-sm mt-2.5 text-center md:mt-6 xl:mt-4">Already a member?
                <Link to="/login" className="text-color-btn ml-1">Login</Link>
            </p>
        </FormCard>
    );
}

export default SignUp;
