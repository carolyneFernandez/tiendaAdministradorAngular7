import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/servicios/login.service';
import { UpdateMenuService } from 'src/app/servicios/update-menu.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PersonasService } from 'src/app/servicios/personas.service';
import { Router } from '@angular/router';
import { AvisoComponent } from '../aviso/aviso.component';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  private registroIncorrecto: boolean = false;
  private registro: {nombre:string,apellido:string,email:string, clave:string,dni:""};


  constructor(private servicioLogin: LoginService, private servicioUpdateMenu: UpdateMenuService,
     private ruta: Router,private servicioPersona:PersonasService,private modalService :NgbModal) {
    this.registro = {nombre:"",apellido:"",email:"", clave:"",dni:""};

   }

  ngOnInit() {
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
  /******FUNCION PARA VALIDAR UN DNI***** */
validadDNI(nif){
	var letras="TRWAGMYFPDXBNJZSQVHLCKET";
	if(nif.length != 9){
		return false;
	}
	var dni=nif.substring(0,8);
	return (letras[dni%23]==nif[8].toUpperCase());
}
private dniError:boolean;
private errorFormulario:boolean;
  registrar(log) {
    this.registroIncorrecto=false;
    		//INICIAMOS LAS VARIABLES TODAS EN FALSE AL INICIO DE LA VALIDACION
		this.dniError=false;
		
    
    this.servicioLogin.compruebaEmail(log).subscribe(
      res=>{
        if ((res.estado == "ocupado")) {
          this.registroIncorrecto = true;
        }else if(!this.validadDNI(log.dni)){
          this.dniError=true;
          } else { 
          this.servicioLogin.registrar(log).subscribe(
            res=>{
              if(res.result="OK"){
                this.abrirMensaje("Usurio registrado correctamente ahora puede loguearse","AVISO","Registro completado");
                this.ruta.navigate(["/"]);

              }
            },
            error=>console.log(error)
          )
        }
      },
      error=>console.log(error)
    )
 

  }
  PermisoSoloLetrasEspacios(evento){
    var evento = evento || window.event;
    var codigoCar= evento.charCode || evento.keyCode;
  

    if((this.registro.nombre.valueOf().length<3 && codigoCar==32)||
      (this.registro.apellido.valueOf().length<3 && codigoCar==32)){
      return false;
    }
    
    if((codigoCar>=65 && codigoCar<=90 ||codigoCar ==32 ||(codigoCar>=90 &&codigoCar <=122))){
      return true;
    }
    else{
      return false;
    }
  
  }
  //USAMOS ESTA FUNCION PARA LA CONTRASEÑA
  PermiteSoloLetras(evento){
    var evento = evento || window.event;
    var codigoCar= evento.charCode || evento.keyCode;

    if((codigoCar>=65 && codigoCar<=90  ||(codigoCar>=90 &&codigoCar <=122)||(codigoCar>=49 &&codigoCar <=57))){
      return true;
    }
    else{
      return false;
    }
  
  }

}
