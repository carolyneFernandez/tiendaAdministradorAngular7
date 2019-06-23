import { Component, OnInit ,Input} from '@angular/core';
import { identifierModuleUrl } from '@angular/compiler';
import { FacturasService } from 'src/app/servicios/facturas.service';
import { PersonasService } from 'src/app/servicios/personas.service';
import { LoginService } from 'src/app/servicios/login.service';
import { Router } from '@angular/router';
import { UpdateMenuService } from 'src/app/servicios/update-menu.service';

@Component({
  selector: 'app-detallecompra',
  templateUrl: './detallecompra.component.html',
  styleUrls: ['./detallecompra.component.css']
})
export class DetallecompraComponent implements OnInit {
  @Input() id;//usamos esta variable que metemos desde espacialidad para poder editar
  private sumaIVA = 0;
  private sumaTotal = 0;
  constructor(private servicioLogin: LoginService, private servicioUpdateMenu: UpdateMenuService,
    private servicioPersonas:PersonasService,private ruta:Router,private servicioFactura:FacturasService) { }
private listaDetalle;
  ngOnInit() {
    this.servicioFactura.getListarDetalle(this.id).subscribe(
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
          this.listaDetalle=res;
           this.listarTotales(res);
        }
          
      },
      error=>console.log(error)
    
    )  
  }
  listarTotales(datos){
    this.sumaIVA = 0;
    this.sumaTotal = 0;
    datos.forEach(element => {
      this.sumaIVA += element.CANTIDAD * element.PRECIO * (element.TIPOIVA / 100);
      this.sumaTotal += (element.CANTIDAD * element.PRECIO) + (element.CANTIDAD * element.PRECIO * (element.TIPOIVA / 100));
     
    });
  }

}
