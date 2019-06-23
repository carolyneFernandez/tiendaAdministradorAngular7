import { Component, OnInit, ElementRef } from '@angular/core';
import { ProductoService } from 'src/app/servicios/producto.service';
import { Router } from '@angular/router';
import { UpdateMenuService } from 'src/app/servicios/update-menu.service';
import { Producto } from 'src/app/modelos/producto';
import { CarritoService } from 'src/app/servicios/carrito.service';
import { Detalle } from 'src/app/modelos/detalle';
import { resetFakeAsyncZone } from '@angular/core/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AvisoComponent } from '../aviso/aviso.component';

@Component({
  selector: 'app-carta',
  templateUrl: './carta.component.html',
  styleUrls: ['./carta.component.css']
})
export class CartaComponent implements OnInit {
  private listaProducto:Producto;//guardamos todos los productos
 
 private listaCarrito=null;//guardamos todos los productos del carrito
 private totalPagar;//No lo inicializamos ya que no lo mostraremos hasta que haya algun valor
 private idFactura=-1;//USAREMOS ESTa variable para guardar la factura devuelta
 private detalleFactura:Detalle;//lo usaremos para pasar el detalle a la hora de añadirlo del carrito
 private existeCarrito:boolean;//bandera para mostrar o no el carrito
private errorCantidad:boolean;
  constructor(private servicioProducto:ProductoService,private servicioUpdateMenu:UpdateMenuService,
    private ruta:Router,private servicecarrito:CarritoService,private elRef:ElementRef,private modalService:NgbModal) { }

  ngOnInit() {
    
    this.servicioProducto.getProductos().subscribe(
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
          /*he decidido que hasta que no liste todos los productos tampoco podremos ver el carrito
          Se podria aver echo fuera pero es decicion propia y lo prefiero asi , ya no tengo que comprobar si exite o no la sesion*/
          this.servicecarrito.getCarrito(localStorage.idUser).subscribe(
            res=>{
              this.listaCarrito=res;
              if(this.listaCarrito!="")
                this.existeCarrito=true;
              this.sacarTotales(this.listaCarrito);
            }
          )
        }
          
      },
      error=>console.log(error)
    )

   
    
  }

//FUNCION PARA AÑADIR LOS PRODUCTOS ELEGIDOS AL CARRITO
  anadirCarrito(producto, name){
    
    if(!producto.cantidad){
      this.elRef.nativeElement = name;
      this.elRef.nativeElement.focus();
    }else{
      this.servicecarrito.anadirCarrito(localStorage.idUser,producto).subscribe(
        res=>{
          this.listaCarrito=res;  
          producto.cantidad=null;
          this.sacarTotales(this.listaCarrito);
          this.existeCarrito=true;
        }
  
      )
    }
  }
  //confirmar si deseas borrar
  abrirMensajeConfirm(producto) {
		localStorage.aviso='¿Seguro que deseas borrar el producto '+ producto.NOMBRE+ '?';
		localStorage.tipoAviso='CONFIRM';
		localStorage.heder='CONFIRMACÓN';
		const modalRef = this.modalService.open(AvisoComponent);
		modalRef.result.then((result) => {
			localStorage.aviso='';
			localStorage.tipoAviso='';
			localStorage.heder='';
      this.borradoCarritoDetalle(producto);
		}).catch((error) => {
			console.log("toy en error de app.component", error);
		});
    }
    
  borradoCarritoDetalle(producto){
   this.servicecarrito.borrarCarritoDetalle(producto).subscribe(
      res=>{
        this.listaCarrito=res;
        this.sacarTotales(this.listaCarrito);
        if(this.listaCarrito==''){
          this.existeCarrito=false;


        }
      }
    )
  }
 
/**Funcion para sacar las cantidades totales de lo que hay que pagar */
  sacarTotales(listaCarrito){
    this.totalPagar=0;
    listaCarrito.forEach(element => {
      this.totalPagar += (element.CANTIDAD * element.precioTotal) + (element.CANTIDAD * element.precioTotal * (element.TIPOIVA / 100));
     
    });
  }
  
  permitirSoloNumero(event){
    console.log(event);
   const numeros=/[0-9]/;
   let inputChar=String.fromCharCode(event.charCode);
   if(event.keyCode != 8 && !numeros.test(inputChar)){
     event.preventDefault();
   }
 }

 
abrirMensaje(aviso:string,tipoAviso:string,textoHeader:string) {
  localStorage.aviso=aviso;
  localStorage.tipoAviso=tipoAviso;
  localStorage.heder=textoHeader;

  const modalRef = this.modalService.open(AvisoComponent);
  
  modalRef.result.then((result) => {
    localStorage.aviso="";
    localStorage.tipoAviso="";
    localStorage.heder="";
  }).catch((error) => {
    console.log("toy en error de app.component", error);
  });
}
 /***FUNCION PARA COMPRAR****/
 comprar(event,producto){
  /**Añadimos factura y nos devolvera el id de la ultima factura añadida */
  this.servicecarrito.addFactura(localStorage.idUser).subscribe(
    res=>{
      this.detalleFactura=producto;//guardaremos el dato para poder pasarlo en el detalle de factura
      this.idFactura=res;//guardamos el id de la factura
      this.servicecarrito.insertarDetalle(this.detalleFactura,this.idFactura).subscribe(
        res=>{
          //una ves insertado el dato borramos el carrito siempre pasandole el id del usuario
          this.servicecarrito.borrarCarrito(localStorage.idUser).subscribe(
            res=>{
              if(res.result=='OK'){
                this.existeCarrito=false;
                this.abrirMensaje("Su pedido le llegara en unos dias","AVISO",'COMPRA REALIZADA');

                console.log(this.existeCarrito);
              }else{
                alert("Hubo un error en la compra");

              }

            }
          )
        }
      )
     
    }
  )

}

}
