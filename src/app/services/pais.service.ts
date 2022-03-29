import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaisService {
  token: any =[];


  constructor( private http: HttpClient) { 
    console.log('Servicio activo');
    this.getToken()
      .subscribe( token => {
        this.token = token;
      });
  }


  getToken() {

    const url = 'https://www.universal-tutorial.com/api/getaccesstoken';

    const headers = new HttpHeaders({
      'api-token': 'FE74DMsPnTXmiv_s4QhaSyYfTwmEhrXLtt-bY6PoI8hXs8pYOIGM1ApbpxMacW4DiWQ',
      "user-email": "o.hernandez1@pascualbravo.edu.co"
    });

    return this.http.get(url, { headers }).pipe(map(data =>data));

  }

 
  getPaises(token: any) {

    const url = `https://restcountries.com/v2/regionalbloc/USAN`;

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token.auth_token}`,
      "Accept": "application/json"
    });

    return this.http.get(url, { headers }).pipe(map(data => data));

  }

  getEstados(token: any, estado:string) {

    const url = `https://www.universal-tutorial.com/api/states/${estado}`;

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token.auth_token}`,
      "Accept": "application/json"
    });

    return this.http.get(url, { headers }).pipe(map(data => data));

  }

  getCiudades(token: any, ciudad:string) {

    const url = `https://www.universal-tutorial.com/api/cities/${ciudad}`;

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token.auth_token}`,
      "Accept": "application/json"
    });

    return this.http.get(url, { headers }).pipe(map(data => data));

  }
}
