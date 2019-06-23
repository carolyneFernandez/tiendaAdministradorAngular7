import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/modelos/persona';
import { LoginService } from 'src/app/servicios/login.service';
import { UpdateMenuService } from 'src/app/servicios/update-menu.service';
import { PersonasService } from 'src/app/servicios/personas.service';
import { Router } from '@angular/router';
import { FacturasService } from 'src/app/servicios/facturas.service';
import { AvisoComponent } from '../aviso/aviso.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
/**************descarga */

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  private idUsuario:number;
  private persona:Persona;
  private  errorDni:boolean;
  public muestraFormulario:boolean=false;
  private idFactura;
  private listarFacturas;
  private existeFactura:boolean=false;
  private ver:boolean=false;

  constructor(private servicioLogin: LoginService, private servicioUpdateMenu: UpdateMenuService,
    private servicioPersonas:PersonasService,private ruta:Router,private servicioFactura:FacturasService,
    private modalService:NgbModal) {
      this.persona = {id:-1,email:"",nombre:"",	apellidos:"",clave:"",tipo:"",dni:""}
	}

  ngOnInit() {
    this.idUsuario=localStorage.idUser;
    this.servicioPersonas.listarId(this.idUsuario).subscribe(
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
          this.persona = res;
          this.servicioFactura.getFacturaID(this.persona.id).subscribe(
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
                this.listarFacturas=res;
                if(this.listarFacturas!="")
                this.existeFactura=true
              }
            },
            error=>console.log(error)
          )
				}
					
			},
			error=>console.log(error)
		)

  }
mostrarForm(id){
    this.idFactura=id;
    if(this.muestraFormulario){
      this.ver=false;
      this.muestraFormulario=false;
    }
    else{
      this.ver=true;
      this.muestraFormulario=true;
    }
}

abrirMensaje(aviso:string,tipoAviso:string,textoHeader:string) {
  localStorage.aviso=aviso;
  localStorage.tipoAviso=tipoAviso;
  localStorage.heder=textoHeader;

  const modalRef = this.modalService.open(AvisoComponent);
  
  modalRef.result.then((result) => {
    localStorage.aviso="";
    localStorage.tipoAviso="";
    localStorage.heder="";
  }).catch((error) => {
    console.log("toy en error de app.component", error);
  });
}


validar(log) {
    this.errorDni=false;
		
		 if(!this.validadDNI(log.dni)){
			this.errorDni=true;
     }else{
      this.servicioPersonas.mod(log).subscribe(
        res=>{
          console.log(res);
          if ((res.sesion) && (res.sesion == "NO")) {
            //  No se ha iniciado sesión, nos vamos al login:
            localStorage.JWT = "";
            localStorage.nombreUsuario = "";
            //  Actualizamos el menú principal:
            this.servicioUpdateMenu.establecerLogin({login: false, usuario:""});
            //  Vamos a inicio:
            this.ruta.navigate(['login']);
          } else {
            localStorage.setItem('nombreUsuario', res.nombre + " " + res.apellidos);
            //  Actualizamos el menú, las opciones del menú principal:
            this.servicioUpdateMenu.establecerLogin({login: true, usuario:localStorage.nombreUsuario});
            this.abrirMensaje("Los datos del usuario se han modificado corretamente","AVISO",'Modiciación de usuario');
          }
          
        },
        error=>console.log(error)
      )
     }
    
  }
	validadDNI(nif){
		var letras="TRWAGMYFPDXBNJZSQVHLCKET";
		if(nif.length != 9){
			return false;
		}
		var dni=nif.substring(0,8);
		return (letras[dni%23]==nif[8].toUpperCase());
  }
  
  /**************Funcion para validar solo el cambio de contraseña */
  validarClave(log) {
    this.servicioPersonas.modClave(log).subscribe(
      res=>{
        if ((res.sesion) && (res.sesion == "NO")) {
          //  No se ha iniciado sesión, nos vamos al login:
          localStorage.JWT = "";
          localStorage.nombreUsuario = "";
          //  Actualizamos el menú principal:
          this.servicioUpdateMenu.establecerLogin({login: false, usuario:""});
          //  Vamos a inicio:
          this.ruta.navigate(['login']);
        } else {
          if(res.result=='OK'){
         //   localStorage.JWT = "";
           // localStorage.nombreUsuario = "";
            this.abrirMensaje("La contraseña se ha modificado correctamente(No la olvides para la proxima ocacion que entras)","AVISO","Contraseña Modificada");

             //  Vamos a inicio:
            this.ruta.navigate(['/']);
          }else{
            this.abrirMensaje("La contraseña antigua es incorrecta","ALERT","Fallo en la modificacion");
          }
           
        }
      
      },
      error=>console.log(error)
    )

 
  }
 
  


}