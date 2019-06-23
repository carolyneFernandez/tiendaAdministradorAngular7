import { Component, OnInit } from '@angular/core';
import { ComentariosService } from 'src/app/servicios/comentarios.service';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { UpdateMenuService } from 'src/app/servicios/update-menu.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.css'],
  providers:[NgbRatingConfig]
})
export class ComentariosComponent implements OnInit {
  private comentario:Array<any>;
    // customize default values of ratings used by this component tree
  constructor(private serviciocomentario:ComentariosService,config:NgbRatingConfig,private servicioUpdateMenu:UpdateMenuService,
    private ruta:Router) {
    config.max = 5;
    config.readonly = true;
   }
  
  ngOnInit() {
    
    this.serviciocomentario.getComentario().subscribe(
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
          this.comentario=res   
         }
      },
      error=>console.log(error)
    )
  
  }
  nuevoComentario(new_type){
    if(new_type){
      this.comentario.unshift(new_type);
    }
  }
}
