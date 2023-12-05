import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  uploadoutsidefolder(formData: FormData) {
    const yourToken = sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${yourToken}`);
    return this.http.post(`/api/uploadfiles`,formData, { headers });
  }
  createFolder(folderName: string) {
    const yourToken = sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${yourToken}`);
    return this.http.post(`/api/folder`,{foldername:folderName,headfolder:this.activefolder,folderpath:this.folder}, { headers });
  }

  isenabledashboard: boolean = false;
activefolder:any;
folder:any=[];
userjson:any;
 
  constructor(private http: HttpClient) {}

  logout(): Observable<any> {
    const yourToken = sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${yourToken}`);
    return this.http.get(`/logout`, { headers });
  }

  login(email: any, password: any): Observable<any> {
    return this.http.post(`/api/login`, { email, password });
  }

  register(name: any, email: any, password: any): Observable<any> {
    return this.http.post(`/api/register`, { name, email, password });
  }

  userdata(): Observable<any> {
    const yourToken = sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${yourToken}`);
    return this.http.post(`/api/getprofile`,{}, { headers });
  }
  profile(formData: FormData): Observable<any> {
    const yourToken = sessionStorage.getItem('token');
    console.log(yourToken)
    const headers = new HttpHeaders().set('Authorization', `Bearer ${yourToken}`);
    return this.http.put(`/api/profilephoto`, formData, { headers });
  }
  createafolder(foldername:string)
  {
    const yourToken = sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${yourToken}`);
    return this.http.post(`/api/newfolder`,{foldername}, { headers });
  }
  uploadFiles(formData: FormData) {
    const yourToken = sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${yourToken}`);
    const folderpath = this.folder;
    const headfolder = this.activefolder;
  
    return this.http.post(`/api/uploadfiles/${folderpath}/${headfolder}`, formData, { headers });
  }
  
  userfiles()
  {
    const yourToken = sessionStorage.getItem('token');
    console.log(yourToken)
    const headers = new HttpHeaders().set('Authorization', `Bearer ${yourToken}`);
    return this.http.get(`/api/files`, { headers });
  }

}