import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  {
  constructor(private router: Router,private services: ServicesService){}

  login()
  {
    const retrievedData = sessionStorage.getItem('userName');
if(retrievedData != null)
{
  this.services.isenabledashboard = true;
  this.router.navigateByUrl('/dashboard');
}else{
  this.router.navigateByUrl('/login');
}
  }
}

