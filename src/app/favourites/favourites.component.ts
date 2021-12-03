import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit , OnDestroy {

    favourites: Array<any> = []; 
    favouritesSub: Subscription  | undefined ; 
    removeFavouriteSub: Subscription  | undefined ; 
    
    constructor(public musicData:MusicDataService) { }

    removeFromFavourites(id:any){
      this.musicData.removeFromFavourites(id)
        .subscribe((data) => {
          this.favourites = data.tracks ; 
        }) 
    }

    ngOnInit(): void { 
      this.favouritesSub = this.favouritesSub = this.musicData.getFavourites()
      .subscribe(data =>{
        console.log(data) ; 
         this.favourites = data.tracks;
        });
    }; 
  
    ngOnDestroy() {
      this.favouritesSub?.unsubscribe();
      this.removeFavouriteSub?.unsubscribe();

    }
  

  }

