import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete, AiOutlinePicture } from "react-icons/ai";
import { fileHandler } from "../utils/helperFn";
import { useAppDispatch } from "../hooks/customHook";
import { updateBoardImageAction } from "../actions/boardAction";

function AddImageComponent({ boardTag }: { boardTag: string }) {
  const dispatchFn = useAppDispatch();

  const setImageHandler = (e: any) => {
    const file = e.target.files[0];
    const imageUrl = fileHandler(e);

    dispatchFn(updateBoardImageAction({ file, imageUrl, boardTag }));
  };

  return (
    <div>
      <label
        htmlFor="boardImage"
        className="flex items-center p-2 cursor-pointer hover:text-color-btn transition-all duration-150 ease-in"
      >
        <AiOutlinePicture className="text-current mr-3" />
        <span className="">Change Board Image</span>
      </label>
      <input
        id="boardImage"
        type="file"
        className="hidden"
        accept="image/*"
        onChange={setImageHandler}
      />
    </div>
  );
}

const UpdateBoardDetailsModal = ({
  display,
  setDisplay,
  boardTag,
  setDisplayEditBoardNameForm,
}: {
  display: boolean;
  setDisplay: Function;
  boardTag: string;
  setDisplayEditBoardNameForm: Function;
}) => {
  function editBoardName() {
    setDisplayEditBoardNameForm(true);
  }

  function deleteBoard() {}

  const updateItems = [
    {
      title: "Edit Board Name",
      icon: <FiEdit className="text-current mr-3" />,
      function: editBoardName,
    },
    {
      title: "Delete Board",
      icon: <AiOutlineDelete className="text-current mr-3" />,
      function: deleteBoard,
    },
  ];

  return (
    <div
      className={`absolute top-[12rem] -right-[2rem] transition-all duration-900 ease-in-out shadow-update-board bg-color-white rounded-lg   ${
        display
          ? "opacity-100 visible scale-100 -translate-y-5"
          : "opacity-0 hidden scale-0 translate-y-0"
      }`}
      onClick={() => {
        setDisplay(false);
      }}
    >
      <AddImageComponent boardTag={boardTag} />
      {updateItems.map((item: any, i: number) => (
        <p
          key={i}
          className="flex items-center p-2 hover:text-color-btn transition-all duration-150 ease-in "
          onClick={() => {
            item.function();
          }}
        >
          {item.icon}
          <span className="">{item.title}</span>
        </p>
      ))}
    </div>
  );
};

export default UpdateBoardDetailsModal;
