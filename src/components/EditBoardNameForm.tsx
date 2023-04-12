import { SubmitHandler, useForm } from "react-hook-form";
import InputComponent from "./InputComponent";
import { registrationOption } from "../utils/formValidation";
import { useAppDispatch } from "../hooks/customHook";
import { editBoardAction } from "../actions/boardAction";
import { AiFillPicture, AiFillUnlock } from "react-icons/ai";
import { useState } from "react";
import { IoMdLock } from "react-icons/io";
import { fileHandler } from "../utils/helperFn";
import ReactLoading from "react-loading";

const EditBoardNameForm = ({
  setDisplayEditBoardNameForm,
  boardTag,
  img,
  boardVisibility,
  boardName,
}: {
  boardTag: string;
  setDisplayEditBoardNameForm: Function;
  img: string;
  boardVisibility: string;
  boardName: string;
}) => {
  const dispatchFn = useAppDispatch();
  const [boardImg, setBoardImg] = useState(img);
  const [visibility, setVisibility] = useState(boardVisibility);
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<any>();
  const [clickVisibility, setClickVisibility] = useState(false);

  const toggleClickVisibilityHandler = () => {
    setClickVisibility((prevState) => !prevState);
  };

  const togglePrivateHandler = () => {
    if (visibility === "PRIVATE") {
      setVisibility("PUBLIC");
    } else {
      setVisibility("PRIVATE");
    }
  };

  const imageHandler = (e: { target: { files: any } }) => {
    setFile(e.target.files[0]);
    // @ts-ignore
    setBoardImg(fileHandler(e));
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
      boardName: boardName,
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    await dispatchFn(
      editBoardAction({
        boardTag: boardTag,
        name: data.boardName,
        file: file,
        imageUrl: boardImg,
        visibility: visibility,
      })
    );
    setIsLoading(false);
    setDisplayEditBoardNameForm(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <label htmlFor="board-img">
        <img
          src={boardImg}
          alt="board-img"
          className="h-[4rem] object-cover w-full rounded-lg"
        />
      </label>
      <InputComponent
        placeholder={"Edit board title"}
        type={"text"}
        register={register}
        error={errors}
        name={"boardName"}
        validation={registrationOption.boardName}
        pl={"pl-3 pr-3"}
        shadow="drop-shadow-[0_1px_3px_rgba(0,0,0,0.25)]"
        autoFocus={true}
      />
      <div className="flex items-center">
        <label
          htmlFor="board-img"
          className={
            "font-medium cursor-pointer text-sm bg-color-grey-1 rounded-lg border-0 py-1.5 px-3 flex items-center text-color-grey-3 mr-4 grow"
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
        <p
          className={`font-medium cursor-pointer text-sm  rounded-lg border-0 py-1.5 px-2 flex items-center  grow  
          ${
            clickVisibility
              ? "bg-color-btn text-color-white"
              : "bg-color-grey-1 text-color-grey-3"
          }`}
          onClick={() => {
            togglePrivateHandler();
            toggleClickVisibilityHandler();
          }}
        >
          {boardVisibility === "PRIVATE" ? (
            <AiFillUnlock
              className={`mr-3 w-5 h-5
                  text-color-current`}
            />
          ) : (
            <IoMdLock
              className={`mr-3 w-5 h-5
                  text-color-current
              `}
            />
          )}
          <span className="text-color-current">
            {boardVisibility === "PRIVATE" ? "Public" : "Private"}
          </span>
        </p>
      </div>
      <div className="flex items-center justify-end mt-4">
        <button
          className="border-0 outline-none text-[#828282] mr-3 hover:text-color-btn transition-all duration-300 ease-in"
          onClick={() => {
            setDisplayEditBoardNameForm(false);
          }}
        >
          cancel
        </button>
        <button
          type="submit"
          className={`font-medium cursor-pointer text-sm  rounded-lg border-0 ${
            isLoading ? "py-0" : "py-1"
          }  px-2 flex items-center bg-color-btn text-color-white`}
        >
          {isLoading && (
            <ReactLoading type="bubbles" color="#fff" width={30} height={30} />
          )}
          {isLoading ? (
            ""
          ) : (
            <>
              <span className="text-base">save</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default EditBoardNameForm;
