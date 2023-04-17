import React, {useState } from "react";
import emptyImg from "../asset/img/empty img.jpg";
import { RxCross2 } from "react-icons/rx";
import { AiFillPicture, AiOutlinePlus } from "react-icons/ai";
import { IoMdLock } from "react-icons/io";
import Input from "./Input";
import { registrationOption } from "../utils/formValidation";
import { SubmitHandler, useForm } from "react-hook-form";
import { fileHandler } from "../utils/helperFn";
import {addBoard, editBoardAction} from "../actions/boardAction";
import { useAppDispatch, useAppSelector } from "../hooks/customHook";
import ReactLoading from "react-loading";
import Btn from "./Btn";


interface AddBoardModalProps {
  closeModal: any;
  value?: string;
  visibility?: string;
  imageUrl?: any;
  action?: string
  boardTag?: string
}


const AddBoardModal: React.FC<AddBoardModalProps> = ({
                                                  closeModal,
                                                  value,
                                                  visibility,
                                                  imageUrl,
                                                  boardTag,
                                                  action
                                                     }) => {
  const [boardImg, setBoardImg] = useState(imageUrl || emptyImg);
  const [file, setFile] = useState(imageUrl || null);
  const [boardVisibility, setBoardVisibility] = useState(visibility || "PRIVATE");
  const [checkFile, setCheckFile] = useState(false);
  const dispatchFn = useAppDispatch();
  const isLoading = useAppSelector((state) => state.board.isLoading);

  const imageHandler = (e: { target: { files: any } }) => {
    setFile(e.target.files[0]);
    setCheckFile(false);
    // @ts-ignore
    setBoardImg(fileHandler(e));
  };

  const togglePrivateHandler = () => {
    if (boardVisibility === "PRIVATE")
      setBoardVisibility("PUBLIC");
    else
      setBoardVisibility("PRIVATE");
  };

  type FormData = {
    boardName: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      boardName: value,
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (!file) {
      setCheckFile(true);
      return;
    }

    const boardData = {
      file: file !== imageUrl ? file : null,
      boardName: data.boardName === value ? null : data.boardName,
      visibility: boardVisibility !== visibility ? boardVisibility : null,
    };

    if (action === "edit") {
      const editedData = {
        ...boardData,
        boardTag: boardTag,
        imageUrl: imageUrl,
      };
      await dispatchFn(editBoardAction(editedData));
    } else {
      await dispatchFn(addBoard(boardData));
    }
    closeModal();
  };


  return (
    <div className="w-full h-screen fixed bg-color-black-transparent flex items-center justify-center top-0 left-0 z-30 ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className=" px-6 py-7 bg-color-white rounded-lg w-[20rem]"
      >
        <div className="relative w-full ">
          <label className="w-full cursor-pointer">
            <img
              src={boardImg}
              alt="board-img"
              className="h-[7rem] object-cover w-full rounded-lg"
            />
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={imageHandler}
            />
          </label>
          {checkFile && (
            <small className="text-color-red pt-1">
              Please add a board Image
            </small>
          )}
          <Btn
            className="absolute -top-6 -translate-y-4 -right-8  p-2 rounded-lg bg-color-btn text-color-white cursor-pointer"
            onClick={closeModal}
          >
            <RxCross2 className="w-6 h-6" />
          </Btn>
        </div>
        <div className="w-full my-2.5">
          <Input
            placeholder={"Add board title"}
            type={"text"}
            register={register}
            error={errors}
            name={"boardName"}
            validation={registrationOption.boardName}
            pl={"pl-3 pr-3"}
            shadow="drop-shadow-[0_4px_12px_rgba(0,0,0,0.25)]"
          />
        </div>
        <div className="flex items-center">
          <label
            htmlFor="board-img"
            className={
              "font-medium cursor-pointer text-sm bg-color-grey-1 rounded-lg border-0 py-2.5 px-4 flex items-center text-color-grey-3 mr-4 grow"
            }
          >
            <AiFillPicture className="mr-3 w-5 h-5 text-color-grey-3" />
            <span>Cover</span>
          </label>
          <input
            type="file"
            onChange={imageHandler}
            accept="image/*"
            id="board-img"
            className="hidden"
          />
          <Btn
            className={`font-medium cursor-pointer text-sm  rounded-lg border-0 py-2.5 px-4 flex items-center  grow ${
                boardVisibility === "PRIVATE"
                ? "bg-color-btn text-color-white"
                : "bg-color-grey-1 text-color-grey-3"
            }`}
            onClick={togglePrivateHandler}
          >
            <IoMdLock
              className={`mr-3 w-5 h-5 ${
                  boardVisibility === "PRIVATE" ? " text-color-white" : " text-color-grey-3"
              }`}
            />
            <span>{boardVisibility}</span>
          </Btn>
        </div>
        <div className="flex items-center justify-end mt-6">
          <button
            className="border-0 outline-none text-[#828282] mr-4 hover:text-color-btn transition-all duration-300 ease-in"
            onClick={closeModal}
          >
            cancel
          </button>
          <button
            type="submit"
            className={`font-medium cursor-pointer text-sm  rounded-lg border-0 ${
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
              {action === "create" && <AiOutlinePlus className="w-5 h-5 mr-3 text-color-white" />}
                <span>{`${action === "edit" ? "Edit" : "Create"}`}</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

AddBoardModal.defaultProps = {
  action: "create"
}

export default AddBoardModal;
