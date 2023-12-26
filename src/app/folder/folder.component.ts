import { Component, EventEmitter, Input, Output } from '@angular/core';


@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.css']
})
export class FolderComponent  {
  @Input() foldernames:any=[]
  @Output() myEvent: EventEmitter<any> = new EventEmitter();
  
gotofolder(folder:any) {
  this.myEvent.emit(folder);
}
showDropdown = false;

toggleOptions() {
  this.showDropdown = !this.showDropdown;
}

performAction(action: string) {
  // Handle actions here based on 'action' parameter
  console.log(`Performing ${action}`);
  // Add logic based on the action clicked
}
}



