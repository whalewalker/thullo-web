import React, { useState } from "react";
import colorArray from "../utils/colorArray";
import { MdLabel } from "react-icons/md";

interface Color {
  id: string;
  textColor: string;
  backgroundColor: string;
  blockBg: string;
}

const LabelModal = ({
  display,
  setDisplay,
}: {
  display: string;
  setDisplay: Function;
}) => {
  const [labelInput, setLabelInput] = useState("");
  const [labelColor, setLabelColor] = useState("#219653");
  const [labels, setLabels] = useState([]);

  const color: any = colorArray.find((item: Color) => item.id === labelColor);

  const changeLabelInput = (e: { target: { value: string } }) => {
    setLabelInput(e.target.value);
  };

  const submitLabelHandler = (e: { preventDefault: Function }) => {
    e.preventDefault();
    const label = {
      text: labelInput,
      backgroundColor: color.backgroundColor,
      textColor: color.textColor,
    };
    setLabels((prevState): any => [label, ...prevState]);
    setLabelInput("");
  };

  return (
    <div
      className={`w-[15.5rem] h-max transition-all duration-800 ease-linear bg-color-white absolute top-[16.5rem] -right-[10rem] rounded-lg p-2  shadow-4xl cursor-default ${
        display === "Labels"
          ? "opacity-100 visible"
          : "delay-1000 opacity-0 invisible"
      }`}
      onMouseEnter={() => {
        setDisplay("Labels");
      }}
      onMouseLeave={() => {
        setDisplay("");
      }}
    >
      <p className="text-xs font-semibold text-color-grey-4">Label</p>
      <p className="text-xs font-normal text-color-grey-3 ">
        Select a name and color
      </p>
      <form className="mt-2.5 flex flex-col" onSubmit={submitLabelHandler}>
        <input
          type="text"
          placeholder="label..."
          value={labelInput}
          onChange={changeLabelInput}
          className="w-full border-0 outline-0 shadow-4xl py-1 px-2 rounded-lg mb-3"
        />
        <div className="grid grid-cols-4 gap-1 my-2.5">
          {colorArray.map((color: Color) => (
            <div
              key={color.id}
              className={`cursor-pointer w-[3.125rem] h-[1.7rem] rounded  hover:border transition-all duration-100 ease-linear ${color.blockBg}`}
              onClick={() => {
                setLabelColor(color.id);
              }}
            ></div>
          ))}
        </div>
        <p className="flex items-center text-xs font-semibold text-[#BDBDBD]">
          <MdLabel className="w-3.5 h-3.5 text-current mr-1.5" />
          <span>Available</span>
        </p>
        <div className="my-2 flex flex-wrap">
          {labelInput.length > 0 && (
            <p
              className={`${color.backgroundColor} ${color.textColor} mr-2  mt-1 px-2 text-xs font-medium py-1 rounded-lg w-max`}
            >
              {labelInput}
            </p>
          )}
          {labelInput.length === 0 &&
            labels &&
            labels.slice(0, 3).map((label: any, i) => (
              <p
                key={i}
                className={`${label.backgroundColor} ${label.textColor} mr-2 mt-1 px-2 text-xs font-medium py-1 rounded-lg w-max`}
              >
                {label.text}
              </p>
            ))}
        </div>
        <button
          type="submit"
          className=" self-center py-1.5 px-4 text-xs  bg-color-btn text-center font-medium text-color-white rounded-lg"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default LabelModal;
