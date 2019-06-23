import { Persona } from './persona';

export class Factura {
    ID:number;
    NUMERO:string;
    ID_CLIENTE:number;
    CLIENTE:Persona;
    FECHA:Date;
}