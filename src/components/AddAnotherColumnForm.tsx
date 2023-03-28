import React from "react";
import InputComponent from "./InputComponent";
import { registrationOption } from "../utils/formValidation";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch } from "../hooks/customHook";
import { boardAction } from "../slice/boardSlice";

const AddAnotherColumnForm = () => {
  const dispatchFn = useAppDispatch();

  type FormData = {
    columnName: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      columnName: "",
    },
  });

  const onSubmit: SubmitHandler<FormData> = () => {
    dispatchFn(boardAction.toggleDispayAddColumnForm(false));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <div className="w-full border-[#DAE4FD] border rounded">
        <InputComponent
          placeholder={"Add column title"}
          type={"text"}
          register={register}
          error={errors}
          name={"columnName"}
          validation={registrationOption.cardName}
          pl={"pl-1 pr-1"}
          my={"my-0"}
          border={"border"}
          autoFocus={true}
        />
      </div>
    </form>
  );
};

export default AddAnotherColumnForm;
