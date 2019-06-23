import { Component, OnInit } from '@angular/core';
import { PersonasService } from "../../servicios/personas.service";
import { UpdateMenuService } from "../../servicios/update-menu.service";
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from "../../servicios/login.service";
import { Persona } from 'src/app/modelos/persona';
import { AvisoComponent } from '../aviso/aviso.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

 
@Component({
  selector: 'app-personas-anade',
  templateUrl: './personas-anade.component.html',
  styleUrls: ['./personas-anade.component.css']
})
export class PersonasAnadeComponent implements OnInit {

	//private persona: {dni:string, nombre:string, apellidos:string};
//variable para select de tipo de usuario
	
private  errorFormulario:boolean=false;
private persona:Persona;
private textoBoton;
private textoCabecera;
private dniError:boolean;
private errorRol:boolean;
private errorEmail:boolean;

private listaRoles:Array<any>;
private options={"COD":-1,"NOMBRE":"Selecciona un rol"};

	constructor(private servicioPersonas: PersonasService, private servicioUpdateMenu: UpdateMenuService, 
		private ruta: Router, private servicioLogin: LoginService,private route:ActivatedRoute,private modalService:NgbModal) {
		this.persona = {id:-1,email:"",nombre:"",	apellidos:"",clave:"",tipo:"",dni:""}
		this.textoBoton="Añadir Usuario";
		this.textoCabecera="Formulario para Añadir Usuario";
	 }

  ngOnInit() {  //  Con esto evitamos que intente añadir uno nuevo (sin haber hecho login) poniendo la dirección en la url,
		//  Validamos el JWT que pudiera haber en localhost:
		if ((!localStorage.JWT) || ((localStorage.JWT.split(".").length != 3))||localStorage.rol=="user") {
			//  No hay JWT, o no tiene el formato correcto.
			localStorage.JWT = "";
			localStorage.nombreUsuario = "";
			//  Actualizamos el menú principal:
			this.servicioUpdateMenu.establecerLogin({login: false, usuario:""});
			//  Vamos a inicio:
			this.ruta.navigate(['/']);

		} else {
			this.servicioLogin.validarLogin().subscribe(
				res =>{
					if (!res.servicio) {  //  Si no devuelve servicio, es que el JWT NO es válido.
						localStorage.JWT = "";
						localStorage.nombreUsuario = "";
						//  Actualizamos el menú principal:
						this.servicioUpdateMenu.establecerLogin({login: false, usuario:""});
						//  Vamos a inicio:
						this.ruta.navigate(['/']);
					}else{
						//cojemos el parametro que le pasamos
						const userId=this.route.snapshot.params["id"];
						if(userId !=-1){//cuadno es diferente a -1 sabemos que es modificacion
							this.textoCabecera="Modificación de Usuario"
							this.textoBoton="Modificar";
							this.servicioPersonas.listarId(userId).subscribe(
								res=>{//Haremos esta comparacion para que no nos metan otro numero por la direccion de busqueda
									console.log(res);
									if(res==false){//si metemos un parametro que no existe nos redirigira a lista de personas
										this.ruta.navigate(['/personas-listar']);

									}else{
										this.persona=res;
									}
									
								},
								error=>console.log(error)
							)
						}
						//COJEMO LOS DATOS DE LOS ROLES:
						this.servicioPersonas.mostrarRol().subscribe(
							res=>{
								this.listaRoles=res;
								//SI NO EXISTE TIPO ASIGNAMOS UN SELECCIONA OPCION AL ARRAY 
								if(!this.persona.tipo){
									this.listaRoles.unshift(this.options);
									//Asignamos al array de persona  al campo tipo el valor que tiene nuestro primer dato del array
									this.persona.tipo=this.listaRoles["0"].COD;
								}
							}
						)
					}
				},
				error => console.log(error)
			);
		}
	}
	
	abrirMensaje(aviso:string,tipoAviso:string,textoHeader:string) {
		localStorage.aviso=aviso;
		localStorage.tipoAviso=tipoAviso;
		localStorage.heder=textoHeader;
	const modalRef = this.modalService.open(AvisoComponent);
	
	modalRef.result.then((result) => {
	  console.log(result); 
  
	}).catch((error) => {
	  console.log("toy en error de app.component", error);
	});
  }


	validar(log) {
		//INICIAMOS LAS VARIABLES TODAS EN FALSE AL INICIO DE LA VALIDACION
		this.dniError=false;
		this.errorRol=false;
		
		 if(!this.validadDNI(log.dni)){
			this.dniError=true;
			this.errorFormulario=true;
		}else if(log.tipo==-1){
			this.errorRol=true;
			this.errorFormulario=true;
		}else{
			this.errorFormulario=false;

		}
		if(!this.errorFormulario){
			if(log.id!=-1){ 
				this.servicioPersonas.mod(log).subscribe(
					res=>{
						if ((res.sesion) && (res.sesion == "NO")) {
							//  No se ha iniciado sesión, nos vamos al login:
							localStorage.JWT = "";
							localStorage.nombreUsuario = "";
							//  Actualizamos el menú principal:
							this.servicioUpdateMenu.establecerLogin({login: false, usuario:""});
							//  Vamos a inicio:
							this.ruta.navigate(['/']);
						} else {
							this.abrirMensaje("Usuario modificado correctamente","AVISO","MODIFICACIÓN");

							//  Vamos a la lista de personas:
							this.ruta.navigate(['personas-listar']);
						}
						
					},
					error=>console.log(error)

				)
					
				
			}else{
				//  Añadimos una nueva persona:
			this.servicioPersonas.anadir(log).subscribe(
				res=>{
					if ((res.sesion) && (res.sesion == "NO")) {
						//  No se ha iniciado sesión, nos vamos al login:
						localStorage.JWT = "";
						localStorage.nombreUsuario = "";
						//  Actualizamos el menú principal:
						this.servicioUpdateMenu.establecerLogin({login: false, usuario:""});
						//  Vamos a inicio:
						this.ruta.navigate(['/']);
					} else {
						//alert("Persona añadida PERFECTAMENTE!!!!");
						//  Vamos a la lista de personas:
						this.ruta.navigate(['personas-listar']);
					}
				},
				error=>console.log(error)
			);
	
			}
		}
		
	
		
	}

	PermisoSoloLetrasEspacios(evento){
		var evento = evento || window.event;
		var codigoCar= evento.charCode || evento.keyCode;
		if(this.persona.nombre.valueOf().length<3 && codigoCar==32){
			return false;
		}
		
		if((codigoCar>=65 && codigoCar<=90 ||codigoCar ==32 ||codigoCar>=97 && codigoCar<=122)){
			return true;
		}
		else{
			return false;
		}
	
	}

/******FUNCION PARA VALIDAR UN DNI***** */
validadDNI(nif){
	var letras="TRWAGMYFPDXBNJZSQVHLCKET";
	if(nif.length != 9){
		return false;
	}
	var dni=nif.substring(0,8);
	return (letras[dni%23]==nif[8].toUpperCase());
}

seleccion(parametro){
	
	if(parametro==-1){
		 this.errorRol=true;
	}else{
	   this.errorRol=false;
	}
 }
 
}
