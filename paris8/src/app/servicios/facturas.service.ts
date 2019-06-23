import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FacturasService {

  private url= environment.API_URL;

  constructor(private http:HttpClient) {}
  
  getFactura(){
		let pa=JSON.parse(JSON.stringify({
      servicio:"listarFactura"
    }));
    return this.http.post<any>(this.url,pa,environment.cabecera());
  }
  getFacturaID(IDCLIENTE){
		let pa=JSON.parse(JSON.stringify({
      servicio:"listarFacturaId",
      id:IDCLIENTE
    }));
    return this.http.post<any>(this.url,pa,environment.cabecera());
  }
  delFactura(id:number){
		let pa=JSON.parse(JSON.stringify({
      servicio:"borrarFactura",
      id:id,
     }));
    return this.http.post<any>(this.url,pa,environment.cabecera());
  }
  getListarDetalle(id){
		let pa=JSON.parse(JSON.stringify({
      servicio:"listarDetalle",
      id:id
    }))
    return this.http.post<any>(this.url,pa,environment.cabecera());
  }
 
addFactura(numero,idCliente){
  var fecha=new Date();
  let pa=JSON.parse(JSON.stringify({
    servicio:"insertarFactura",
    NUMERO:"FE0"+numero,
    IDCLIENTE:idCliente,
    FECHA:fecha
   }));
   return this.http.post<any>(this.url,pa,environment.cabecera());
}

  
}
