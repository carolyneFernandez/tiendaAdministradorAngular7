import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from "../../servicios/login.service";
import { UpdateMenuService } from "../../servicios/update-menu.service";
import { PersonasService } from 'src/app/servicios/personas.service';
import { Router } from '@angular/router';

 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

 
  private login: {email:string, clave:string};
  private registro: {nombre:string,apellido:string,email:string, clave:string};

  private loginIncorrecto: boolean = false;
  private registroIncorrecto: boolean = false;

	public navBar = {		
    login: false
  }

  constructor(private servicioLogin: LoginService, private servicioUpdateMenu: UpdateMenuService,
     private ruta: Router,private servicioPersona:PersonasService,public activeModal: NgbActiveModal) {
    this.login = {email:"caro@gmail.com", clave:""};
    this.registro = {nombre:"",apellido:"",email:"", clave:""};

   }

  ngOnInit() {
  }

  validar(log) {
      //  Procedemos a la validación:
      this.servicioLogin.getLogin(log).subscribe(
        res => {
          //  Informamos y vamos a la pantalla de inicio.
          if ((res.estado) || (res.estado == "NO")) {
            this.loginIncorrecto = true;
          } else { //  Iniciamos sesión:
            this.loginIncorrecto = false;
            //  Guardamos el JWT en el sesionStorage:
						localStorage.setItem("JWT", res.JWT);
						localStorage.setItem('nombreUsuario', res.nombre + " " + res.apellidos);
            localStorage.setItem('rol', res.tipo);
            localStorage.setItem('idUser',res.id)
						//  Actualizamos el menú, las opciones del menú principal:
						this.servicioUpdateMenu.establecerLogin({login: true, usuario:localStorage.nombreUsuario});

            this.navBar.login=true;
//  Cerramos el popup:
this.activeModal.close(res);
           

				//		this.servicioUpdateMenu.establecerLogin({login: true, usuario:localStorage.nombreUsuario,tipo:localStorage.rol});
            //  Vamos a panel de administrador: 
            if(res.tipo=='admin')	
              this.ruta.navigate(['adminHome']);
            //  Vamos a panel de usuario: 
            else
              this.ruta.navigate(['/']);
           
          }
        },
        error => console.log(error)
      );
  }
  registrar(log) {
    
    this.servicioLogin.compruebaEmail(log).subscribe(
      res=>{
        if ((res.estado == "ocupado")) {
          this.registroIncorrecto = true;
        } else { 
          this.servicioLogin.registrar(log).subscribe(
            res=>{
              
             alert("se ha registrado correctamente");
             //  Cerramos el popup:
              this.activeModal.close(res);
              this.ruta.navigate[("/")];

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
      console.log(codigoCar);

      if((codigoCar>=65 && codigoCar<=90  ||(codigoCar>=90 &&codigoCar <=122)||(codigoCar>=49 &&codigoCar <=57))){
        return true;
      }
      else{
        return false;
      }
    
    }
}
  