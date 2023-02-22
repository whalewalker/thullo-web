import React, { useState } from "react";
import emptyImg from "../asset/img/empty img.jpg";
import { RxCross2 } from "react-icons/rx";
import { AiFillPicture, AiOutlinePlus } from "react-icons/ai";
import InputComponent from "./InputComponent";
import { registrationOption } from "../utils/formValidation";
import { SubmitHandler, useForm } from "react-hook-form";
import { fileHandler } from "../utils/helperFn";
import { boardAction } from "../slice/boardSlice";
import ReactLoading from "react-loading";
import { useAppDispatch, useAppSelector } from "../hooks/customHook";
import { addTask } from "../actions/taskActions";

const AddAnotherCardForm = ({
  boardId,
  boardTag,
}: {
  boardId: number;
  boardTag: string;
}) => {
  const [cardImg, setCardImg] = useState(emptyImg);
  const [cardImgFile, setCardImgFile] = useState();

  const columnId = useAppSelector((state) => state.board.columnId);

  const isLoading = useAppSelector((state) => state.board.isLoading);

  const dispatchFn = useAppDispatch();

  const imgChangeHandler = (e: { target: { files: any } }) => {
    // @ts-ignore

    setCardImg(fileHandler(e));
    setCardImgFile(e.target.files[0]);
  };

  const resetcardImgHandler = () => {
    setCardImg(emptyImg);
  };

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

  const closeAddAnotherCardModal: any = (e: {
    target: { dataset: { close: string } };
  }) => {
    if (e.target.dataset.close) {
      dispatchFn(boardAction.setColumnId());
      dispatchFn(boardAction.toggleDispayAddTaskForm(false));
    }
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    // const imageUrl = cardImg === emptyImg ? undefined : cardImg;
    const imageFile = cardImgFile === emptyImg ? undefined : cardImgFile;

    const formData: any = {
      columnId: columnId,
      boardId: boardId,
      boardTag,
      taskName: data.cardName,
      file: imageFile,
    };

    await dispatchFn(addTask(formData));
    dispatchFn(boardAction.toggleDispayAddTaskForm(false));
  };

  return (
    <div
      className="w-full h-screen fixed bg-color-black-transparent flex items-center justify-center top-0 left-0 z-30 "
      data-close="close-modal"
      onClick={closeAddAnotherCardModal}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className=" px-6 py-7 bg-color-white rounded-lg w-[20rem]"
      >
        <div className="relative w-full ">
          <label className="w-full cursor-pointer">
            <img
              src={cardImg}
              alt="card-img"
              className="h-[7rem] object-cover w-full rounded-lg"
            />
            <input
              type="file"
              className="opacity-0"
              accept="image/*"
              onChange={imgChangeHandler}
            />
          </label>
          <div
            className="absolute top-0 -translate-y-4 -right-3  p-2 rounded-lg bg-color-btn text-color-white cursor-pointer"
            onClick={resetcardImgHandler}
          >
            <RxCross2 className="w-6 h-6" />
          </div>
        </div>
        <div className="w-full my-2.5">
          <InputComponent
            placeholder={"Add card title"}
            type={"text"}
            register={register}
            error={errors}
            name={"cardName"}
            validation={registrationOption.cardName}
            pl={"pl-3 pr-3"}
            shadow="drop-shadow-[0_4px_12px_rgba(0,0,0,0.25)]"
          />
        </div>
        <div className="flex items-center ">
          <label
            htmlFor="card-img"
            className={
              "font-medium cursor-pointer text-sm bg-color-grey-1 rounded-lg border-0 py-2.5 px-4 flex items-center text-color-grey-3  grow"
            }
          >
            <AiFillPicture className="mr-3 w-5 h-5 text-color-grey-3" />
            <span>Cover</span>
          </label>
          <input
            type="file"
            onChange={imgChangeHandler}
            accept="image/*"
            id="card-img"
            className="hidden"
          />
        </div>

        <div className="flex items-center justify-end mt-6">
          <button
            className="border-0 outline-none text-[#828282] mr-4 hover:text-color-btn transition-all duration-300 ease-in"
            onClick={() => {
              dispatchFn(boardAction.toggleDispayAddTaskForm(false));
            }}
            type="button"
          >
            cancel
          </button>
          <button
            type="submit"
            className={`font-medium cursor-pointer text-sm  rounded-lg border-0  ${
              isLoading ? "py-0" : "py-2.5"
            }  px-4 flex items-center bg-color-btn text-color-white`}
          >
            {isLoading && (
              <ReactLoading
                type="bubbles"
                color="#fff"
                width={40}
                height={40}
              />
            )}
            {isLoading ? (
              ""
            ) : (
              <>
                <AiOutlinePlus className="w-5 h-5 mr-3 text-color-white" />
                <span>Create</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAnotherCardForm;
