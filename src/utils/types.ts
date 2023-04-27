export interface Board {
  boardTag: string;
  boardVisibility: string;
  name: string;
  id: number;
  imageUrl: string;
  collaborators: [];
  taskColumn: TaskColumn[];
}

export interface AddBoardData {
  file?: any;
  name?: string | any;
  visibility?: string | any;
  boardTag?: string,
  imageUrl?: any
  callback: Function
}

export interface TaskColumn {
  id: number;
  name: string;
  tasks: [];
  createdAt: string;
  imageUrl: string | undefined;
  updatedAt: string;
  boardRef: string;
  contributors: [];
  comments: [];
  description: null | string;
  position: number;
  labels: {
    backgroundCode: string;
    colorCode: string;
    createdAt: string;
    id: number;
    name: string;
    updatedAt: string;
  }[];
}

export interface Task {
  id: number;
  name: string;
  tasks: [];
  imageUrl: string | undefined;
  createdAt: string;
  updatedAt: string;
  boardRef: string;
  contributors: [] | undefined;
  comments: [] | undefined;
  description: null | string;
  position: number;
  labels: {
    backgroundCode: string;
    colorCode: string;
    createdAt: string;
    id: number;
    name: string;
    updatedAt: string;
  }[];
}

export interface Comment {
  id: number;
  message: string;
  createdAt: string;
  updatedAt: string;
}

export interface EditTaskOptions {
  boardTag: string;
  boardRef: string;
  name?: string;
  file?: any;
  description?: string;
  imageUrl?: string | undefined
}

export interface TaskColumnOptions {
  boardTag: string;
  name?: string;
  taskColumnId?: number;
}

