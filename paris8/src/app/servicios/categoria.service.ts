import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private url= environment.API_URL;

  constructor(private http:HttpClient) { 

  }
  getCategoria(){
    let pa =JSON.stringify({
      servicio:"listarcategoria",
    });
    return this.http.post<any>(this.url,pa,environment.cabecera());
  }
  anadirCategoria(categoria){
    let pa =JSON.stringify({
      servicio:"insertarcategoria",
      categoria:categoria,

    });
    console.log(pa);
    return this.http.post<any>(this.url,pa,environment.cabecera());
  }

  //borrar el carrito pasando el id del cliente
  borrarcategoria(id){
    let pa =JSON.stringify({
      servicio:"borrarcategoria",
      id:id
     });
     console.log(pa);
    return this.http.post<any>(this.url,pa,environment.cabecera());
    
  }
    //Funcion para modificar la linea de detalle
    modificarCategoria(categoria){
      console.log(categoria);
      let pa=JSON.parse(JSON.stringify({
        servicio:"modificaCategoria",
        categoria:categoria
       }));
      return this.http.post<any>(this.url,pa,environment.cabecera());
   }
}
