import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { SpotifyTokenService } from './spotify-token.service';
import { environment } from './../environments/environment';
import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MusicDataService {
//  favouritesList:Array<any> = [] ; 

  constructor(private spotifyToken: SpotifyTokenService, private http: HttpClient) { }  

  getNewReleases(): Observable<any> {
    console.log("getNewReleases")
      return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
        return this.http.get<any>(`https://api.spotify.com/v1/browse/new-releases`, 
        { headers: 
          { "Authorization": `Bearer ${token}` } 
        });
      }));
  }

  getArtistById(id:any):Observable<any>{
    console.log("getArtistById" + id)

    return this.spotifyToken.getBearerToken()
    .pipe(mergeMap(token=>{
      return this.http.get<any>(`https://api.spotify.com/v1/artists/${id}`,
      { headers: 
        { "Authorization": `Bearer ${token}` } 
      }) ; 
    })) ;
  }

  getAlbumsByArtistId(id:any):Observable<any>{
    console.log("getAlbumsByArtistId" + id)

    var params = new HttpParams()
    .set("include_groups" , "album")
    .set("include_groups" , "single")
    .set("limit" , "50")

    return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
      return this.http.get<any>( `https://api.spotify.com/v1/artists/${id}/albums`, 
      { 
        headers: {  "Authorization": `Bearer ${token}`} , params : params 
      });
    }));
  }

  
  getAlbumById(id:any):Observable<any>{
      console.log("getAlbumById" + id)

      return this.spotifyToken.getBearerToken()
      .pipe(mergeMap(token=>{
        return this.http.get<any>(`https://api.spotify.com/v1/albums/${id}`,
        { headers: 
          { "Authorization": `Bearer ${token}` } 
        }) ; 
      })) ;
  }
  
  searchArtists(searchString:string):Observable<any>{
    console.log("searchArtists  " + searchString)

    var params = new HttpParams()
    .set("q" , searchString ) 
    .set("type" , "artist")
    .set("limit" , "50")

      return this.spotifyToken.getBearerToken()
      .pipe(mergeMap(token=>{
        return this.http.get<any>(`https://api.spotify.com/v1/search`,
        { 
          headers: {  "Authorization": `Bearer ${token}`} , params : params 
        }) ; 
      })) ;
  }

      addToFavourites(id:any): Observable<[String]> {
        console.log("addToFavourites" + id) ; 
        return this.http.put<[String]>(`${environment.userAPIBase}/favourites/${id}`,{params:id});//try removing paramas ?  ? 
    
      }
      
      removeFromFavourites(id:any): Observable<any> {
        console.log("removeFromFavourites" + id)

          return this.http.delete<[String]>(`${environment.userAPIBase}/favourites/${id}`)
            .pipe(mergeMap((favouritesArray) => {
              console.log("favouritesArray" + favouritesArray) ; 
                  if( (favouritesArray.length>0 ) && (favouritesArray.indexOf(id)!=-1)  ){
                    var position =  favouritesArray.indexOf(id,0) ;  
                    favouritesArray.splice(position,1) ; 
                  } else { 
                    console.log("Bad ID")
                  }
                return favouritesArray; 
          }));
      }
      
      getFavourites(): Observable<any> {
        return this.http.get<[String]>(`${environment.userAPIBase}/favourites/`)
          .pipe(mergeMap(favouritesArray => {
            if(  (favouritesArray.length > 0)  ) { 
              var params = new HttpParams() 
              .set(`ids` , `favouritesList.join(",")`)
          
                return this.spotifyToken.getBearerToken()
                .pipe(mergeMap(token=>{
                  return this.http.get<any>(`https://api.spotify.com/v1/tracks`,
                  { 
                    headers: {  "Authorization": `Bearer ${token}`} , params : params 
                  }) ; 
                })) ;
            }else{ 
              return new Observable(o=>{
                o.next([])
              });
            }
        }));
      }

}

   /*
    addToFavourites(id:any):boolean{
      console.log("addToFavourites" + id)

      if( (this.favouritesList.length<50 ) && id ){
        this.favouritesList.push(id) ; 
        return true ; 
      } else{ 
        return true ; 
      }
    }

    removeFromFavourites(id:any):Observable<any>{
      console.log("removeFromFavourites" + id)

      if( (this.favouritesList.length>0 ) && (this.favouritesList.indexOf(id)!=-1)  ){
       var position =  this.favouritesList.indexOf(id,0) ;  
       this.favouritesList.splice(position,1) ; 
      } else { 
        console.log("Bad ID")
      }
      return this.getFavourites() ; 
    }

    getFavourites():Observable<any>{
      console.log("getFavourites" )

      if(  (this.favouritesList.length > 0)  ) { 
        var params = new HttpParams()
        .set(`ids` , `favouritesList.join(",")`)
    
          return this.spotifyToken.getBearerToken()
          .pipe(mergeMap(token=>{
            return this.http.get<any>(`https://api.spotify.com/v1/tracks`,
            { 
              headers: {  "Authorization": `Bearer ${token}`} , params : params 
            }) ; 
          })) ;
      }else{ 
        return new Observable(o=>{
          o.next([])
        });
      }
    }

*/

