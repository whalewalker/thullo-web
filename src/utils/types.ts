export interface Board {
  name: string;
  id: number;
  imageUrl: string;
  collaborators: undefined | string[];
  taskColumns: {
    id: number;
    name: string;
    tasks: [];
    createdAt: string;
    updatedAt: string;
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
  imageUrl: string;
  position: number;
  description: null | string;
  comments: [];
  contributors: [];
  createdAt: string;
  updatedAt: string;
}
