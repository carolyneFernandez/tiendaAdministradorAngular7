import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { environment } from "../../environments/environment";
import { Persona } from '../modelos/persona';

@Injectable({
  providedIn: 'root'
})
export class PersonasService {

	private url = environment.API_URL;

	constructor(private http: HttpClient) { }
	
	listar(){
		let pa = JSON.stringify({
			servicio: "listadoPersonas"
		});
		return this.http.post<any>(this.url, pa, environment.cabecera());
	}

	anadir(persona){
		//  Clonamos el objeto:
		let pa = JSON.parse(JSON.stringify(persona));
		//  Le añadimos el nuevo atributo, servicio:
		pa.servicio = "insertarPersona";
		return this.http.post<any>(this.url, JSON.stringify(pa), environment.cabecera());
	}

	/****SACA UNA LISTA DE TODOS LOS ROLES DISPONIBLES EN LA BD*******/
	mostrarRol(){
		let pa = JSON.parse(JSON.stringify({
			servicio: "listarRol"
		}));
		return this.http.post<any>(this.url, pa, environment.cabecera());
	}
	//SACAREMOS DATOS DE UNA PERSONA QUE COINCIDA CON EL IDCLIENTE
	listarId(id){
		let pa=JSON.parse(JSON.stringify({
			servicio:"listarPersonaId",
			id:id
		  }));
		  return this.http.post<any>(this.url,pa,environment.cabecera());
	}

	//BORRAREMOS UN USUARIO y devolvera un array si todo va bien
	delet(id){
		let pa=JSON.parse(JSON.stringify({
			servicio:"borrarPersona",
			id:id
		  }));
		  return this.http.post<any>(this.url,pa,environment.cabecera());
	}

	//MODIFICAR PERSONA
	mod(persona:Persona){
		let pa=JSON.parse(JSON.stringify({
			servicio:"modificaPersona",
			persona:persona,
			id:persona.id
		  }))
		  return this.http.post<any>(this.url,pa,environment.cabecera());
	}
	

	//modificar clave
	modClave(persona){
		console.log(persona);
		let pa=JSON.parse(JSON.stringify({
			servicio:"modificaClave",
			clave:persona.clave,
			claveDeAHORA:persona.clave1,
			id:persona.id
		  }));
		  return this.http.post<any>(this.url,pa,environment.cabecera());
	}
}
