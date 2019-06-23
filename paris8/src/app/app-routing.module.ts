import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InicioComponent } from "./componentes/inicio/inicio.component";
//  import { LoginComponent } from "./componentes/login/login.component";
import { PersonasListadoComponent } from "./componentes/personas-listado/personas-listado.component";
import { PersonasAnadeComponent } from "./componentes/personas-anade/personas-anade.component";
import { CartaComponent } from './componentes/carta/carta.component';
import { ProductoListadoComponent } from './componentes/producto-listado/producto-listado.component';
import { FormProductoComponent } from './componentes/form-producto/form-producto.component';
import { FacturaListarComponent } from './componentes/factura-listar/factura-listar.component';
import { DetalleListadoComponent } from './componentes/detalle-listado/detalle-listado.component';
import { FormDetalleComponent } from './componentes/form-detalle/form-detalle.component';
import { ContactoComponent } from './componentes/contacto/contacto.component';
import { PreguntasFrecuentesComponent } from './componentes/preguntas-frecuentes/preguntas-frecuentes.component';
import { InicioAdminComponent } from './componentes/inicio-admin/inicio-admin.component';
import { PerfilComponent } from './componentes/perfil/perfil.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { ComentariosComponent } from './componentes/comentarios/comentarios.component';
import { CategoriaListarComponent } from './componentes/categoria-listar/categoria-listar.component';
import { CategoriaAddComponent } from './componentes/categoria-add/categoria-add.component';


const routes: Routes = [
	//paginas de inicio
  {
		path: "",
		component: InicioComponent
	},
	//registro
	{
		path: "registro",
		component: RegistroComponent
	},
	//listamos las personas
	{
		path: "personas-listar",
		component: PersonasListadoComponent
	},
	//Añadimos personas
	{
		path: "personas-add/:id",
		component: PersonasAnadeComponent
	},
	//pagina para ir a la carta del menu
	{
		path: "menu",
		component: CartaComponent
	},
	{
		path:"producto-listar",
		component:ProductoListadoComponent

	},
	{
		path:"producto-add/:id",
		component:FormProductoComponent

	},
	{
		path:"factura-listar",
		component:FacturaListarComponent

	},
	{
		path:"detalleListado/:id",
		component:DetalleListadoComponent

	},
	{
		path:"detalle-add/:id",
		component:FormDetalleComponent

	},
	{
		path:"contacto",
		component:ContactoComponent

	},
	{
		path:"preguntas",
		component:PreguntasFrecuentesComponent

	},
	{
		path:"adminHome",
		component:InicioAdminComponent

	},
	{
		path:"perfil",
		component:PerfilComponent

	},
	{
	path:"comentarios",
	component:ComentariosComponent
	},
	{
		path:"categoria-listar",
		component:CategoriaListarComponent
	},
	
				
	
	

	//  Para que cuando se coloque una ruta incorrecta de forma manual en la url, vaya a donde queramos.
	//  También se puede crear un component: pagina NOT Found y que vaya a esa página
	{
		path: "**",
		redirectTo: ''
		//  component: PaginaNoEncontradaComponent
	},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
