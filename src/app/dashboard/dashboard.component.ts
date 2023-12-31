import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { User } from '../model/usermodel';
import { Router } from '@angular/router';
import { ServicesService } from '../services.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private service: ServicesService,
    private router: Router,
    private el: ElementRef,
    private renderer: Renderer2
  ) { }

  folderForm!: FormGroup;
  selectedFolderName: string | null = null;
  selectedFiles: FileList | null = null;
  foldername: string = '';
  showCreateFolderModal: boolean = false;
  folderName: string = 'New Folder';
  userName!: string;
  userImage!: string;
  userEmail!: string;
  @ViewChild('fileInput') fileInput!: ElementRef;
  
  openFolderInput() {
    const inputElement: HTMLElement = document.getElementById('folderInput') as HTMLElement;
    inputElement.click();
  }
  handleFolderSelect(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.selectedFiles = target.files;
      const firstFilePath = this.selectedFiles[0].webkitRelativePath || this.selectedFiles[0].name;
      this.selectedFolderName = firstFilePath.split('/')[0];

    }
    this.uploadFolder()
  }
  uploadFolder() {
    if (this.selectedFiles && this.selectedFolderName) {
      const formData = new FormData();
      for (let i = 0; i < this.selectedFiles.length; i++) {
        formData.append('files', this.selectedFiles[i]);
      }
      if (
        (this.service.folder.length < 1 && this.service.activefolder == null) ||
        undefined
      ) 
      {

      this.service.uploadFolder(formData, this.selectedFolderName).subscribe((data: any) => {
        try {
          if (data.status == 'success') {
            this.service.userjson.folders.push(data.data)
            this.foldername = data.data.name
          } else if (data.status == 'samename') {
            this.toastr.warning(`${data.message}`, 'Warning');
          }

        }
        catch { }
      })
    }
    else
    {
      this.service.uploadFoldertofolder(formData, this.selectedFolderName).subscribe((data: any) => {
        try {
          if (data.status == 'success') {
            console.log(data)
            let currentFolder= this.alteruserdata();
            currentFolder.push(data.data)
            console.log(this.service.userjson)
          } else if (data.status == 'samename') {
            this.toastr.warning(`${data.message}`, 'Warning');
          }

        }
        catch { }
      })
    }
    } else {
      console.warn('No folder selected or no files in the folder.');
    }
  }
  openFileInput(): void {
    this.fileInput.nativeElement.click();
  }
  handleFileInput(event: any): void {
    const selectedFiles: FileList = event.target.files;

    if (!selectedFiles || selectedFiles.length === 0) {
      alert('Please select files to upload.');
      return;
    }

    const formData = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append('files', selectedFiles[i]);
    }

    this.uploadFiles(formData);
  }
  uploadFiles(formData: FormData): void {
    let user: User = this.service.userjson;
    if (
      (this.service.folder.length < 1 && this.service.activefolder == null) ||
      undefined
    ) {
    
      this.service.uploadoutsidefolder(formData).subscribe((data: any) => {
          user.outsideFiles = user.outsideFiles.concat(data.data);
          this.service.userjson = user;
          console.log(this.service.userjson)
  
      },
      (err:any)=>
      {
        this.toastr.error(
          err.message
         );
         return;
      }
      );
    } else {
      this.service.uploadFiles(formData).subscribe((data: any) => {
        try {
          let pathArray = this.service.folder;
          const headfolder = this.service.activefolder;
          if (headfolder !== pathArray[pathArray.length - 1]) {
            throw new Error("Some thing went wrong");
          }
          let currentFolder: any = user;
          for (const folderName of pathArray) {
            const foundFolder = currentFolder.folders.find(
              (folder: { name: any }) => folder.name === folderName
            );
            if (foundFolder) {
              currentFolder = foundFolder;
            } else {
              throw new Error("Some thing went wrong");
            }
          }
          currentFolder.files = currentFolder.files.concat(data.data);
          this.service.userjson = user;
          console.log(this.service.userjson)
        } catch (err:any) {

          this.toastr.error(
            err.message
           );
           return;
        }
      },
      (err:any)=>
      {
        this.toastr.error(
          err.message
         );
         return;
      });
    }
  }
  cancelCreateFolder() {
    this.showCreateFolderModal = false;
  }
  alteruserdata() {

    let user = this.service.userjson;
    let pathArray = this.service.folder;
    const headfolder = this.service.activefolder
    if (headfolder !== pathArray[pathArray.length - 1]) {
      console.log(`Folder '${headfolder}' not found`);
    }
    let currentFolder = user.folders;

    for (const folderName of pathArray) {
      const foundFolder = currentFolder.find(
        (folder: { name: any }) => folder.name === folderName
      );
      if (foundFolder) {
        currentFolder = foundFolder.folders;
      } else {
        console.log(`Folder '${folderName}' not found`);

      }
    }
    return currentFolder;


  }
  confirmCreateFolder() {
    if (this.folderForm.valid) {
      
    
    this.folderName=this.folderForm.value.folderName
    this.showCreateFolderModal = false;

    if (this.service.activefolder != null) {
      this.service.createFoldertofolder(this.folderName).subscribe((data: any) => {

        if (data.status == 'success') {
          let currentFolder= this.alteruserdata();
         
          currentFolder.push(data.data);
       
          console.log(this.service.userjson)
        } else if (data.status == 'samename') {
          this.toastr.warning(`${data.message}`, 'Warning');
        }

      });
    } else {
      this.service.createafolder(this.folderName).subscribe((data: any) => {
        if (data.status == 'sucess') {
          this.foldername = this.folderName;
     
          this.service.userjson.folders.push(data.data) 
          console.log(this.service.userjson)
        } else if (data.status == 'samename') {
          this.toastr.warning(`${data.message}`, 'Warning');

        }
      });

    }
  }
  }
  createNewFolder() {
    this.showCreateFolderModal = true;

  }
  logout() {
    this.service.logout();
    this.service.isenabledashboard = false;
    this.router.navigateByUrl('/');
  }
  ngOnInit() {
    this.folderForm = this.formBuilder.group({

      folderName: ['', [Validators.required, Validators.maxLength(20)]]
    });
   this.service.userdata().subscribe(
  (data: any) => {
    console.log(data);
    sessionStorage.setItem('userName', data.name);   
    sessionStorage.setItem('userImage', data.profile);
    sessionStorage.setItem('userEmail', data.email);
    this.userName = data.name;
    this.userImage = data.profile;
    this.userEmail = data.useremail;
  },
  (error: any) => {
    console.error('An error occurred:', error.error);

  }
);

    const script = this.renderer.createElement('script');
    script.type = 'text/javascript';
    script.src =
      'https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/6.4.2/mdb.min.js';
    this.renderer.appendChild(this.el.nativeElement, script);
  }
}
