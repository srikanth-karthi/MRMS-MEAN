

export interface File {
    Originalname: string;
    fileName: string;
  }
  
  export interface Folder {
    name: string;
    folders: Folder[];
    files: File[];
  }
  
  export interface User {

    _id: string;
    folders: Folder[];
    outsideFiles: File[];
  }
  