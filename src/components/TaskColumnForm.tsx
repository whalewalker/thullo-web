import React from "react";
import InputComponent from "./Input";
import {registrationOption} from "../utils/formValidation";
import {SubmitHandler, useForm} from "react-hook-form";
import {useAppDispatch, useAppSelector} from "../hooks/customHook";
import {boardAction} from "../slice/boardSlice";
import {addTaskColumn, editTaskColumn} from "../actions/taskColumnAction";
import {updateTaskColumn} from "../services/taskColumnService";

interface TaskColumnFormProps {
    value: string,
    action?: string,
    boardTag: string
}

const TaskColumnForm = ({value, action, boardTag}: TaskColumnFormProps) => {
    const dispatch = useAppDispatch();
    const columnId = useAppSelector(state => state.board.columnId);


    type FormData = {
        columnName: string;
    };

    const {
        register,
        handleSubmit,
    } = useForm<FormData>({
        defaultValues: {
            columnName: value,
        },
    });

    const onSubmit: SubmitHandler<FormData> = (data) => {
        const {columnName} = data;
        if (action === "updateTaskColumn") {
           dispatch(editTaskColumn({name: columnName,  taskColumnId: columnId, boardTag}))
        } else {
            dispatch(addTaskColumn({name: columnName, boardTag}));
        }
        dispatch(boardAction.toggleDisplayAddColumnForm(false));
    };


    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="w-full border-[#DAE4FD] border rounded">
                <InputComponent
                    placeholder={"Add column title"}
                    type={"text"}
                    register={register}
                    error={""}
                    name={"columnName"}
                    validation={registrationOption.cardName}
                    pl={"pl-1 pr-1"}
                    my={"my-0"}
                    border={"border"}
                    autoFocus={true}
                />
            </div>
        </form>
    );
};

TaskColumnForm.defaultProps = {
    value: "",
};

export default TaskColumnForm;
