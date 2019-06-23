import { Component, OnInit, EventEmitter,Output, Input} from '@angular/core';
import { Category } from 'src/app/modelos/category';
import { CategoriaService } from 'src/app/servicios/categoria.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categoria-add',
  templateUrl: './categoria-add.component.html',
  styleUrls: ['./categoria-add.component.css']
})
export class CategoriaAddComponent implements OnInit {
  @Output() onNew=new EventEmitter<Category>();


  public categoria: Category;
  public mensajeError:String;
  public textoBoton:string;
  constructor(private serviciocategory:CategoriaService ) { 
    this.categoria =<Category>{};
    this.textoBoton="Añadir"
  }

  ngOnInit() {
  }
  onSubmit(categoria:Category){
 //   categoria.IDCATEGORIA=null;
    this.serviciocategory.anadirCategoria(categoria).subscribe(
      res=>{
          this.categoria=res;
          this.onNew.emit(this.categoria);
      },
      error=>console.log("error")
    );
  }
}
