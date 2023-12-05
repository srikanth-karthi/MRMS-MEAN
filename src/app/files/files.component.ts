import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { ServicesService } from '../services.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css']
})
export class FilesComponent implements OnInit{
clikedfolder(foldername:any) {
  this.service.activefolder=foldername;
  let foldernamess=this.removefolder(this.folder,foldername)

  this.folder=foldernamess
  this.service.folder=foldernamess
    console.log(this.service.folder)
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
console.log(currentFolder)

}
 removefolder(arr: any[], fruit: string) {
  const index = arr.findIndex(item => item.toLowerCase() === fruit.toLowerCase());

  if (index !== -1) {
    return arr.slice(0, index + 1);
  } else {
    return arr; 
  }
}
handleEvent(foldernmaes: any) {
  
  this.folder.push(foldernmaes);
  console.log(this.folder)

  this.service.folder=this.folder
  console.log(  this.service.folder)
  this.service.activefolder=foldernmaes;
  let user = this.service.userjson;
  let pathArray = this.service.folder;
  const headfolder = this.service.activefolder
  if (headfolder !== pathArray[pathArray.length - 1]) {
    console.log(`Folder '${headfolder}' not found`);

  }
  let currentFolder = user.folders;
  console.log(pathArray)
  for (const folderName of pathArray) {
    const foundFolder = currentFolder.find((folder: { name: any; }) => folder.name === folderName);
    if (foundFolder) {
      currentFolder = foundFolder.folders;
    } else {
      console.log(`Folder '${folderName}' not found`);
    }
  }

  this.foldercomponentfoldername= currentFolder
console.log(currentFolder)
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
enablefolder: any=true;
foldercomponentfoldername:any=[]
nullfiles:boolean=false

activefoldername:any;
folder:any=[]
  constructor(private service:ServicesService,private router: Router){}

  foldernames:any=[];
  outerfiles:any=[]
  @Input() foldername: any;
  // @Output() hidefilecomponent = new EventEmitter<boolean>();

  ngOnChanges(changes: SimpleChanges): void {
    
    if (changes['foldername'] && !changes['foldername'].firstChange) {
      this.nullfiles=false
    console.log(this.foldername)

    this.foldernames.push(this.foldername);
    }
    if (changes['folder'] && !changes['folder'].firstChange) {
 
    }
  }
  ngOnInit(): void {
   
    this.service.userfiles().subscribe((data: any) => {
      
      console.log(data)
      if(data.msg==='Userdata not found')
      {
        this.nullfiles=true
      }
      else
      {
      this.service.userjson=data.user;
    this.outerfiles=data.outsideFileNames
      this.foldernames=data.folderNames;
      }
     
    })
    
  }



}
