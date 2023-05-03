import React from "react";
import InputComponent from "./Input";
import { registrationOption } from "../utils/formValidation";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../hooks/customHook";
import { addTask } from "../actions/taskActions";
import ReactLoading from "react-loading";

const AddAnotherCardForm = ({
  boardId,
  boardTag,
  removeAddCardModal,
}: {
  boardId: number;
  boardTag: string;
  removeAddCardModal: Function;
}) => {
  const dispatch = useAppDispatch();

  const columnId = useAppSelector((state) => state.board.columnId);
  const isLoading = useAppSelector((state) => state.board.isLoading);


  type FormData = {
    cardName: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      cardName: "",
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    // const imageUrl = cardImg === emptyImg ? undefined : cardImg;

    const formData: any = {
      columnId: columnId,
      boardId: boardId,
      boardTag,
      taskName: data.cardName,
    };

    await dispatch(addTask(formData));
    removeAddCardModal(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className=" p-2 bg-color-white rounded-lg w-full flex flex-col border border-[#E0E0E0] shadow-sm"
    >
      <InputComponent
        placeholder={"Enter a title for this card..."}
        type={"text"}
        register={register}
        error={errors}
        name={"cardName"}
        validation={registrationOption.cardName}
        pl={"pl-1 pr-1"}
        my={"my-2"}
        border={"border-0"}
      />
      <div className="flex items-center m-1">
        <button
          type="submit"
          className={`font-medium cursor-pointer text-sm mr-2  rounded-lg border-0 ${
            isLoading ? "py-0.5" : "py-1"
          }  px-2 flex items-center bg-color-btn text-color-white`}
        >
          {isLoading && (
            <ReactLoading type="bubbles" color="#fff" width={25} height={25} />
          )}
          {isLoading ? "" : <span>Save</span>}
        </button>
        <button
          className="border-0 outline-none text-[#828282] hover:text-color-btn transition-all duration-300 ease-in"
          onClick={() => {
            removeAddCardModal(false);
          }}
          type="button"
        >
          cancel
        </button>
      </div>
    </form>
  );
};

export default AddAnotherCardForm;
