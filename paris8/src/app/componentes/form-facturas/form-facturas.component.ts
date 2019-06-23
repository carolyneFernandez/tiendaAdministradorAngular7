import { Component, OnInit } from '@angular/core';
import { FacturasService } from 'src/app/servicios/facturas.service';
import { Factura } from 'src/app/modelos/factura';
import { PersonasService } from 'src/app/servicios/personas.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UpdateMenuService } from 'src/app/servicios/update-menu.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-form-facturas',
  templateUrl: './form-facturas.component.html',
  styleUrls: ['./form-facturas.component.css']
})
export class FormFacturasComponent implements OnInit {

  private listaPer: any;
  public factura:Factura;
  public mensajeError:String;
  public textoBoton:String;


  private opDefect= {nombre:"Selecciona",dni:"cliente",id:"-1"}  
  private clienteElegido:boolean=true;

  constructor( private serviceFactura:FacturasService,private ruta:Router,private route:ActivatedRoute,
    private servicioPersonas:PersonasService,private servicioUpdateMenu: UpdateMenuService,public activeModal: NgbActiveModal) 
  {
    this.factura=new Factura();
    this.serviceFactura.getFactura().subscribe(
      res=>this.factura=res,
    )
    this.textoBoton="Añadir Factura";  
  }
  ngOnInit() {
    this.servicioPersonas.listar().subscribe(
      res=>{
        if ((res.sesion) && (res.sesion == "NO")) {
					//  No se ha iniciado sesión, nos vamos al login:
					localStorage.JWT = "";
					localStorage.nombreUsuario = "";
					//  Actualizamos el menú principal:
					this.servicioUpdateMenu.establecerLogin({login: false, usuario:""});
					//  Vamos a inicio:
          this.ruta.navigate(['/']);
          //NO  COMPROBAMOS EL USUARIO YA QUE EL FORMULARIO ES UN MODAL Y NO HAY RUTA DISPONIBLE
				} else {
          this.listaPer = res;
          this.listaPer.unshift(this.opDefect);
          this.factura.ID_CLIENTE=this.listaPer["0"].id;
				}
      },
      error=>console.log(error)
      )    
  }
  seleccion(parametro){
    if(parametro==-1){
       this.clienteElegido=false;
    }else{
       this.clienteElegido=true;
    }
 }
  onSubmit(factura:Factura){
    if(factura.ID_CLIENTE==-1){
      this.clienteElegido=false;

    }else{
    
    this.serviceFactura.addFactura(factura.NUMERO,factura.ID_CLIENTE).subscribe(
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
            if(res.result=='FAIL'){
              alert("ERROR AL CREAR LA FACTURA");
            }else{
              
              this.activeModal.close(res);
            }

            
          }
      },
    )
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
}
