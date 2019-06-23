import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-aviso',
  templateUrl: './aviso.component.html',
  styleUrls: ['./aviso.component.css']
})
export class AvisoComponent implements OnInit {
  private textoDeAviso:string;
  private tipo:string;
  private header:string;
  private botonCance:boolean;
  constructor(public activeModal: NgbActiveModal) { 
    this.textoDeAviso=localStorage.aviso;
    this.tipo=localStorage.tipoAviso;
    this.header=localStorage.heder;
  }

  ngOnInit() {
    if(this.tipo=="CONFIRM"){
      this.botonCance=true
    }
  }

}
