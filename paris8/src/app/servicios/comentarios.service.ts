import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ComentariosService {
  private urlLogin = environment.API_URL_Login;
	private url = environment.API_URL;



	constructor(private http: HttpClient) { 
	//	this.resLogin = {login: false, usuario:""};
	}
	
	getComentario(){
		//  Clonamos el objeto:
    let pa=JSON.stringify({
      servicio:"listarComentarios"
    });	
    return this.http.post<any>(this.url,pa,environment.cabecera());
  }
  
addComentario(comentario){
 // var fecha=new Date();
 // comentario.FECHA=fecha;
  let pa=JSON.parse(JSON.stringify({
    servicio:"insertarComentario",
    comentario:comentario,
    
   }));
   console.log(pa);
   return this.http.post<any>(this.url,pa,environment.cabecera());
  }
}
