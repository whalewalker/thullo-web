import React from "react";
import InputComponent from "./Input";
import { registrationOption } from "../utils/formValidation";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch } from "../hooks/customHook";
import { boardAction } from "../slice/boardSlice";

interface TaskColumnFormProps {
  value: string,
  action?: string,
  boardTag: string
}
const TaskColumnForm = ({value, action, boardTag}: TaskColumnFormProps) => {
  const dispatch = useAppDispatch();

  type FormData = {
    columnName: string;
  };

  const {
    register,
    handleSubmit,
  } = useForm<FormData>({
    defaultValues: {
      columnName: value,
    },
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    if (action === "addTaskColumn") {
      console.log(data)
    }
    dispatch(boardAction.toggleDisplayAddColumnForm(false));
  };


  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="w-full border-[#DAE4FD] border rounded">
        <InputComponent
          placeholder={"Add column title"}
          type={"text"}
          register={register}
          error={""}
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

TaskColumnForm.defaultProps = {
  value: "",
};

export default TaskColumnForm;
