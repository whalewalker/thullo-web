import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { getUnsplashPictures } from "../services/taskService";
import ReactLoading from "react-loading";
import { useAppDispatch } from "../hooks/customHook";
import { addImageToTaskCover } from "../actions/taskActions";

const UnsplashModal = ({
  display,
  setUrl,
  setDisplay,
  boardTag,
  boardRef,
}: {
  display: string;
  setUrl: Function;
  setDisplay: Function;
  boardTag: string;
  boardRef: string;
}) => {
  const [searchImageName, setSearchImageName] = useState("");
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const dispatchFn = useAppDispatch();

  const searchImageHandler = (e: { target: { value: string } }) => {
    setSearchImageName(e.target.value);
  };

  const setSearchedImage = async (imageUrl: string) => {
    let imageObj = await fetch(imageUrl).then((r) => r.blob());
    setUrl(imageUrl);
    dispatchFn(addImageToTaskCover({ boardTag, boardRef, imageObj, imageUrl }));
  };

  const onSubmitSearchInputHandler = async (e: {
    preventDefault: Function;
  }) => {
    e.preventDefault();
    setIsLoading(true);
    const result = await getUnsplashPictures(searchImageName);
    setIsLoading(false);

    const images = result.map(
      (item: {
        id: string;
        alt_description: string;
        urls: { raw: string };
      }) => {
        return { id: item.id, alt: item.alt_description, url: item.urls.raw };
      }
    );
    setImages(images);
  };

  return (
    <div
      className={`w-[16.3rem] h-max transition-all duration-800 ease-linear bg-color-white absolute top-[16.5rem] -right-[4.8rem] rounded-lg p-2 z-20  shadow-4xl cursor-default ${
        display === "Cover"
          ? "opacity-100 visible"
          : "delay-300 opacity-0 invisible"
      }`}
      onMouseEnter={() => {
        setDisplay("Cover");
      }}
      onMouseLeave={() => {
        setDisplay("");
      }}
    >
      <p className="text-xs font-semibold text-color-grey-4">Photo Search</p>
      <p className="text-color-grey-3 font-normal text-xs leading-6">
        Search Unsplash for photos
      </p>
      <form
        className={`w-full flex shadow-5xl rounded-lg mt-5 p-1 `}
        onSubmit={onSubmitSearchInputHandler}
      >
        <input
          type="text"
          placeholder="Keywords..."
          className="px-2 py-1 border-0 outline-0 w-full !text-[12px]"
          value={searchImageName}
          onChange={searchImageHandler}
        />
        <button
          type="submit"
          className="bg-color-btn text-color-white p-2 flex justify-center items-center  rounded-lg text-sm flex-1  hover: transition-all duration-300 ease-in"
        >
          {isLoading ? (
            <ReactLoading type="spin" color="#fff" width={16} height={16} />
          ) : (
            <FiSearch className="w-4 h-4 text-color-white" />
          )}
        </button>
      </form>
      {images && (
        <div className="grid grid-cols-4 gap-2 justify-between mt-5">
          {images.map((image: { id: string; url: string; alt: string }) => (
            <img
              src={image.url}
              alt={image.alt}
              key={image.id}
              className="w-[3.2rem] h-[3.2rem] rounded-lg object-cover cursor-pointer"
              onClick={() => {
                setSearchedImage(image.url);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default UnsplashModal;
