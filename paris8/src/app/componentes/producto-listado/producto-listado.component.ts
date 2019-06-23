import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/modelos/producto';
import { ProductoService } from 'src/app/servicios/producto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UpdateMenuService } from 'src/app/servicios/update-menu.service';
import { AvisoComponent } from '../aviso/aviso.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-producto-listado',
  templateUrl: './producto-listado.component.html',
  styleUrls: ['./producto-listado.component.css']
})
export class ProductoListadoComponent implements OnInit {

  private listaProducto: Producto[];
  constructor(private servicioProducto: ProductoService, private route:ActivatedRoute,
      private servicioUpdateMenu: UpdateMenuService, private ruta: Router, private modalService: NgbModal) {
     }
     
    ngOnInit() {
      this.servicioProducto.getProductos().subscribe(
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
            this.listaProducto = res;
          }
            
        },
        error=>console.log(error)
      )
    }
  
  delProduct(event,producto:Producto){
      this.servicioProducto.delete(producto.CODPRODUCTO).subscribe(
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
            this.listaProducto = res;
          }
            
        },
        error=>console.log(error)
      )
    
  }

  abrirMensajeConfirm(evento,parametro) {
    localStorage.aviso='¿Seguro que deseas borrar   '+ parametro.NOMBRE+ '?';
    localStorage.tipoAviso='CONFIRM';
    localStorage.heder='CONFIRMACIÓN';
    const modalRef = this.modalService.open(AvisoComponent);
    modalRef.result.then((result) => {
      localStorage.aviso='';
      localStorage.tipoAviso='';
      localStorage.heder='';
      this.delProduct(evento,parametro);
    }).catch((error) => {
      console.log("toy en error de app.component", error);
    });
    }
  
  edit(event,id){
    this.ruta.navigate(['producto-add',id])
  }
  
   
}
  