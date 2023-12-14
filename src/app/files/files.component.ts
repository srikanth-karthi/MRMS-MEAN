import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ServicesService } from '../services.service';
import { Router } from '@angular/router';
import { User } from '../model/usermodel';
@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css']
})
export class FilesComponent implements OnInit{
  @Input() foldername: any;
  constructor(private service:ServicesService,private router: Router){}
  enablefolder: boolean=true;
  nullfiles:boolean=false
  activefoldername:any;
  foldercomponentfoldername:any=[]
  folder:any=[]
    foldernames:any=[];
    outerfiles:any=[]
    emptyUser: User = {
      _id: '',
      folders: [],
      outsideFiles: []
    };
  
clikedfolder(foldername:any,index:number) {
  this.service.activefolder=foldername;
  let foldernamess=this.removefolder(this.folder,foldername,index)
  this.folder=foldernamess
  this.service.folder=foldernamess

  this.iterative();
}
iterative()
{

  let user = this.service.userjson;
  let pathArray = this.service.folder;
  const headfolder = this.service.activefolder
  if (headfolder !== pathArray[pathArray.length - 1]) {
    console.log(`Folder '${headfolder}' not found`);

  }
  let currentFolder = user.folders;

  for (const folderName of pathArray) {
    const foundFolder = currentFolder.find((folder: { name: any; }) => folder.name === folderName);
    if (foundFolder) {
      currentFolder = foundFolder.folders;
    } else {
      console.log(`Folder '${folderName}' not found`);
    }
  }
  this.foldercomponentfoldername= currentFolder
}
removefolder(arr: any[], foldername: string, index: number) {
  if (index >= 0 && index < arr.length) {
    // Remove elements after the specified index
    return arr.slice(0, index + 1);
  } else {
    // If the index is invalid or out of bounds, return the original array
    return arr;
  }
}

handleEvent(foldernmaes: any) {
  this.folder.push(foldernmaes);
  this.service.folder=this.folder
  this.service.activefolder=foldernmaes;
  this.iterative();
}
gotofolder(foldernmaes:any)
{
  this.enablefolder=!this.enablefolder
  this.handleEvent(foldernmaes);
}
todashboard() {
  this.service.activefolder=null;
  this.enablefolder=!this.enablefolder
  this.service.folder=[]
  this.folder=[];
  this.foldercomponentfoldername=[]
}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['foldername'] && !changes['foldername'].firstChange) {
      this.nullfiles=false
    this.foldernames.push(this.foldername);
    }
  }
  ngOnInit(): void {
    this.service.userfiles().subscribe((data: any) => {
      console.log(data)
      if(data.msg==='Userdata not found')
      {
        this.service.userjson=this.emptyUser
        this.nullfiles=true
      }
      else
      {
      this.service.userjson=data.user;
     this.outerfiles=this.service.userjson.outsideFiles
     this.foldernames= this.service.userjson.folders.map(folder => folder.name);

      }
     
    })
    
  }



}
