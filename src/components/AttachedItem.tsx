import React from "react";

const AttachedItem = ({
  fileData,
}: {
  fileData: { name: string; image: string; date: string };
}) => {
  const isImage = (url: string) => {
    return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
  };

  return (
    <div className="flex mb-2">
      {fileData.image ? (
        <img
          src={fileData.image}
          alt={fileData.name}
          className="w-[4.5rem] h-[4.5rem] rounded-lg object-cover"
        />
      ) : (
        <p className="w-[4.5rem] h-[4.5rem] flex items-center justify-center bg-[#BDBDBD] mr-1 text-color-white rounded-lg text-xl">
          {fileData.name.slice(0, 2).toUpperCase()}
        </p>
      )}
      <div className="ml-2">
        <p className="text-[#bdbdbd] text-xs font-medium">
          Added {fileData.date}
        </p>
        <p className="font-medium text-[#000000] text-sm">{fileData.name}</p>
        <div className="flex mt-1.5">
          <button
            type="button"
            className="text-color-grey-3 border border-color-border font-medium text-[10px] hover:text-color-grey-4 hover:border-color-grey-4 rounded-lg transition-all duration-300 ease-linear mr-3 py-1 px-2"
          >
            Download
          </button>
          <button
            type="button"
            className="text-color-grey-3 border border-color-border font-medium text-[10px] hover:text-color-grey-4 hover:border-color-grey-4 rounded-lg transition-all duration-300 ease-linear py-1 px-2"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default AttachedItem;
