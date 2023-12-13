import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services.service';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent  implements OnInit{
  userName!: any ;
  userImage!: any;
  userEmail!: any;
  selectedFile!: File | null;

  constructor(private service:ServicesService) {}
  ngOnInit(): void {
    this.userName=sessionStorage.getItem('userName')
    this.userImage=sessionStorage.getItem('userImage')
    this.userEmail=sessionStorage.getItem('userEmail')

    }
  

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.onSubmit()
  }
  onSubmit() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile); 
      console.log(this.userEmail)
      formData.append('userEmail', this.userEmail);

  
      this.service.profile(formData).subscribe(
        (response: any) => {
          console.log(response);
            sessionStorage.setItem('userImage',response.imageUrl );
          this.userImage=response.imageUrl;
        },
        (error: any) => {
       
          console.error(error);
        }
      );
    }
  }
  
}
