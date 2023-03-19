import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Song } from '../model/song';
import { userDetails } from '../model/userdetails';
import { AuthenticationService } from '../services/authentication.service';
import { ImagesService } from '../services/songDetails.service';

// playPauseBtn.addEventListener('click', () => {
//   const isMusicPaused = container.classList.contains('paused');
//   isMusicPaused ? pauseMusic() : playMusic();
//   playingNow();
// });

let controls = document.querySelectorAll("audio");
console.log(controls);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private auth: AuthenticationService, private images: ImagesService,private snackBar:MatSnackBar) { }
  user: userDetails = {};
  image: Song[] = [];
  song: [] = [];

  audio = new Audio();

  isPlaying: boolean = false;

  ngOnInit(): void {
    this.allImages();
    this.allSongs();
    // console.log(this.song);
  }

  allImages() {
    this.images.getImages().subscribe(data => {
      this.image = data;
      console.log(this.image);
    })
  }

  allSongs() {
    this.images.getSongs().subscribe((data: any) => {
      this.song = data;
      console.log(this.song);
    })
  }

  trackPointer: number = 0;

  play(index: number) {
    if (window.localStorage.getItem("email") == "") {
      alert("Login or Registration required to play songs");
    }
    else {
      // if (index === undefined) {
      //   if (this.audio.paused) {
      if (!this.isPlaying) {
        console.log(index);
        this.trackPointer = index;
        this.audio.src = "http://localhost:8091/downloadSong/" + this.song[this.trackPointer];
        this.audio.play();
        this.isPlaying = true;
      }
      else {
        this.audio.pause();
        let a = this.audio.currentTime;
        this.isPlaying = false;
      }
    }
  }

  // else {
  //   this.trackPointer = index;
  //   this.audio.src = "http://localhost:8091/downloadSong/" + this.song[this.trackPointer];
  //   this.audio.play();
  //   this.isPlaying = true;
  // }
  // }
// }

email ?: any = window.localStorage.getItem("email");

addToPlaylist(i: Song, email: string) {
  console.log(email);
  if (window.localStorage.getItem("email") == "") {
    alert("Login or Registration required to add songs to playlist");
  }
  else {
    this.snackBar.open('Song Added to playlist', 'Success', {​
      duration: 3000,​
       panelClass: ['mat-toolbar', 'mat-primary']​
     });
    this.images.addSongForUser(i, email).subscribe();
  }
}
}
