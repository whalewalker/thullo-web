import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { getUnsplashPictures } from "../utils/helperFn";

const UnsplashModal = ({
  display,
  setUrl,
  setDisplay,
}: {
  display: boolean;
  setUrl: Function;
  setDisplay: Function;
}) => {
  const [searchImageName, setSearchImageName] = useState("");
  const [images, setImages] = useState([]);

  const searchImageHandler = (e: { target: { value: string } }) => {
    setSearchImageName(e.target.value);
  };

  const onSubmitSearchInputHandler = async (e: {
    preventDefault: Function;
  }) => {
    e.preventDefault();
    const result = await getUnsplashPictures(searchImageName);

    const images = result.map(
      (item: {
        id: string;
        alt_description: string;
        urls: { small: string };
      }) => {
        return { id: item.id, alt: item.alt_description, url: item.urls.small };
      }
    );
    setImages(images);
    setSearchImageName("");
  };

  return (
    <div
      className={`w-[16.3rem] h-max transition-all duration-800 ease-linear bg-color-white absolute top-[16.5rem] -right-[5rem] rounded-lg p-2  shadow-4xl cursor-default ${
        display ? "opacity-100 visible" : "delay-1000 opacity-0 invisible"
      }`}
      onMouseEnter={() => {
        setDisplay(true);
      }}
      onMouseLeave={() => {
        setDisplay(false);
      }}
    >
      <p className="text-xs font-semibold text-color-grey-4">Photo Search</p>
      <p className="text-color-grey-3 font-normal text-xs">
        Search Unsplash for photos
      </p>
      <form
        className={`w-full flex shadow-5xl rounded-lg mt-5 p-1 `}
        onSubmit={onSubmitSearchInputHandler}
      >
        <input
          type="text"
          placeholder="keyword..."
          className="px-2 py-1 border-0 outline-0 w-full "
          value={searchImageName}
          onChange={searchImageHandler}
        />
        <button
          type="submit"
          className=" bg-color-btn text-color-white p-2 flex justify-center items-center  rounded-lg text-sm flex-1"
        >
          <FiSearch className="w-5 h-5 text-color-white" />
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
                setUrl(image.url);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default UnsplashModal;
