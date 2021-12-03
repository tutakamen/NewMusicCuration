import { Component, OnDestroy, OnInit } from '@angular/core';
import { MusicDataService } from '../music-data.service';
import {ActivatedRoute} from '@angular/router'
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit, OnDestroy {

  album:any   ; 
  
  albumsSub: Subscription | undefined; 
  paramSub: Subscription | undefined  ; 
  favouriteSub : Subscription | undefined  ;
  ids:any ; 

  //fires when begining life of component, and initialiizng services
  //state initialisation e.g of variables like releases 
  constructor( public musicData: MusicDataService ,
                  public route:ActivatedRoute ,
                  public matBar: MatSnackBar) {   }

  addToFavourites(trackID:any){
      this.favouriteSub = this.musicData.addToFavourites(trackID)
        .subscribe((response)=>{
          console.log('response received' + response)
          this.matBar.open("Adding to Favourites...", "Done", { duration: 1500 });
        },
        (error)=>{
          this.matBar.open("Unable to add song to Favourites,sorry", "Not Done", { duration: 15500 });
          console.log('error received' + error.message )
        })
  }

  //when coponent is initialised, after servies etc are ready
  //make async code , or calculations 
  ngOnInit(): void {

    this.paramSub = this.route.params.subscribe((params)=>{
      this.ids  = params['id'] ; 
    })
    console.log(this.ids) ; 

    // this.album = albumData ;  
    this.albumsSub =  this.musicData.getAlbumById(this.ids)
      .subscribe( AlbumData => {
       this.album = AlbumData  ;
       console.log(AlbumData) ; 

    })
    console.log(this.album) ; 


  }


  ngOnDestroy() {
    this.albumsSub?.unsubscribe();
    this.paramSub?.unsubscribe();
    this.favouriteSub?.unsubscribe();

  }

}
