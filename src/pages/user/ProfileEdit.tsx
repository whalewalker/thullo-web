import React, { useState } from "react";
import profileImage from "../../asset/img/profile.png"
import FormCard from "../../components/FormCard"
import InputComponent from "../../components/InputComponent"
import { SubmitHandler, useForm } from "react-hook-form";
import { registrationOption } from "../../utils/formValidation";
import ReactLoading from "react-loading";
import { useAppSelector } from "../../hooks/customHook";
import {fileHandler} from "../../utils/helperFn"

const ProfileEdit = () => {
  const isLoading: boolean = useAppSelector(
    (state: any) => state.auth.isLoading
  );
  const [profileImg, setProfileImg] = useState(profileImage);

  const ProfileForm = () => {
    type FormData = {
      name: string;
      bio: string;
      phone: string;
      email: string;
      password: string;
    };

    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<FormData>({
      defaultValues: {
        name: "",
        bio: "",
        phone: "",
        email: "",
        password: "",
      },
    });

    const onSubmit: SubmitHandler<FormData> = (data) => {
      console.log(data);
    };

    return (
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <InputComponent
          width="w-3/5"
          pl="pl-4"
          label="name"
          placeholder="Enter your name..."
          type="name"
          register={register}
          error={errors}
          name="name"
          validation={registrationOption.name}
        />
        <InputComponent
          height="pb-12"
          width="w-3/5"
          pl="pl-4"
          label="bio"
          placeholder="Enter your bio..."
          type="text"
          register={register}
          error={errors}
          name="bio"
        />
        <InputComponent
          width="w-3/5"
          pl="pl-4"
          label="phone"
          placeholder="Enter your phone..."
          type="text"
          register={register}
          error={errors}
          name="phone"
        />
        <InputComponent
          width="w-3/5"
          pl="pl-4"
          label="email"
          placeholder="Enter your email... "
          type="email"
          register={register}
          error={errors}
          name="email"
          validation={registrationOption.email}
        />
        <InputComponent
          width="w-3/5"
          pl="pl-4"
          label="password"
          placeholder="Enter your password..."
          type="text"
          register={register}
          error={errors}
          name="password"
          validation={registrationOption.password}
        />
        <button
          disabled={isLoading}
          type="submit"
          className={` ${
            !isLoading && "py-2"
          } flex justify-center items-center bg-color-btn text-color-white w-20 border border-color-btn rounded-lg ${
            !isLoading &&
            "hover:bg-color-white hover:text-color-btn transition-all duration-300 ease-in"
          } ${isLoading && "opacity-75"}`}
        >
          {isLoading && (
            <ReactLoading type="bubbles" color="#fff" width={40} height={40} />
          )}
          {isLoading ? "" : "Save"}
        </button>
      </form>
    );
  };



  return (
    <FormCard width={"w-3/5"}>
      <h2 className="text-xl font-semibold">Change Info</h2>
      <p className="text-sm text-text-p-color">
        Changes will be reflected to every services
      </p>
      <label className="flex items-center mt-6 w-full h-32 cursor-pointer">
        <img
          src={profileImg}
          alt="profile img"
          className="w-20 cursor-pointer hover:opacity-90 rounded-xl"
        />
        <p className="uppercase ml-6 text-text-p-color text-sm cursor-pointer">
          CHANGE PHOTO
        </p>
        <input type="file" className="opacity-0" accept="image/*" onChange={(e) => {
            // @ts-ignore
            setProfileImg(fileHandler(e))
        }} />
      </label>

      <ProfileForm />
    </FormCard>
  );
};

export default ProfileEdit;
