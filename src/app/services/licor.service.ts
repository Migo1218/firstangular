import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class LicorService {

  constructor() { }
  getAxiosData(busqueda:string){
    var api = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${busqueda}`;
    return axios.get(api)
  }
}
