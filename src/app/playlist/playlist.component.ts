import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Song } from '../model/song';
import { AuthenticationService } from '../services/authentication.service';
import { ImagesService } from '../services/songDetails.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {

  constructor(private songs: ImagesService,private auth:AuthenticationService,private snackBar:MatSnackBar) { }

  mySongData: Song[] = [];

  id?: string;

  audio = new Audio();

  email: any = window.localStorage.getItem("email");

  isPlaying:boolean = false;

  ngOnInit(): void {
    this.songs.refresh$.subscribe(()=>{
        this.getSongs();
    });
    this.getSongs();
  }

  private getSongs(){
    this.songs.getSongsForUser(this.email).subscribe({
      next: (data: any) => {
        this.mySongData = data;
        console.log(this.mySongData);
      }
    });
  }

  play(name?: string) {
    this.songs.getSongByName(name).subscribe({
      next: data => {
      },
      error: err => {
        if(!this.isPlaying && window.localStorage.getItem("token") != ""){
          this.id = err.error.text;
          this.audio.src = `http://localhost:8091/downloadSong/${this.id}`;
          this.audio.play();
          this.isPlaying = true;
        }
        else{
          this.audio.pause();
          this.isPlaying = false;
        }
      }
    });
  }

  deleteSong(email?:string,name?: string) {
    for (let i = 0; i < this.mySongData.length; i++) {
      if (this.mySongData[i].pseudoName === name) {
        this.songs.deleteSongForUser(this.email,name).subscribe();
        this.audio.pause();
        this.isPlaying = false;
        this.snackBar.open('Song deleted from playlist', 'Success', {​
          duration: 3000,​
           panelClass: ['mat-toolbar', 'mat-primary']​
         });
      }
    }
  }


}
