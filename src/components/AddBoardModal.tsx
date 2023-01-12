import React, {useState} from "react";
import emptyImg from "../asset/img/empty img.jpg";
import {RxCross2} from "react-icons/rx";
import {AiFillPicture, AiOutlinePlus} from "react-icons/ai";
import {IoMdLock} from "react-icons/io";
import InputComponent from "./InputComponent";
import {registrationOption} from "../utils/formValidation";
import {SubmitHandler, useForm} from "react-hook-form";
import collabs from "../asset/img/profile-pic - Copy.png";
import {fileHandler} from "../utils/helperFn";

const AddBoardModal = (props: {
    closeModal: any;
    boardArray: {}[];
    addBoard: any;
}) => {
    const [boardImg, setBoardImg] = useState(emptyImg);
    const [privateBoard, setPrivateBoard] = useState(false);

    const imgChangeHandler = (e: { target: { files: any } }) => {
        // @ts-ignore
        setBoardImg(fileHandler(e))
    }

    const resetBoardImgHandler = () => {
        setBoardImg(emptyImg);
    };

    const togglePrivateHandler = () => {
        setPrivateBoard((prevState) => !prevState);
    };

    type FormData = {
        boardName: string;
    };

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<FormData>({
        defaultValues: {
            boardName: "",
        },
    });

    const onSubmit: SubmitHandler<FormData> = (data) => {
        const formData = {
            img: boardImg,
            boardName: data.boardName,
            collaborators: [collabs],
            privateState: privateBoard,
        };

        props.addBoard(formData);
        props.closeModal();
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
                        <img src={boardImg} alt="board-img" className="h-[7rem] object-cover w-full rounded-lg"/>
                        <input type="file" className="opacity-0" accept="image/*" onChange={imgChangeHandler}/>
                    </label>
                    <div
                        className="absolute top-0 -translate-y-4 -right-3  p-2 rounded-lg bg-color-btn text-color-white cursor-pointer"
                        onClick={resetBoardImgHandler}
                    >
                        <RxCross2 className="w-6 h-6"/>
                    </div>
                </div>
                <div className="w-full my-2.5">
                    <InputComponent
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
                        <AiFillPicture className="mr-3 w-5 h-5 text-color-grey-3"/>
                        <span>Cover</span>
                    </label>
                    <input
                        type="file"
                        onChange={imgChangeHandler}
                        accept="image/*"
                        id="board-img"
                        className="hidden"
                    />
                    <p
                        className={`font-medium cursor-pointer text-sm  rounded-lg border-0 py-2.5 px-4 flex items-center  grow ${
                            privateBoard
                                ? "bg-color-btn text-color-white"
                                : "bg-color-grey-1 text-color-grey-3"
                        }`}
                        onClick={togglePrivateHandler}
                    >
                        <IoMdLock
                            className={`mr-3 w-5 h-5 ${
                                privateBoard ? " text-color-white" : " text-color-grey-3"
                            }`}
                        />
                        <span>Private</span>
                    </p>
                </div>
                <div className="flex items-center justify-end mt-6">
                    <button
                        className="border-0 outline-none text-[#828282] mr-4 hover:text-color-btn transition-all duration-300 ease-in"
                        onClick={props.closeModal}
                    >
                        cancel
                    </button>
                    <button
                        type="submit"
                        className={`font-medium cursor-pointer text-sm  rounded-lg border-0 py-2.5 px-4 flex items-center bg-color-btn text-color-white`}
                    >
                        <AiOutlinePlus className="w-5 h-5 mr-3 text-color-white"/>
                        <span>Create</span>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddBoardModal;
