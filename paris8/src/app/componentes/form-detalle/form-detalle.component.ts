import { Component, OnInit } from '@angular/core';
import { Detalle } from 'src/app/modelos/detalle';
import { ProductoService } from 'src/app/servicios/producto.service';
import { DetalleService } from 'src/app/servicios/detalle.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/servicios/login.service';
import { UpdateMenuService } from 'src/app/servicios/update-menu.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-form-detalle',
  templateUrl: './form-detalle.component.html',
  styleUrls: ['./form-detalle.component.css']
})
export class FormDetalleComponent implements OnInit {

  private detalle:Detalle;
  private producto:any;
  private productoElegido:boolean=true;
  private opDefect= {CODPRODUCTO:"-1",NOMBREPRODUCTO:"SELECCIONADA"};
private idDetalle;
private textoBoton:string="";
  constructor(private servicioProducto:ProductoService,private servicioDetalle:DetalleService,private ruta:Router,private route:ActivatedRoute,
    private servicioUpdateMenu: UpdateMenuService, private servicioLogin: LoginService, public activeModal: NgbActiveModal) { 
  this.detalle=new Detalle();
  this.textoBoton="Añadir";
  }
  ngOnInit() {

//  Con esto evitamos que intente añadir uno nuevo (sin haber hecho login) poniendo la dirección en la url,
		//  Validamos el JWT que pudiera haber en localStorage:
		if ((!localStorage.JWT) || ((localStorage.JWT.split(".").length != 3))) {
			//  No hay JWT, o no tiene el formato correcto.
			localStorage.JWT = "";
			localStorage.nombreUsuario = "";
			//  Actualizamos el menú principal:
			this.servicioUpdateMenu.establecerLogin({login: false, usuario:""});
			//  Vamos a inicio:
			this.ruta.navigate(['/']);
//aqui no comprobamos el usuario ya que es un Modal el formulario y no existe una ruta que podria poner
		}else {
			this.servicioLogin.validarLogin().subscribe(
				res =>{
					if (!res.servicio) {  //  Si no devuelve servicio, es que el JWT NO es válido.
						localStorage.JWT = "";
						localStorage.nombreUsuario = "";
						//  Actualizamos el menú principal:
						this.servicioUpdateMenu.establecerLogin({login: false, usuario:""});
						//  Vamos a inicio:
						this.ruta.navigate(['/']);
					}else{
            /*************Cojemos todoss los productos */
            this.servicioProducto.getProductos().subscribe(
                res=>{
                  this.producto=res;
                  //una vez tengamos los productos ponemos por defecto 
                  this.producto.unshift(this.opDefect);
                 this.detalle.CODPRODUCTO=this.producto["0"].CODPRODUCTO;
                },
                )

            this.detalle.ID_FACTURA=localStorage.IdFactura;//guardamos el idFactura al detalle del id de factura
            this.detalle.ID=localStorage.IdDetalle ;//guadaremos el id del detalle para saber si añadimos o modificamos

            if(this.detalle.ID!=-1){
              this.servicioDetalle.getDetalleId(this.detalle.ID).subscribe(
                res=>{
                  this.textoBoton="Modificar";
                  this.detalle.CANTIDAD=res.CANTIDAD;
                  this.detalle.CODPRODUCTO=res.CODPRODUCTO;
                  this.detalle.ID_FACTURA=res.ID_FACTURA
                },
                error=>console.log(error),
              )
             
              
            }
          
            }
           
					},
				error => console.log(error)
			);
		}
  }
  
  permitirSoloNumero(event){
    console.log(event);
   const numeros=/[0-9]/;
   let inputChar=String.fromCharCode(event.charCode);
   if(event.keyCode != 8 && !numeros.test(inputChar)){
     event.preventDefault();
   }
 }
 /******Metodo a la hora de cambiar la opcion del producto********* */
 seleccion(parametro){
   if(parametro==-1){
      this.productoElegido=false;
   }else{
      this.productoElegido=true;
   }
}
	
  onSubmit (detalle:Detalle){
    if(detalle.CODPRODUCTO==-1){
      this.productoElegido=false;

    }else{
      if(detalle.ID==-1){
        this.servicioDetalle.addDetalle(detalle).subscribe(
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
                //  Cerramos el popup:
                this.activeModal.close(res);
            }
          },
          error=>console.log(error),
        )

      }else{
        this.servicioDetalle.modificarDetalle(detalle).subscribe(
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
              this.activeModal.close(res);
            }
          },
          error=>console.log(error),
        )
      }
 
      }
  }

}

