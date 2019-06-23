import { Component, OnInit } from '@angular/core';
import { PersonasService } from "../../servicios/personas.service";
import { UpdateMenuService } from "../../servicios/update-menu.service";
import { Router } from '@angular/router';
import { Persona } from 'src/app/modelos/persona';
import { AvisoComponent } from '../aviso/aviso.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-personas-listado',
  templateUrl: './personas-listado.component.html',
  styleUrls: ['./personas-listado.component.css']
})
export class PersonasListadoComponent implements OnInit {

	private listaPer: Object[];

	constructor(private servicioPersonas: PersonasService, private servicioUpdateMenu: UpdateMenuService, 
		private ruta: Router,private modalService:NgbModal) {
		console.log("constructor");
		this.listaPer = [{ID:-1, DNI:"", NOMBRE:"", APELLIDOS:""}];
	 }

  ngOnInit() {
		this.servicioPersonas.listar().subscribe(
			res=>{
				if ((res.sesion) && (res.sesion == "NO")||localStorage.rol=="user") {
					//  No se ha iniciado sesión, nos vamos al login:
					localStorage.JWT = "";
					localStorage.nombreUsuario = "";
					//  Actualizamos el menú principal:
					this.servicioUpdateMenu.establecerLogin({login: false, usuario:""});
					//  Vamos a inicio:
					this.ruta.navigate(['/']);
				} else {
					this.listaPer = res;
				}
					
			},
			error=>console.log(error)
		)
  }
  abrirMensajeConfirm(event,parametro:Persona) {
    localStorage.aviso='¿Seguro que deseas borrar   '+ parametro.nombre+ parametro.apellidos+  '?';
    localStorage.tipoAviso='CONFIRM';
    localStorage.heder='CONFIRMACIÓN';
    const modalRef = this.modalService.open(AvisoComponent);
    modalRef.result.then((result) => {
      localStorage.aviso='';
      localStorage.tipoAviso='';
      localStorage.heder='';
      this.delUser(event,parametro);
    }).catch((error) => {
      console.log("toy en error de app.component", error);
    });
    }

  //BORRAR USUARIO
  delUser(event,user){
	//mandamos el id para poder borrar el cliente
	this.servicioPersonas.delet(user.id).subscribe(
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
				this.listaPer = res;
			}
				
		},
		error=>console.log(error)
	)
	
}
//Ir a la pagina de añadir pero con el id para editar 
edit(event,id){
	this.ruta.navigate(['personas-add',id])
}

 
}
