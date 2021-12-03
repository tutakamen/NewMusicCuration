import { Component, OnDestroy, OnInit } from '@angular/core';
import { AlbumImageComponent } from '../album-image/album-image.component';
// import albumData from '../data/SearchResultsAlbums.json'; 
// import artistData from '../data/SearchResultsArtist.json'; 
import { MatDialog } from '@angular/material/dialog';
import { Params, ActivatedRoute} from '@angular/router'
import { MusicDataService } from '../music-data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-artist-discography',
  templateUrl: './artist-discography.component.html',
  styleUrls: ['./artist-discography.component.css']
})

export class ArtistDiscographyComponent implements OnInit, OnDestroy {
 
  albums:any ; 
  artist:any; 
  //// type any would as well, ie: releasesSub: any;
  artistsSub: Subscription | undefined; 
  albumsSub: Subscription | undefined; 
  paramSub: Subscription | undefined  ; 
  ids:any ; 

  openDialog(_data:any) {
    console.log(_data);
    this.dialog.open(AlbumImageComponent, {data:{images: _data }});
  }

  constructor(  public dialog: MatDialog  , 
                public route: ActivatedRoute , 
                public musicData:MusicDataService ) {}

  ngOnInit(): void {
    
    //  let id = this.route.snapshot.params['id'];

     this.paramSub = this.route.params.subscribe((params)=>{
      this.ids  = params['id'] ; 
     })
    console.log(this.ids) ; 

    this.artistsSub =  this.musicData.getArtistById(this.ids)
                        .subscribe(Artistdata=>{
                          this.artist = Artistdata ; 
                                })

  this.albumsSub =  this.musicData.getAlbumsByArtistId(this.ids).subscribe(ArtistAlbumData=>{
      this.albums = ArtistAlbumData.items.filter(
        (curValue:any, index:any, self:any) => 
          self.findIndex((t:any) => 
            t.name.toUpperCase()
              === curValue.name.toUpperCase()) === index) ; 
    })
  }

  ngOnDestroy() {
    this.albumsSub?.unsubscribe();
    this.artistsSub?.unsubscribe();
    this.paramSub?.unsubscribe();

  }

}
