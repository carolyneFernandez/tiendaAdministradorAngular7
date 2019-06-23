import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { environment } from "../../environments/environment";

//  import { Subject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

	private urlLogin = environment.API_URL_Login;
	private url = environment.API_URL;

	
//	private resLogin: Object;
//	private resLogin$ = new Subject<any>();


	constructor(private http: HttpClient) { 
	//	this.resLogin = {login: false, usuario:""};
	}
	
	getLogin(log){
		//  Clonamos el objeto:
		let pa = JSON.parse(JSON.stringify(log));
		//  Le añadimos el nuevo atributo, servicio:
		pa.servicio = "inicio_sesion";
		return this.http.post<any>(this.urlLogin, JSON.stringify(pa));
	}

	compruebaEmail(log){
	
		let pa = JSON.parse(JSON.stringify(log));
		//  Le añadimos el nuevo atributo, servicio:
		pa.servicio = "comprobar_email";
		console.log(pa);
		return this.http.post<any>(this.urlLogin, JSON.stringify(pa));

	}
	registrar(log){
		//  Clonamos el objeto:
		let pa = JSON.parse(JSON.stringify(log));
		//  Le añadimos el nuevo atributo, servicio:
		pa.servicio = "registrar";
		return this.http.post<any>(this.urlLogin, JSON.stringify(pa));
	}

	//  Con este método conseguimos validar si el JWT actual es válido:
	validarLogin(){
		return this.http.post<any>(this.url, '{"servicio":"nada"}', environment.cabecera());
	}


}
