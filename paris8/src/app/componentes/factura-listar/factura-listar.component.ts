import { Component, OnInit } from '@angular/core';
import { FacturasService } from 'src/app/servicios/facturas.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UpdateMenuService } from 'src/app/servicios/update-menu.service';
import { FormFacturasComponent } from '../form-facturas/form-facturas.component';
import { AvisoComponent } from '../aviso/aviso.component';

@Component({
  selector: 'app-factura-listar',
  templateUrl: './factura-listar.component.html',
  styleUrls: ['./factura-listar.component.css']
})
export class FacturaListarComponent implements OnInit {

  public facturas:any;
  constructor(private servicioFactura:FacturasService,private ruta:Router,private servicioUpdateMenu: UpdateMenuService,
     private modalService: NgbModal) { }
 ngOnInit() {

  this.servicioFactura.getFactura().subscribe(
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

     }  else {
        this.facturas=res;    
      }
    },
    error=>console.log(error)
  )
  }

   delFactura(event,id:number){
    this.servicioFactura.delFactura(id).subscribe(
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
            this.facturas=res;    
          }
        }
      )
      
    }

  getDetalle(event,id:number){
  //le pasamos como parametro el id de la factura del detalle
    this.ruta.navigate(['detalleListado',id])
  }
  
  abrirFormulario() {
		const modalRef = this.modalService.open(FormFacturasComponent);
		
		modalRef.result.then((result) => {
			//cuando traemos el resultado del añadido actualizamos la informacion que necesitamos
      this.facturas=result;    

		}).catch((error) => {
			console.log("toy en error de app.component", error);
		});
  }
  abrirMensajeConfirm(evento,parametro) {
    console.log(parametro);
    localStorage.aviso='¿Seguro que deseas borrar la factura con NUMERO    '+ parametro.NUMERO+ '?';
    localStorage.tipoAviso='CONFIRM';
    localStorage.heder='CONFIRMACIÓN';
    const modalRef = this.modalService.open(AvisoComponent);
    modalRef.result.then((result) => {
      localStorage.aviso='';
      localStorage.tipoAviso='';
      localStorage.heder='';
      this.delFactura(evento,parametro.ID);
    }).catch((error) => {
      console.log("toy en error de app.component", error);
    });
    }

}
