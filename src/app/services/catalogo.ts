import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CatalogoService {

  private http = inject(HttpClient);

  private apiUrl = 'https://akabab.github.io/superhero-api/api/all.json';

  obtenerSuperheroes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}