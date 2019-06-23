import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { PersonasListadoComponent } from './componentes/personas-listado/personas-listado.component';
import { PersonasAnadeComponent } from './componentes/personas-anade/personas-anade.component';
import { LoginComponent } from './componentes/login/login.component';

import { HttpClientModule } from "@angular/common/http";
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from "@angular/forms";
import { MenuPrincipalComponent } from './componentes/menu-principal/menu-principal.component';
import { CartaComponent } from './componentes/carta/carta.component';
import { ProductoListadoComponent } from './componentes/producto-listado/producto-listado.component';
import { FormProductoComponent } from './componentes/form-producto/form-producto.component';
import { FacturaListarComponent } from './componentes/factura-listar/factura-listar.component';
import { FormFacturasComponent } from './componentes/form-facturas/form-facturas.component';
import { DetalleListadoComponent } from './componentes/detalle-listado/detalle-listado.component';
import { FormDetalleComponent } from './componentes/form-detalle/form-detalle.component';
import { ContactoComponent } from './componentes/contacto/contacto.component';

import { AgmCoreModule } from '@agm/core';
import { PreguntasFrecuentesComponent } from './componentes/preguntas-frecuentes/preguntas-frecuentes.component';
import { InicioAdminComponent } from './componentes/inicio-admin/inicio-admin.component';
import { PerfilComponent } from './componentes/perfil/perfil.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { DetallecompraComponent } from './componentes/detallecompra/detallecompra.component';
import { ComentariosComponent } from './componentes/comentarios/comentarios.component';
import { ComentarioAddComponent } from './componentes/comentario-add/comentario-add.component';
import { AvisoComponent } from './componentes/aviso/aviso.component';
import { CategoriaListarComponent } from './componentes/categoria-listar/categoria-listar.component';
import { CategoriaAddComponent } from './componentes/categoria-add/categoria-add.component';


// Import your library
@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    PersonasListadoComponent,
    PersonasAnadeComponent,
    LoginComponent,
    MenuPrincipalComponent,
    CartaComponent,
    ProductoListadoComponent,
    FormProductoComponent,
    FacturaListarComponent,
    FormFacturasComponent,
    DetalleListadoComponent,
    FormDetalleComponent,
    ContactoComponent,
    PreguntasFrecuentesComponent,
    InicioAdminComponent,
    PerfilComponent,
    RegistroComponent,
    DetallecompraComponent,
    ComentariosComponent,
    ComentarioAddComponent,
    AvisoComponent,
    CategoriaListarComponent,
    CategoriaAddComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    AngularFontAwesomeModule,//usamos esta liberia para el fontaWESOME (ICONOS)
	//	NgbModule.forRoot(),
    FormsModule,
    //para el mapa
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA6pEft0sm6UY7yy_q3hRkHYCkcwjCbK30'
    }),
    
    // Specify your library as an import
  ],
  providers: [],
  bootstrap: [AppComponent],
	entryComponents: [
    LoginComponent,
    FormFacturasComponent,
    FormDetalleComponent,
    AvisoComponent
	]
})
export class AppModule { }
