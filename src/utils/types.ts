export interface Board {
  boardTag: string;
  name: string;
  id: number;
  imageUrl: string;
  collaborators: undefined | string[];
  taskColumns: {
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
  }[];
}

export interface dragDropColumn {
  id: number;
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
