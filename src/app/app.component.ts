/********************************************************************************* * 
 * WEB422 – Assignment 06
 * * I declare that this assignment is my own work in accordance with Seneca Academic Policy. 
 * No part of this * assignment has been copied manually or electronically from any other source (including web sites) or 
 * * distributed to other students. 
 * * * Name: Mustafa Bukhari Student ID: 133998195  Date: 18 November 2021 
 * 
 * Angular App (Deployed) Link: https://61aa263f4f68425e2b2e414c--gifted-johnson-97eac1.netlify.app/
 *
 * User API (Heroku) Link: https://pure-eyrie-80276.herokuapp.com/ 
 * ********************************************************************************/ 

import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  searchString: string = ""; 
  title = 'web422-a4';
  public token: any;

  constructor( private router: Router ,private auth: AuthService){}
  
  
  ngOnInit(): void {
    this.router.events
      .subscribe((event) => { //removed :Event !!! 
      if (event instanceof NavigationStart) { // only read the token on "NavigationStart"
        this.token = this.auth.readToken();
      }
    });
  }

  handleSearch():void{
    this.router.navigate(['/search'], { queryParams: { search: this.searchString } });
    this.searchString = ""; 
  }

  logout():void{
    localStorage.clear();
    this.router.navigate(['/login'] );
  }




}
