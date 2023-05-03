export interface Board {
    boardTag: string;
    boardVisibility: string;
    name: string;
    id: number;
    imageUrl: string;
    collaborators: [];
    taskColumn: TaskColumn[];
    [key: string]: any;
}


export interface TaskColumn {
    id: number;
    name: string;
    tasks: Task[];
    createdAt: string;
    [key: string]: any;
}

export interface Task {
    id: number;
    name: string;
    imageUrl: string | undefined;
    createdAt: string;
    updatedAt: string;
    boardRef: string;
    contributors: [] | undefined;
    comments: [] | undefined;
    description: null | string;
    position: number;
    labels: Label[];
    attachments: Attachment[];
    [key: string]: any;
}

export interface Label {
    backgroundCode: string;
    colorCode: string;
    createdAt: string;
    id: number;
    name: string;
    updatedAt: string;
}

export interface AddBoardData {
    file?: any;
    name?: string | any;
    visibility?: string | any;
    boardTag?: string,
    imageUrl?: any
    callback: Function
    [key: string]: any;
}

export interface Comment {
    id: number;
    message: string;
    createdAt: string;
    updatedAt: string;
    createdBy: User
    [key: string]: any;
}

export interface EditTaskOptions {
    boardTag: string;
    boardRef: string;
    name?: string;
    file?: any;
    description?: string;
    imageUrl?: string
    [key: string]: any;
}

export interface TaskColumnOptions {
    boardTag: string;
    name?: string;
    taskColumnId?: number;
    [key: string]: any;
}

export interface User {
    id: number
    name: string,
    imageUrl: string,
    bio: string,
    phoneNumber: string,
    email: string,

    [key: string]: any;
}

export interface Attachment {
    id: number;
    fileName: string;
    fileUrl: string;
    createdAt: string;
    [key: string]: any;
}
export interface Color {
    id: string;
    textColor: string;
    backgroundColor: string;
    blockBg: string;
    border: string;
}

export interface LabelOptions {
    name: string;
    backgroundCode: string;
    colorCode: string;
}



