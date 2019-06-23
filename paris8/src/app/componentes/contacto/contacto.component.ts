import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AvisoComponent } from '../aviso/aviso.component';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {
 
  constructor(private modalService:NgbModal) { }

  ngOnInit() {
  }
  abrirMensaje() {
    localStorage.aviso='Formulario enviado, se le contestará con la mayor brevedad prosible';
    localStorage.tipoAviso='AVISO';
    localStorage.heder='ENVIADO CORRECTAMENTE';
    console.log(localStorage.heder);
		const modalRef = this.modalService.open(AvisoComponent);
		
		modalRef.result.then((result) => {
      localStorage.aviso='';
      localStorage.tipoAviso='';
      localStorage.heder='';
		
		}).catch((error) => {
			console.log("toy en error de app.component", error);
		});
  }


}
