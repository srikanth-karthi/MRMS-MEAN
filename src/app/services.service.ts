import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './model/usermodel';

@Injectable({
  providedIn: 'root'
})

export class ServicesService {

  isenabledashboard: boolean = false;
  activefolder: any;
  folder: any = [];
  userjson!: User;

  constructor(private http: HttpClient) {}

  // user
  logout(): Observable<any> {
    return this.http.get(`/logout`);
  }
  refreshToken() {
    return this.http.get(`/api/users/refreshtoken`, {});
     }


  userdata(): Observable<any> {
    return this.http.post(`/api/users/getprofile`, {});
  }

  profile(formData: FormData): Observable<any> {
    return this.http.put(`/api/users/profilephoto`, formData);
  }

  userfiles() {
    return this.http.get(`/api/users/files`);
  }

  // folder

  createFoldertofolder(folderName: string) {
    return this.http.post(`/api/folder/folder`, {
      foldername: folderName,
      headfolder: this.activefolder,
      folderpath: this.folder
    });
  }

  uploadFolder(formData: FormData, foldername: string) {
    return this.http.post(`/api/folder/uploadfolder/${foldername}`, formData);
  }

  createafolder(foldername: string) {
    return this.http.post(`/api/folder/newfolder`, { foldername });
  }

  uploadFoldertofolder(formData: FormData, foldername: string) {
    const folderpath = this.folder;
    const headfolder = this.activefolder;
    return this.http.post(`/api/folder/uploadtofolder/${foldername}/${folderpath}/${headfolder}`, formData);
  }

  // files
  uploadFiles(formData: FormData) {
    const folderpath = this.folder;
    const headfolder = this.activefolder;
    return this.http.post(`/api/files/uploadfiles/${folderpath}/${headfolder}`, formData);
  }

  uploadoutsidefolder(formData: FormData) {
    return this.http.post(`/api/files/uploadfiles`, formData);
  }
}
