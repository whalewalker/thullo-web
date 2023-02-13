import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
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

  const toggleNewColumnModal: any = (e: {
    target: { dataset: { close: string } };
  }) => {
    if (e.target.dataset.close) {
      dispatchFn(boardAction.toggleDispayAddColumnForm());
    }
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    // const columnName: string = data.columnName;

    dispatchFn(boardAction.toggleDispayAddColumnForm());
  };

  return (
    <div
      className="w-full h-screen fixed bg-color-black-transparent flex items-center justify-center top-0 left-0 z-30 "
      data-close="close"
      onClick={toggleNewColumnModal}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className=" px-6 py-7 bg-color-white rounded-lg w-[20rem]"
      >
        <div className="w-full my-2.5">
          <InputComponent
            placeholder={"Add column title"}
            type={"text"}
            register={register}
            error={errors}
            name={"columnName"}
            validation={registrationOption.cardName}
            pl={"pl-3 pr-3"}
            shadow="drop-shadow-[0_4px_12px_rgba(0,0,0,0.25)]"
          />
        </div>

        <div className="flex items-center justify-end mt-6">
          <button
            className="border-0 outline-none text-[#828282] mr-4 hover:text-color-btn transition-all duration-300 ease-in"
            onClick={() => {
              dispatchFn(boardAction.toggleDispayAddColumnForm());
            }}
          >
            cancel
          </button>
          <button
            type="submit"
            className={`font-medium cursor-pointer text-sm  rounded-lg border-0 py-2.5 px-4 flex items-center bg-color-btn text-color-white`}
          >
            <AiOutlinePlus className="w-5 h-5 mr-3 text-color-white" />
            <span>Create</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAnotherColumnForm;
