import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Detalle } from '../modelos/detalle';


@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private url= environment.API_URL;

  constructor(private http:HttpClient) { 

  }
  getCarrito(id){
    let pa =JSON.stringify({
      servicio:"getCarrito",
      id:id
    });
    return this.http.post<any>(this.url,pa,environment.cabecera());
  }
  anadirCarrito(id,producto){
    let pa =JSON.stringify({
      servicio:"anadirCarrito",
      id:id,
      CODPRODUCTO:producto.CODPRODUCTO,
      cantidad:producto.cantidad
    });
    console.log(pa);
    return this.http.post<any>(this.url,pa,environment.cabecera());
  }
//añadir factura con el id del cliente y el numero de factura
  addFactura(idCliente){
    let numeroFactura=Math.floor(Math.random()*(10000-100))+100;
    let fecha=new Date();
    let pa =JSON.stringify({
      servicio:"insertarFacturaId",
      NUMERO:"FE0"+numeroFactura,
      IDCLIENTE:idCliente,
      FECHA:fecha
     });
     return this.http.post<any>(this.url,pa,environment.cabecera());
  }
  //FUNCION PARA INSERTAR EL DETALLE EN LA FACTURA
  insertarDetalle(detalle:Detalle,id){
    console.log(id);
    let pa =JSON.stringify({
      servicio:"insertarDetalleArray",
      arrayObjeto:detalle,
      id:id
     });
     console.log(pa);
    return this.http.post<any>(this.url,pa,environment.cabecera());

  }
//borrar el carrito pasando el id del cliente
  borrarCarrito(id){
    let pa =JSON.stringify({
      servicio:"borrarCarrito",
      id:id
     });
    return this.http.post<any>(this.url,pa,environment.cabecera());
    
  }
  borrarCarritoDetalle(producto){
    let pa =JSON.stringify({
      servicio:"borrarCarritoDetalle",
      idCarrito:producto.IDCARRITO,
      id:producto.IDCLIENTE
     });
    return this.http.post<any>(this.url,pa,environment.cabecera());
    
  }
}