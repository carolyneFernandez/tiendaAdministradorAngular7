import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../modelos/producto';
@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private url = environment.API_URL;

	constructor(private http: HttpClient) { }
	//Cojer todos los productos y nos devuelve un array de los productos
  getProductos(){
    let pa =JSON.stringify({
      servicio:"listarProductos",
    });
    console.log(pa);
		return this.http.post<any>(this.url, pa, environment.cabecera());
  }
//borramos pasando el id 
  delete(id:number){
    let pa =JSON.stringify({
      servicio:"borrarProducto",
      id:id,
     });
    return this.http.post<any>(this.url,pa,environment.cabecera());
  }
  //sacamos la lista de las categorias de BD
  sacarCategoria(){
    let pa =JSON.stringify({
      servicio:"sacarCategoria",
    });
     return this.http.post<any>(this.url,pa,environment.cabecera());
  }
  //Cojer datos de un producto determinada
  getProductosId(CODPRODUCTO:number){
    let pa =JSON.stringify({
      servicio:"listarProductoId",
      id:CODPRODUCTO
    });
    return this.http.post<any>(this.url,pa,environment.cabecera());

  }
  //MODIFICACION DEL PRODUCTO PASANDO POR PARAMETROS
  modificarProducto(producto:Producto){
    let pa =JSON.stringify({
      servicio:"modificarProducto",
      NOMBRE:producto.NOMBRE,
      CODPRODUCTO:producto.CODPRODUCTO,
      DESCRIPCION:producto.DESCRIPCION,
      STOCK:producto.STOCK,
      PRECIO:producto.PRECIO,
      TIPOIVA:producto.TIPOIVA,
      CATEGORIA:producto.CATEGORIA,
      FOTO:producto.FOTO
  
    });  
     return this.http.post<any>(this.url,pa,environment.cabecera());
  }

  //AÑADIR PRODUCTO
  addProduct(producto:Producto){
    let pa =JSON.stringify({
      servicio:"insertarProducto",
      NOMBRE:producto.NOMBRE,
      DESCRIPCION:producto.DESCRIPCION,
      STOCK:producto.STOCK,
      PRECIO:producto.PRECIO,
      TIPOIVA:producto.TIPOIVA,
      CATEGORIA:producto.CATEGORIA,
      FOTO:producto.FOTO
  
    });
     return this.http.post<any>(this.url,pa,environment.cabecera());
  }
  
}
