import { SubmitHandler, useForm } from "react-hook-form";
import InputComponent from "./InputComponent";
import { registrationOption } from "../utils/formValidation";
import { useAppDispatch } from "../hooks/customHook";
import { editBoardNameAction } from "../actions/boardAction";

const EditBoardNameForm = ({
  setDisplayEditBoardNameForm,
  boardTag,
}: {
  boardTag: string;
  setDisplayEditBoardNameForm: Function;
}) => {
  const dispatchFn = useAppDispatch();

  type FormData = {
    boardName: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      boardName: "",
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    dispatchFn(
      editBoardNameAction({ boardTag: boardTag, name: data.boardName })
    );
    setDisplayEditBoardNameForm(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <InputComponent
        placeholder={"Add board title"}
        type={"text"}
        register={register}
        error={errors}
        name={"boardName"}
        validation={registrationOption.boardName}
        pl={"pl-3 pr-3"}
        shadow="drop-shadow-[0_1px_3px_rgba(0,0,0,0.25)]"
        autoFocus={true}
      />
    </form>
  );
};

export default EditBoardNameForm;
