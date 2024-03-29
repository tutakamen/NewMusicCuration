import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon'; 
import { MatSidenavModule } from '@angular/material/sidenav'; 
import { MatProgressBarModule } from '@angular/material/progress-bar'; 
import { MatMenuModule } from '@angular/material/menu'; 
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { MatListModule } from '@angular/material/list'; 
import { MatButtonModule } from '@angular/material/button'; 
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatInputModule } from '@angular/material/input'; 
import { MatCardModule } from '@angular/material/card'; 
import { MatChipsModule } from '@angular/material/chips'; 
import { FlexLayoutModule } from '@angular/flex-layout';
import { AboutComponent } from './about/about.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NewReleasesComponent } from './new-releases/new-releases.component';
import { AlbumComponent } from './album/album.component';
import { ArtistDiscographyComponent } from './artist-discography/artist-discography.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AlbumImageComponent } from './album-image/album-image.component'; 
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SearchResultComponent } from './search-result/search-result.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptTokenService } from './intercept-token.service';


@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    NotFoundComponent,
    NewReleasesComponent,
    AlbumComponent,
    ArtistDiscographyComponent,
    AlbumImageComponent,
    SearchResultComponent,
    FavouritesComponent,
    RegisterComponent,
    LoginComponent,
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    MatSnackBarModule, 
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule, 
    MatSidenavModule, 
    MatProgressBarModule, 
    MatMenuModule, 
    MatToolbarModule, 
    MatListModule, 
    MatButtonModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatCardModule, 
    MatChipsModule, 
    FlexLayoutModule,
    MatDialogModule,
  ],
  providers: [
    {
      //HTTP_INTERCEPTOR : A multi-provider token which represents the array of HttpInterceptors that are registered.
      provide: HTTP_INTERCEPTORS, // provide: mention it as HTTP_INTERCEPTORS
      useClass: InterceptTokenService, //useClass : mention the class which should be added to HttpInterceptors array
      multi: true //multi:true this is required setting which tells angular that token is multiprovider.
      //The application will throw error if you set it to false.
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
