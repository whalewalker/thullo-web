import React, { useState, useEffect } from "react";
import colorArray from "../utils/colorArray";
import { MdLabel } from "react-icons/md";
import { boardAction } from "../slice/boardSlice";
import { useAppDispatch } from "../hooks/customHook";

interface Color {
  id: string;
  textColor: string;
  backgroundColor: string;
  blockBg: string;
  border: string;
}

interface Label {
  name: string;
  backgroundCode: string;
  colorCode: string;
}

const LabelModal = ({
  display,
  setDisplay,
}: {
  display: string;
  setDisplay: Function;
}) => {
  const dispatchFn = useAppDispatch();

  const [labelInput, setLabelInput] = useState("");
  const [labelColor, setLabelColor] = useState("#219653");
  const [labels, setLabels] = useState([]);

  console.log(labels);

  const color: any = colorArray.find((item: Color) => item.id === labelColor);

  const changeLabelInput = (e: { target: { value: string } }) => {
    setLabelInput(e.target.value);
  };

  // useEffect(() => {
  //   const storedLabels: any = localStorage.getItem("labels");
  //   setLabels(JSON.parse(storedLabels));
  // }, []);

  const submitLabelHandler = (e: { preventDefault: Function }) => {
    e.preventDefault();

    const label = {
      name: labelInput,
      backgroundCode: color.backgroundColor,
      colorCode: color.textColor,
    };

    if (!label.name) return;
    setLabels((prevState: Label[]): any => [label, ...prevState]);
    dispatchFn(boardAction.addLabelToCard(label));
    setLabelInput("");
  };

  return (
    <div
      className={`w-[15.5rem] h-max transition-all duration-800 ease-linear bg-color-white absolute top-[16.5rem] -right-[4rem] rounded-lg p-2 z-20  shadow-4xl cursor-default ${
        display === "Labels"
          ? "opacity-100 visible"
          : "delay-300 opacity-0 invisible"
      }`}
      onMouseEnter={() => {
        setDisplay("Labels");
      }}
      onMouseLeave={() => {
        setDisplay("");
      }}
    >
      <p className="text-xs font-semibold text-color-grey-4">Label</p>
      <p className="text-xs font-normal text-color-grey-3 leading-6">
        Select a name and color
      </p>
      <form className="mt-2.5 flex flex-col" onSubmit={submitLabelHandler}>
        <input
          type="text"
          placeholder="Label..."
          value={labelInput}
          maxLength={15}
          minLength={3}
          onChange={changeLabelInput}
          className="w-full border-0 outline-0 shadow-4xl py-2 px-2 rounded-lg mb-3 !text-[12px]"
        />
        <div className="grid grid-cols-4 gap-1 my-2.5">
          {colorArray.map((color: Color) => (
            <div
              key={color.id}
              className={`cursor-pointer w-[3.125rem] h-[1.7rem] rounded  hover:border ${color.border} transition-all duration-100 ease-linear ${color.blockBg}`}
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
              className={`${color.backgroundColor} ${color.textColor} mr-2  mt-1 px-2 text-xs font-medium py-1 rounded-lg w-max max-w-full break-all`}
            >
              {labelInput}
            </p>
          )}
          {labelInput.length === 0 &&
            labels &&
            labels.slice(0, 3).map((label: any, i) => (
              <p
                key={i}
                className={`${label.backgroundCode} ${label.colorCode} mr-2 mt-1 px-2 text-xs font-medium py-1 rounded-lg w-max`}
              >
                {label.name}
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
