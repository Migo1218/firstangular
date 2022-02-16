import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LicorService } from './services/licor.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'proyectoindividual';
  data: any=[];
  form1 = this.fb.group({
    busqueda: [null, [Validators.required, Validators.minLength(2)]],
    nombre: [null],
  });

  miFormulario: FormGroup = this.fb.group({
    favoritos: this.fb.array([
      ['Licores',  Validators.required]
    ], Validators.required)
  });

  nuevoFavorito: FormControl = this.fb.control('', Validators.required)

  get favoritosArr(){
    return this.miFormulario.get('favoritos') as FormArray
  }

  constructor(private licorService: LicorService ,private fb: FormBuilder) { }
  busqueda() {
    console.log(this.form1);
    if (this.form1.valid) {
      this.licorService
        .getAxiosData(this.form1.controls['busqueda'].value)
        .then((resp) => {
          console.log(resp.data.drinks);
          this.data = resp.data.drinks;
            // this.agregarFavApi(drink.strDrink);

        });
    }
  }

  agregarFavorito() {
    if(this.nuevoFavorito.invalid){
      return
    }
    this.favoritosArr.push(this.fb.control(this.nuevoFavorito.value, Validators.required))
    
    this.nuevoFavorito.reset()
  }

  agregarFavApi(drink:string){
    this.favoritosArr.push(this.fb.control(drink, Validators.required))
    
  }

  eliminar(i:number){
    

    this.favoritosArr.removeAt(i)
  }
}
