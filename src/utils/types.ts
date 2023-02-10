export interface Board {
  name: string;
  id: string;
  imageUrl: string;
  collaborators: undefined | string[];
  taskColumns: {
    id: string;
    name: string;
    tasks: [];
    createdAt: string;
    updatedAt: string;
  }[];
}

export interface dragDropColumn {
  id: string;
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
