import React from "react";
import FormCard from "../../components/FormCard";
import InputComponent from "../../components/InputComponent";
import { SubmitHandler, useForm } from "react-hook-form";
import { registrationOption } from "../../utils/formValidation";
import { AiOutlineMail } from "react-icons/ai";
import thulloLogo from "../../asset/img/thullo-logo.png";
import { useAppDispatch, useAppSelector } from "../../hooks/customHook";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const dispatchFn = useAppDispatch();
  const isLoading = useAppSelector((state: any) => state.auth.isLoading);
  const errorMsg = useAppSelector((state: any) => state.auth.errorMsg);
  const error = useAppSelector((state: any) => state.auth.error);

  const navigate: Function = useNavigate();

  const ForgotPasswordForm = () => {
    type FormData = {
      email: string;
    };

    const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm<FormData>({
      defaultValues: {
        email: "",
      },
    });

    const onSubmit: SubmitHandler<FormData> = (data) => {
      navigate("/reset-password");
      reset({
        email: "",
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
            <AiOutlineMail className="absolute w-5 h-5 top-2.5 left-2.5 text-color-border" />
          }
        />
        <button
          //   disabled={isLoading}
          type="submit"
          className="bg-color-btn text-color-white w-full py-2 border border-color-btn rounded-lg hover:bg-color-white hover:text-color-btn transition-all duration-300 ease-in"
        >
          {isLoading && (
            <svg
              className="animate-spin h-5 w-5 mr-3 ..."
              viewBox="0 0 24 24"
            />
          )}
          {isLoading ? "Loading..." : "Get password"}
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
      <ForgotPasswordForm />
    </FormCard>
  );
};
export default ForgotPassword;
