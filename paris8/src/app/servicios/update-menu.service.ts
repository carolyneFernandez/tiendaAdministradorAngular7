import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";

import { Subject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UpdateMenuService {

	private resLogin: Object;
	private resLogin$ = new Subject<any>();

  constructor() {
		this.resLogin = {login: false, usuario:""};
	 }

	 	//  Actualizamos el observable:
	establecerLogin(res: Object) {
		this.resLogin = res;
		this.resLogin$.next(this.resLogin);
	}

	//  Ofrecemos el observable:
	ObtenerResLogin$(): Observable<any> {
		return this.resLogin$.asObservable();
	}
	
}
