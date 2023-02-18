import React, { useState } from "react";
import { MdDescription } from "react-icons/md";
import { AiOutlinePlus } from "react-icons/ai";
import { fileHandler } from "../utils/helperFn";
import AttachedItem from "./AttachedItem";
import { toastError } from "../utils/helperFn";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const Attachments = () => {
  const [attachments, setAttachments] = useState([]);
  const [displayMoreAttachments, setDisplayMoreAttachments] = useState(false);

  const fileUploadHandler = (e: { target: { files: any } }) => {
    console.log(e.target.files[0]);
    const file = e.target.files[0];

    const imageUrl = file.type.includes("image") ? fileHandler(e) : "";

    console.log("url", imageUrl);

    const date = `${
      months[new Date().getMonth()]
    } ${new Date().getDate()}, ${new Date().getFullYear()}`;

    const fileData = {
      image: imageUrl,
      name: file.name,
      date,
    };

    setAttachments(
      (prevState: { name: string; date: string; imageUrl: string }[]): any => {
        const existingItem = prevState.find(
          (file) => file.name === fileData.name
        );

        if (existingItem) {
          toastError("File Already Exists");
          return prevState;
        } else {
          console.log("Filesss Already Exists");

          return [...prevState, fileData];
        }
      }
    );
  };

  const toggleDisplayMoreAttachmentsHandler = () => {
    setDisplayMoreAttachments((prevState) => !prevState);
  };

  const sliceNumber = displayMoreAttachments ? attachments.length : 3;

  return (
    <div className="mt-3 w-full mb-6">
      <div className="flex items-center">
        <p className="flex text-[#bdbdbd] items-center">
          <MdDescription className="text-current w-2.5 h-2.5" />
          <span className=" text-xs font-semibold ml-1">Attachments</span>
        </p>
        <input
          type="file"
          accept="image/*,.pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          id="add-file"
          className="hidden"
          onChange={fileUploadHandler}
        />
        <label
          htmlFor="add-file"
          className="cursor-pointer ml-3 border px-2.5 py-1 rounded-lg  text-xs flex items-center text-color-grey-3 border-color-border hover:text-color-grey-4 hover:border-color-grey-4"
        >
          <AiOutlinePlus className="text-current w-2.5 h-2.5 mr-2" />
          Add
        </label>
      </div>
      <div
        className={`mt-3 h-[15rem] ${
          displayMoreAttachments ? " overflow-auto scroll" : "overflow-hidden"
        } `}
      >
        {attachments
          .slice(0, sliceNumber)
          .map((file: { name: string; image: string; date: string }, i) => (
            <AttachedItem key={i} fileData={file} />
          ))}
      </div>
      {attachments.length > 3 && (
        <p
          className="text-sm text-color-grey-3 cursor-pointer mt-1"
          onClick={toggleDisplayMoreAttachmentsHandler}
        >
          {displayMoreAttachments ? "Show less" : "Show more"}
        </p>
      )}
    </div>
  );
};

export default Attachments;
