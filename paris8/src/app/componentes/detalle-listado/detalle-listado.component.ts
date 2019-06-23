import { Component, OnInit } from '@angular/core';
import { FormDetalleComponent } from '../form-detalle/form-detalle.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FacturasService } from 'src/app/servicios/facturas.service';
import { UpdateMenuService } from 'src/app/servicios/update-menu.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DetalleService } from 'src/app/servicios/detalle.service';
import { AvisoComponent } from '../aviso/aviso.component';

@Component({
  selector: 'app-detalle-listado',
  templateUrl: './detalle-listado.component.html',
  styleUrls: ['./detalle-listado.component.css']
})
export class DetalleListadoComponent implements OnInit {
  private listaDetalle;//guardaremos el array de todos los detalles de la misma factura
  private idFactura;//variable que usaremos para guardar el id de la factura recojida
  /**Variables para mostrar la suma de totales y de total de IVA  */
  private sumaIVA=0;
  private sumaTotal=0;
  
  constructor(private servicioFactura:FacturasService,private servicioUpdateMenu: UpdateMenuService,
    private modalService: NgbModal,private ruta:Router,
    private route:ActivatedRoute,private servicioDetalle:DetalleService) {

   }

  ngOnInit() {
    //Cojemos el id de la factura para poderselo pasar por parametro
    this.idFactura=this.route.snapshot.params["id"];
    //este servicio nos devolvera la lista
    this.servicioFactura.getListarDetalle(this.idFactura).subscribe(
      res=>{
				if ((res.sesion) && (res.sesion == "NO")) {
					//  No se ha iniciado sesión, nos vamos al login:
					localStorage.JWT = "";
					localStorage.nombreUsuario = "";
					//  Actualizamos el menú principal:
					this.servicioUpdateMenu.establecerLogin({login: false, usuario:""});
					//  Vamos a inicio:
					this.ruta.navigate(['/']);
        }else if(localStorage.rol=='user'){
          this.ruta.navigate(['/']);
          this.abrirMensaje("No tienes permiso para acceder a este apartado","AVISO","SIN PERMISO");
        }
        else {
          this.listaDetalle=res;
          this.listarTotales(res);
				}
					
			},
			error=>console.log(error)
    
    )    
  }

  //FUNCION PARA LISTAR LOS TOTALES
  listarTotales(datos){
    this.sumaIVA = 0;
    this.sumaTotal = 0;
    datos.forEach(element => {
      this.sumaIVA += element.CANTIDAD * element.PRECIO * (element.TIPOIVA / 100);
      this.sumaTotal += (element.CANTIDAD * element.PRECIO) + (element.CANTIDAD * element.PRECIO * (element.TIPOIVA / 100));
     
    });
  }


  //AADIMOS EL DETALLE LLAMAREMOS AL FORMULARIO CON UN MODAL
  addDetalle(){
  localStorage.IdFactura=this.idFactura;//guardamos la id de la factura
  localStorage.IdDetalle=-1;//cuando añadimos un detalle pondremos el id a -1
    const modalRef = this.modalService.open(FormDetalleComponent);
    modalRef.result.then((result) => {
      this.listaDetalle=result;
      this.listarTotales(result);
      this.abrirMensaje("El detalle se ha insertado correctamente","AVISO","DETALLE INSERTADO");

		}).catch((error) => {
			console.log("toy en error de app.component", error);
		});
  }

  //LLAMAMOS AL COMPONENTE DE MODIFICAR EL DETALLE
  mod($event,detalle){
    localStorage.IdDetalle=detalle.ID;
    const modalRef = this.modalService.open(FormDetalleComponent);
    modalRef.result.then((result) => {
      this.listaDetalle=result;
      this.listarTotales(result);
      this.abrirMensaje("El detalle se ha modificado correctamente","AVISO","DETALLE MODIFICADO");

		}).catch((error) => {
			console.log("toy en error de app.component", error);
		});
  }
    //confirmar si deseas borrar
    abrirMensajeConfirm(evento,parametro) {
      localStorage.aviso='¿Seguro que deseas borrar   '+ parametro.NOMBRE+ '?';
      localStorage.tipoAviso='CONFIRM';
      localStorage.heder='CONFIRMACIÓN';
      const modalRef = this.modalService.open(AvisoComponent);
      modalRef.result.then((result) => {
        localStorage.aviso='';
        localStorage.tipoAviso='';
        localStorage.heder='';
        this.eliminar(evento,parametro);
      }).catch((error) => {
        console.log("toy en error de app.component", error);
      });
      }
  eliminar(evento,parametro){
    evento.preventDefault();
      this.servicioDetalle.delDetalle(parametro.ID,parametro.ID_FACTURA).subscribe(
        res => {
            if ((res.sesion) && (res.sesion == "NO")) {
              //  No se ha iniciado sesión, nos vamos al login:
              localStorage.JWT = "";
              localStorage.nombreUsuario = "";
              //  Actualizamos el menú principal:
              this.servicioUpdateMenu.establecerLogin({login: false, usuario:""});
              //  Vamos a inicio:
              this.ruta.navigate(['/']);
            } else {
                this.listaDetalle=res,
                this.listarTotales(res)           
             }
                 
      },
      error => { console.log(error)}
      
      );

  }
//MENSAJE aviso
  abrirMensaje(advertencia:string,tipo:string,header:string) {
    localStorage.aviso=advertencia;
    localStorage.tipoAviso=tipo;
    localStorage.heder=header;

    const modalRef = this.modalService.open(AvisoComponent);
    
    modalRef.result.then((result) => {

      localStorage.aviso='';
      localStorage.tipoAviso='';
      localStorage.heder='';

    }).catch((error) => {
      console.log("toy en error de app.component", error);
    });
  }
  
 
}
