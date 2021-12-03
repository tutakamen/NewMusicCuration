import { Component, OnDestroy, OnInit } from '@angular/core';
import { Params,ActivatedRoute } from '@angular/router'; 
import { Subscription } from 'rxjs';
import { MusicDataService } from '../music-data.service';


@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit, OnDestroy {

results: any ; 
searchQuery: string= ""; 

resultSub: Subscription | undefined  ; 
paramSub: Subscription | undefined  ; 

  constructor(
    public route: ActivatedRoute,
    public musicData: MusicDataService
  ) { }

  ngOnInit(): void {
    //  this.searchQuery = this.route.snapshot.params['q'] ; //used once, to track we must use observable below 

    this.paramSub = this.route.queryParams.subscribe((params)=>{
       this.searchQuery  = params['search'] ; 
     })

    this.resultSub = this.musicData.searchArtists(this.searchQuery)
      .subscribe(data =>{
        console.log(data.artists.items[0].images[0].url  + "  ---- " + this.searchQuery); 
        this.results = data.artists.items.filter((value:any)=>{
          console.log(value) ; 
            return (value.images.length > 0)
        });

      })
      console.log(this.resultSub ) ; 
      console.log(this.results) ; 
      console.log(this.searchQuery ) ; 


  }

  ngOnDestroy() {
    this.resultSub?.unsubscribe();
    this.paramSub?.unsubscribe();

  }
  
  
}
