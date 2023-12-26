// File Interface
export interface File {
  Originalname: string;
  fileName: string;
  role: 'admin' | 'user' | 'hospital';
  uploadername: string | number;
  fileType: string;
  fileSize: number;
  uploadDate: string;
}

// Folder Interface
export interface Folder {
  name: string;
  role: 'admin' | 'user' | 'hospital';
  uploadername: string | number;
  folders: Folder[];
  files: File[];
}

// User Interface
export interface User {
  Id: string;
  filesize: number;
  folders: Folder[];
  outsideFiles: File[];
}
