import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/modelos/producto';
import { ProductoService } from 'src/app/servicios/producto.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/servicios/login.service';
import { UpdateMenuService } from 'src/app/servicios/update-menu.service';
import { SubidaImagenService } from 'src/app/servicios/subida-imagen.service';
import { AvisoComponent } from '../aviso/aviso.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-form-producto',
  templateUrl: './form-producto.component.html',
  styleUrls: ['./form-producto.component.css']
})
export class FormProductoComponent implements OnInit {

  public producto:Producto;
  public mensajeError:String;
  public textoBoton:String;
  private textoCabecera:string;
  private existeFoto:boolean=false;
  private exiteCategoria:boolean=true;//por defecto pondremos una categoria existente

/**FICHERO */
  
  private fichero;
  private nombreImagen;
  private fotoElegida:boolean;
  private categorias:Array<any>;
  private options={"IDCATEGORIA":-1,"NOMBRE":"Selecciona una categoria"};


  constructor( private servicioProducto:ProductoService,private ruta:Router,private route:ActivatedRoute,
    private servicioUpdateMenu: UpdateMenuService,private servicioLogin: LoginService,
    private subir:SubidaImagenService,private modalService:NgbModal) 
  {
  
    this.producto=new Producto();
    this.producto = {CODPRODUCTO:-1,NOMBRE:"",DESCRIPCION:"",
    STOCK:1 ,FOTO:"",PRECIO: 2 ,TIPOIVA:2 ,CATEGORIA:""}
    this.textoBoton="Añadir";
    this.textoCabecera="Formulario para Añadir Producto";
  }
  
  
  
  ngOnInit() {
    if ((!localStorage.JWT) || ((localStorage.JWT.split(".").length != 3))) {
			//  No hay JWT, o no tiene el formato correcto.
			localStorage.JWT = "";
			localStorage.nombreUsuario = "";
			//  Actualizamos el menú principal:
			this.servicioUpdateMenu.establecerLogin({login: false, usuario:""});
			//  Vamos a inicio:
			this.ruta.navigate(['/']);
    }else if(localStorage.rol=='user'){
      this.ruta.navigate(['/']);

   } 
		 else {
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
            this.servicioProducto.sacarCategoria().subscribe(
              res=>{
                this.categorias=res;
                this.categorias.unshift(this.options);
                this.producto.CATEGORIA=this.categorias["0"].IDCATEGORIA;
              }
            )
						//HAREMOS ESTE APARTADO POR QUE SI MODIFICA NECESITAMOS LOS DATOS DEL PRODUCTO
            const userId=this.route.snapshot.params["id"];

						if(userId !=-1){
            //  this.existeFoto=true;
						 this.textoCabecera="Modificación de Producto"
            this.textoBoton="Modificar";
            this.servicioProducto.getProductosId(userId).subscribe(
							res=>this.producto=res,
							error=>console.log(error),
						)
						
            }
            
					}
				},
				error => console.log(error)
			);
		}
      
  }
 
  permitirSoloNumero(evt){
    var evento = evento || window.event;
		var codigoCar= evento.charCode || evento.keyCode;
		console.log(codigoCar);
		if((codigoCar>=48 && codigoCar<=57 ||codigoCar ==46)){
			return true;
		}
		else{
			return false;
		} 
   
 }
  subiendoando(ev){
    let img:any = ev.target;
    if(img.files.length > 0){
      let form = new FormData();
      form.append('file',img.files[0]);
      this.fichero=form;
      this.nombreImagen=img.files[0].name;
      this.fotoElegida=false;

    }
  }

  /*****Seleccion la categoria y nos mostrara si hay error o no******/
  seleccion(parametro){
	
    if(parametro==-1){
       this.exiteCategoria=false;
    }else{
       this.exiteCategoria=true;
    }
   }
   
  

  onSubmit(producto:Producto){
    this.fotoElegida=false;
    if(this.nombreImagen){
      producto.FOTO=this.nombreImagen;
    }
    //comprobamos que el haya una categoria
    if(producto.CATEGORIA!='-1'){
      if(producto.CODPRODUCTO!=-1){
      
        this.servicioProducto.modificarProducto(producto).subscribe(
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
                if(res.result=='OK'){
                  this.ruta.navigate(['/producto-listar'])//AL HACER EL AÑADIR VA A VOLVER A ESA RUTA
                  this.abrirMensaje("Producto modificado perfectamente","AVISO","Modificación");

                }else{
                  this.abrirMensaje("ERROR AL MODIFICAR EL PRODUCTO","ALERT","ERROR");

                }
              }
          },
        )
      }else{
        if(!this.nombreImagen){
          this.fotoElegida=true;
        }else{
          this.servicioProducto.addProduct(producto).subscribe(
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
                  if(res.result=='OK'){
                    this.subir.subirImagen(this.fichero).subscribe(
                      resp => {
                      
                        if(resp.status){
                          this.ruta.navigate(['/producto-listar']);//AL HACER EL AÑADIR VA A VOLVER A ESA RUTA
    
                        }
                      },
                      error => {
                        alert('Imagen supera el tamaño permitido');
                        
                      }
                    );
                  }else
                    alert("Ya existe una producto con este Nombre");
                }
            },
          )
        }
        
       
      }
    }
    else{
      this.exiteCategoria=false;//sino existe categoria debera decir el error

    }
  }

  //MENSAJE MODAL
  abrirMensaje(aviso:string,tipoAviso:string,textoHeader:string) {
    localStorage.aviso=aviso;
    localStorage.tipoAviso=tipoAviso;
    localStorage.heder=textoHeader;
    const modalRef = this.modalService.open(AvisoComponent);
    
    modalRef.result.then((result) => {
      console.log(result); 
  
    }).catch((error) => {
      console.log("toy en error de app.component", error);
    });
  }

}

