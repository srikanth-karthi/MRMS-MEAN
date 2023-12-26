import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User} from './model/usermodel';


@Injectable({
  providedIn: 'root'
})

export class ServicesService {
  isenabledashboard: boolean = false;
  activefolder:any;
  folder:any=[];
  userjson!:User;
  
  constructor(private http: HttpClient) {}
  
  //user
  logout(): Observable<any> {
    const yourToken = sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${yourToken}`);
    return this.http.get(`/logout`, { headers });
  }
  
  login(email: any, password: any): Observable<any> {
    return this.http.post(`/api/users/login`, { email, password });
  }
  
  register(name: any, email: any, password: any): Observable<any> {
    return this.http.post(`/api/users/register`, { name, email, password });
  }
  
  userdata(): Observable<any> {
    const yourToken = sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${yourToken}`);
    return this.http.post(`/api/users/getprofile`,{}, { headers });
  }
  profile(formData: FormData): Observable<any> {
    const yourToken = sessionStorage.getItem('token');
    console.log(yourToken)
    const headers = new HttpHeaders().set('Authorization', `Bearer ${yourToken}`);
    return this.http.put(`/api/users/profilephoto`, formData, { headers });
  }

  userfiles()
  {
    const yourToken = sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${yourToken}`);
    return this.http.get(`/api/users/files`, { headers });
  }

  //folder

  createFoldertofolder(folderName: string) {
    const yourToken = sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${yourToken}`);
    return this.http.post(`/api/folder/folder`,{foldername:folderName,headfolder:this.activefolder,folderpath:this.folder}, { headers });
  }
  
  uploadFolder(formData: FormData,foldername:string) {
    const yourToken = sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${yourToken}`);
    return this.http.post(`/api/folder/uploadfolder/${foldername}`,formData, { headers });
  }
  
  createafolder(foldername:string)
  {
    const yourToken = sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${yourToken}`);
    return this.http.post(`/api/folder/newfolder`,{foldername}, { headers });
  }

  uploadFoldertofolder(formData: FormData,foldername:string) {
    const yourToken = sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${yourToken}`);
    const folderpath = this.folder;
    const headfolder = this.activefolder;
    return this.http.post(`/api/folder/uploadtofolder/${foldername}/${folderpath}/${headfolder}`, formData, { headers });
  }


  //files
  uploadFiles(formData: FormData) {
    const yourToken = sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${yourToken}`);
    const folderpath = this.folder;
    const headfolder = this.activefolder;
    return this.http.post(`/api/files/uploadfiles/${folderpath}/${headfolder}`, formData, { headers });
  }
  uploadoutsidefolder(formData: FormData) {
    const yourToken = sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${yourToken}`);
    return this.http.post(`/api/files/uploadfiles`,formData, { headers });
  }

}