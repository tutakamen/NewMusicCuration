import { Component,  OnInit ,  OnDestroy } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { AlbumImageComponent } from '../album-image/album-image.component';
import {MusicDataService } from '../music-data.service'
import { ActivatedRoute } from '@angular/router';  
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-new-releases',
  templateUrl: './new-releases.component.html',
  styleUrls: ['./new-releases.component.css']
})


export class NewReleasesComponent implements OnInit, OnDestroy {

  releases:any ; 

  releasesSub: Subscription | undefined; // type any would as well, ie: releasesSub: any;

  openDialog(_data:any) {
    console.log(_data);
    this.dialog.open(AlbumImageComponent, {data:{images: _data }});
  }

  checkRoutes(par:any){
    console.log(par);
  }

  constructor(public dialog: MatDialog , 
              public music:MusicDataService , 
              public route: ActivatedRoute) { }

  ngOnInit(): void {
     this.releasesSub = this.music.getNewReleases().subscribe(data=>
      this.releases = data.albums.items  
      ) ; 
  }

  ngOnDestroy() {
    this.releasesSub?.unsubscribe();
  }
  
}
