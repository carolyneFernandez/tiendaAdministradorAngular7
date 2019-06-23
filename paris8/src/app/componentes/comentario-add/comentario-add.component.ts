import { Component, OnInit ,Output,EventEmitter} from '@angular/core';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { ComentariosService } from 'src/app/servicios/comentarios.service';
import { UpdateMenuService } from 'src/app/servicios/update-menu.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comentario-add',
  templateUrl: './comentario-add.component.html',
  styleUrls: ['./comentario-add.component.css'],
  providers:[NgbRatingConfig]

})
export class ComentarioAddComponent implements OnInit {
  private currentRate = 5;
  private comentario;
  private puntajeVacio=false;
  @Output() onNew=new EventEmitter<any>();//lo hemos usado para añadir

  constructor(config:NgbRatingConfig,private servicioComentario:ComentariosService,
    private servicioUpdateMenu:UpdateMenuService, private ruta:Router){ 
    this.comentario = {IDCOMENTARIO:-1,IDCLIENTE:localStorage.idUser,COMENTARIO:"",	FECHA:"",PUNTAJE:4}

    config.max = 5;
    config.readonly = false;
  }

  ngOnInit() {
   
    
  }
  onSubmit (comentario){
    if(comentario.PUNTAJE==0)
      this.puntajeVacio=true;
    else{
      this.servicioComentario.addComentario(comentario).subscribe(
        res=>{
          if ((res.sesion) && (res.sesion == "NO")) {
            //  No se ha iniciado sesión, nos vamos al login:
            localStorage.JWT = "";
            localStorage.nombreUsuario = "";
            //  Actualizamos el menú principal:
            this.servicioUpdateMenu.establecerLogin({login: false, usuario:""});
            //  Vamos a inicio:
           alert("debes logearte");
          } else {
            //  Vamos a la lista de personas:
            this.onNew.emit(res)
          }
        },
        error=>console.log(error)
      )
    }

  }

}
