import { Component, OnInit, ElementRef } from '@angular/core';
import { Category } from 'src/app/modelos/category';
import { CategoriaService } from 'src/app/servicios/categoria.service';
import { UpdateMenuService } from 'src/app/servicios/update-menu.service';
import { Router } from '@angular/router';
import { AvisoComponent } from '../aviso/aviso.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-categoria-listar',
  templateUrl: './categoria-listar.component.html',
  styleUrls: ['./categoria-listar.component.css']
})
export class CategoriaListarComponent implements OnInit {
	private textoBoton:string;
  categorias:Array<Category>;
	is_insert: boolean = false;
	current_edit: {	  //  Para guardar una referencia a lo que se está editando (por si cancela el usuario)
		catogoria: Category,
		input: any
	};
	selId = -1;  //  Para saber el id del que estamos o vamos a editar.

	constructor(private servicioCategoria: CategoriaService, private elRef:ElementRef,
		private servicioUpdateMenu:UpdateMenuService,private ruta:Router,private modalService:NgbModal) {
			this.textoBoton="AÑADIR CATEGORIA"
		this.current_edit = {catogoria: null, input: null};
	 }


  ngOnInit() {
    this.servicioCategoria.getCategoria().subscribe(
      res =>{
				if ((res.sesion) && (res.sesion == "NO")) {
					//  No se ha iniciado sesión, nos vamos al login:
					localStorage.JWT = "";
					localStorage.nombreUsuario = "";
					//  Actualizamos el menú principal:
					this.servicioUpdateMenu.establecerLogin({login: false, usuario:""});
					//  Vamos a inicio:
					this.ruta.navigate(['/']);
				}else if(localStorage.rol=='user'){
					this.ruta.navigate(['/']);
	
			 }  else
				this.categorias = res;
			},
      error => console.log(error)
    );
  }

  mostrarAnadeCategory() {
		this.is_insert = !this.is_insert;
		if(this.is_insert)
			this.textoBoton="CANCELAR";
		else
		this.textoBoton="AÑADIR";

	}
	
	onNewPettype(new_pettype: Category){
    this.categorias.push(new_pettype);
    this.mostrarAnadeCategory();
	}

	editando(id){
		return (id != this.selId);
	}
	abrirMensajeConfirm(parametro:Category) {
    localStorage.aviso='¿Seguro que deseas borrar   '+ parametro.NOMBRE+ '?';
    localStorage.tipoAviso='CONFIRM';
    localStorage.heder='CONFIRMACIÓN';
    const modalRef = this.modalService.open(AvisoComponent);
    modalRef.result.then((result) => {
      localStorage.aviso='';
      localStorage.tipoAviso='';
      localStorage.heder='';
      this.delete(parametro);
    }).catch((error) => {
      console.log("toy en error de app.component", error);
    });
    }


	
	editCategory(pettype:Category, name, nameId){
		if (this.selId == -1) {  //  Vemos si estamos editando ya:
			this.selId = nameId;
			//  Guardamos los valores, por si luego cancela la edición
			this.current_edit.catogoria = JSON.parse(JSON.stringify(pettype)); //  Debemos clonarlo.
			this.current_edit.input = name;
			//  Accedemos a imput y le damos el foco:
			this.elRef.nativeElement = name;
			this.elRef.nativeElement.focus();
		} else {
			if (pettype.IDCATEGORIA == this.current_edit.catogoria.IDCATEGORIA) {  //  Le ha dado a cancelar la edición
				this.selId = -1;
			 	// Deshacemos lo que haya podido escribir el usuario.
				pettype.NOMBRE = this.current_edit.catogoria.NOMBRE;
			} else {  //  Si pulsa en otro botón le volvemos a dar el foco al input en edición:
				this.elRef.nativeElement = this.current_edit.input;
				this.elRef.nativeElement.focus();
			}
		}
	}

	updateCategory(categoria:Category){
		this.servicioCategoria.modificarCategoria(categoria).subscribe(
			resp => {
				console.log(resp);
				//  Terminamos la edición:
				this.selId = -1;
				//  Solo informamos si hay error:
				if (resp.result != "OK")
					alert("ha habido un error al modificar");
			},
			error => console.log(error)
		);
	}

	delete(categoria:Category){
			this.servicioCategoria.borrarcategoria(categoria.IDCATEGORIA).subscribe(
				resp =>{
					if (resp.result == "OK")
						this.categorias = this.categorias.filter(tipo => tipo.IDCATEGORIA != categoria.IDCATEGORIA);
					else
						alert("Ha habido un error al eliminar");
				},
				error => console.log(error)
			);
		
	}

}

