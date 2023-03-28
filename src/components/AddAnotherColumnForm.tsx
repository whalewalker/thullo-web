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

  const onSubmit: SubmitHandler<FormData> = (data) => {
    // const columnName: string = data.columnName;

    dispatchFn(boardAction.toggleDispayAddColumnForm(false));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      // className=" p-2 bg-color-white rounded-lg border border-[#E0E0E0] shadow-sm"
      className=" "
    >
      <div className="w-full ">
        <InputComponent
          placeholder={"Add column title"}
          type={"text"}
          register={register}
          error={errors}
          name={"columnName"}
          validation={registrationOption.cardName}
          pl={"pl-1 pr-1"}
          my={"my-0"}
          border={"border-0"}
        />
      </div>

      {/* <div className="flex items-center mt-1">
        <button
          type="submit"
          className={`font-medium cursor-pointer text-sm  rounded-lg border-0 px-2 py-1 mr-2 flex items-center bg-color-btn text-color-white`}
        >
          <span>Save</span>
        </button>
        <button
          className="border-0 outline-none text-[#828282] mr-4 hover:text-color-btn transition-all duration-300 ease-in"
          onClick={() => {
            dispatchFn(boardAction.toggleDispayAddColumnForm(false));
          }}
        >
          cancel
        </button>
      </div> */}
    </form>
  );
};

export default AddAnotherColumnForm;
