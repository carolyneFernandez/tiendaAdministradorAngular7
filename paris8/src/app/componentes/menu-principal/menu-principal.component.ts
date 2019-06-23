import { Component, OnInit } from '@angular/core';
import { LoginService } from "../../servicios/login.service";
import { UpdateMenuService } from "../../servicios/update-menu.service";
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
 
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from "../login/login.component";
import { AvisoComponent } from '../aviso/aviso.component';
 

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrls: ['./menu-principal.component.css']
})
export class MenuPrincipalComponent implements OnInit {

	
	public navBar = {
		isNavbarCollapsed: true,
		perfil: {
			dropdown: true
		},
		login: false,
		usuario: "",
		rol: ""
	}
	private resLogin$: Observable<any>;
	private rolUser:boolean;//usamos este boolean para saber si el usuario es usuario o no

	constructor(private servicioLogin: LoginService, private servicioUpdateMenu: UpdateMenuService, 
								private ruta: Router, private modalService: NgbModal) {
		//  Validamos el JWT que pudiera haber en localhost:
		if ((!localStorage.JWT) || ((localStorage.JWT.split(".").length != 3))) {
			this.navBar.login = false;
			this.navBar.rol = "";	
		  	localStorage.idUser="";
		
		} else {
			this.servicioLogin.validarLogin().subscribe(
				res =>{
					if (res.servicio) {
						this.navBar.login = true;
						this.navBar.usuario = localStorage.nombreUsuario;
						this.navBar.rol=localStorage.rol;
						//Cada vez que recargamos la pagina comprobamos el rol de usuario
						if(this.navBar.rol=="user")
							this.rolUser=true;
						
					}
				},
				error => console.log(error)
			);
		}
	}


  ngOnInit() {

		this.resLogin$ = this.servicioUpdateMenu.ObtenerResLogin$();
		this.resLogin$.subscribe(
			res =>{ 
				console.log(res);
				this.navBar.login = res.login;
				this.navBar.usuario = res.usuario;
			},
			error => console.log(error)
		);
	}
	
	abrirRegistro(){
		this.ruta.navigate(['registro']);
	}
	abrirLogin() {
		const modalRef = this.modalService.open(LoginComponent);
		
		modalRef.result.then((result) => {
			//cuando traemos el resultado del login actualizamos la informacion que necesitamos
			this.navBar.login = true;
			this.navBar.usuario = result.nombre + " " + result.apellidos;
			this.navBar.rol=localStorage.rol;
			/**Hacemos esta comprobacion para que apenas aceptemos el login compruebe y camnbie el menu */
			if(this.navBar.rol=="user")
				this.rolUser=true;
		}).catch((error) => {
			console.log("toy en error de app.component", error);
		});
	}

	cerrarLogin(){
		
			localStorage.JWT = "";
			localStorage.nombreUsuario = "";
			localStorage.rol = "";
			localStorage.idUser="",

			this.navBar.login = false;
			this.navBar.usuario = "";
			this.navBar.rol = "";
			
			this.rolUser=false;

			 //  Vamos a inicio:
			 this.ruta.navigate(['/']);

	}
	abrirMensajeConfirm() {
		localStorage.aviso='¿Seguro que desea cerrar la sesion?';
		localStorage.tipoAviso='CONFIRM';
		localStorage.heder='CONFIRMACÓN';
		const modalRef = this.modalService.open(AvisoComponent);
		modalRef.result.then((result) => {
			localStorage.aviso='';
			localStorage.tipoAviso='';
			localStorage.heder='';
			this.cerrarLogin();
		
		}).catch((error) => {
			console.log("toy en error de app.component", error);
		});
	  }


}
