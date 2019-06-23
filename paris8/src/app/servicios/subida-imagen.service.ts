import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SubidaImagenService {

  private url:string = environment.subirUrl;
  constructor( private http:HttpClient) {
  }
  subirImagen(datos:any):Observable<any>{
    return this.http.post(this.url, datos);
  }
  
}
