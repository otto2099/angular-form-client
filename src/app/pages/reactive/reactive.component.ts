import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ValidadoresService } from '../../services/validadores.service';
import { PaisService } from '../../services/pais.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  paises: any =[];
  estados: any =[];
  ciudades: any =[];


  forma: FormGroup;



  constructor( private fb: FormBuilder,
               private validadores: ValidadoresService, private paisService: PaisService ) { 

    this.crearFormulario();
    this.cargarDataAlFormulario();
    this.crearListeners();
    this.cargarPaises()

  }

  ngOnInit(): void {
  }

  get nombreNoValido() {
    return this.forma.get('nombre').invalid && this.forma.get('nombre').touched
  }

  get apellidoNoValido() {
    return this.forma.get('apellido').invalid && this.forma.get('apellido').touched
  }

  get correoNoValido() {
    return this.forma.get('correo').invalid && this.forma.get('correo').touched
  }

  crearFormulario() {

    this.forma = this.fb.group({
      nombre  : ['', [ Validators.required, Validators.minLength(5) ]  ],
      apellido: ['', [Validators.required, this.validadores.noHerrera ] ],
      correo  : ['', [ Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')] ],
      direccion: ['', Validators.required ],
      telefono: ['', Validators.required ],

    });

  }

  crearListeners() {
    // this.forma.valueChanges.subscribe( valor => {
    //   console.log(valor);
    // });

    // this.forma.statusChanges.subscribe( status => console.log({ status }));
    this.forma.get('nombre').valueChanges.subscribe( console.log );
  }

  cargarDataAlFormulario() {

    // this.forma.setValue({
    this.forma.reset({
      nombre: '',
      apellido: '',
      correo: '',
      direccion: '',
      telefono: ''

    });

  }

  cargarPaises(){
    this.paisService.getPaises(this.paisService.token)
      .subscribe( paises => {
        this.paises = paises;
      });


  }

  cargarEstasdos(estado){
    console.log(estado);
    this.paisService.getEstados(this.paisService.token, estado)
      .subscribe( estados => {
        this.estados = estados;
      });
  }

  cargarCiudades(ciudad){
    console.log(ciudad);
    this.paisService.getCiudades(this.paisService.token, ciudad)
      .subscribe( ciudades => {
        this.ciudades = ciudades;
        console.log(ciudades);
      });
  }


  guardar() {
    console.log( this.forma );


    if ( this.forma.invalid ) {

      return Object.values( this.forma.controls ).forEach( control => {
        
        if ( control instanceof FormGroup ) {
          Swal.fire({
            title:'cliente',
            text: 'Se ha guardado el registro',
            icon: 'success',
            showCancelButton:false
          })
          Object.values( control.controls ).forEach( control => control.markAsTouched() );
          
        } else {
          Swal.fire({
            title:'cliente',
            text: 'Llene los campos obligatorios',
            icon: 'warning',
            showCancelButton:false
          })
          control.markAsTouched();
        }
        
        
      });
     
    }
    else{
      Swal.fire({
        title:'cliente',
        text: 'Se ha guardado el registro',
        icon: 'success',
        showCancelButton:false
      })
    }


    // Posteo de información
    this.forma.reset({
      nombre: 'Sin nombre'
    });
    
  }

}
