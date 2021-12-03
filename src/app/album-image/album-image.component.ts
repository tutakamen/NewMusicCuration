import { Component, Inject } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';



@Component({
  selector: 'app-album-image',
  templateUrl: './album-image.component.html',
  styleUrls: ['./album-image.component.css']
})

export class AlbumImageComponent  {

  src:any = '' ; 


  constructor(@Inject(MAT_DIALOG_DATA) public data:any) { }

  

}
