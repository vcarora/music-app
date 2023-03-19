import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { Song } from '../model/song';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  constructor(private http: HttpClient) { }

  getImages(): Observable<Array<Song>> {
    return this.http.get<Array<Song>>("http://localhost:8091/allImages");
  }

  getSongs(): Observable<any> {
    return this.http.get("http://localhost:8091/allSongs");
  }

  addSongForUser(song?: Song,email?:string) {
    return this.http.put<Song>(`http://localhost:8091/addTrack/${email}`, song);
  }

  getSongsForUser(email?:any):Observable<any>{
    return this.http.get(`http://localhost:8091/app/allTracks/${email}`);
  }

  getSongByName(name?:string):Observable<any>{
    return this.http.get(`http://localhost:8091/song/${name}`);
  }

  deleteSongForUser(email?:string,name?:string){
    return this.http.delete(`http://localhost:8091/app/deleteTrack/${email}/${name}`).pipe(
      tap(()=>{
        return this.refresh$.next();
      }) 
    );
  }

  public refresh$ = new Subject<void>();
  
  get refresh(){
      return this.refresh$;
  }
}
