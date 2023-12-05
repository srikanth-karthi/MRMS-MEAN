import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.css']
})
export class FolderComponent implements OnInit{
  @Input() foldernames:any=[]
  @Output() myEvent: EventEmitter<any> = new EventEmitter();

  // constructor(private service: ServicesService) { }
  ngOnInit(): void {
  
  }




  
gotofolder(folder:any) {
  this.myEvent.emit(folder);

  
}
}



