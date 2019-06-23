import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Detalle } from '../modelos/detalle';

@Injectable({
  providedIn: 'root'
})
export class DetalleService {

  private url= environment.API_URL;

  constructor(private http:HttpClient) { 

  }
  getDetalleId(id){
		let pa=JSON.parse(JSON.stringify({
      servicio:"listarDetalleId",
      id:id
    }));
    return this.http.post<any>(this.url,pa,environment.cabecera());
  }
   //Funcion para modificar la linea de detalle
   modificarDetalle(detalle){
     console.log("IDFACTURA"+detalle.ID_FACTURA);
     let pa=JSON.parse(JSON.stringify({
      servicio:"modificarDetalle",
      CANTIDAD:detalle.CANTIDAD,
      ID:detalle.ID,
      CODPRODUCTO:detalle.CODPRODUCTO,
      IDFACTURA:detalle.ID_FACTURA
     }));
     return this.http.post<any>(this.url,pa,environment.cabecera());
  }
  
  /*********AÑADIR DETALLE*****/
  addDetalle(detalle:Detalle){
    console.log(detalle);
		let pa=JSON.parse(JSON.stringify({
      servicio:"insertarDetalle",
      CANTIDAD:detalle.CANTIDAD,
      CODPRODUCTO:detalle.CODPRODUCTO,
      IDFACTURA:detalle.ID_FACTURA
     }));
    return this.http.post<any>(this.url,pa,environment.cabecera());

  }

  delDetalle(id:number,idFactura:number){
		let pa=JSON.parse(JSON.stringify({
      servicio:"borrarDetalle",
      id:id,
      idFactura:idFactura,
      listado:"OK"
     }));
    return this.http.post<any>(this.url,pa,environment.cabecera());

  }
}