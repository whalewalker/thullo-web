export interface Board {
  boardTag: string;
  boardVisibility: string;
  name: string;
  id: number;
  imageUrl: string;
  collaborators: [];
  taskColumn: {
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
  }[];
}

export interface AddBoardData {
  file?: any;
  boardName?: string | any;
  visibility?: string | any;
  boardTag?: string,
  imageUrl?: any
}

export interface TaskColumn {
  name: string;
  tasks: [];
  createdAt: string;
  updatedAt: string;
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
