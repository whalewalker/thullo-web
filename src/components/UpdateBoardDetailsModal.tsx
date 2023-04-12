import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";

const UpdateBoardDetailsModal = ({
  boardId,
  display,
  setDisplay,
  setDisplayEditBoardForm,
}: {
  boardId: number;
  display: null | number;
  setDisplay: Function;
  setDisplayEditBoardForm: Function;
}) => {
  function displayEditBoardFormHandler() {
    setDisplayEditBoardForm(true);
  }

  function deleteBoard() {}

  const updateItems = [
    {
      title: "Edit Board",
      icon: <FiEdit className="text-current mr-3" />,
      function: displayEditBoardFormHandler,
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
        display === boardId
          ? "opacity-100 visible scale-100 -translate-y-5 z-50"
          : "opacity-0 hidden scale-0 translate-y-0"
      }`}
      onClick={() => {
        setDisplay(null);
      }}
    >
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
