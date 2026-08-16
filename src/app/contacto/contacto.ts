import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'app-contacto',
  imports: [ReactiveFormsModule],
  templateUrl: './contacto.html',
  styleUrl: './contacto.css',
})
export class Contacto {
  private fb = inject(FormBuilder);

  enviado = false;


  formulario = this.fb.group({

    nombre: [
      '',
      [
        Validators.required,
        Validators.minLength(3)
      ]
    ],

    correo: [
      '',
      [
        Validators.required,
        Validators.email
      ]
    ],

    terminos: [
      false,
      Validators.requiredTrue
    ]

  });


  suscribirse(): void {

    if (this.formulario.valid) {

      this.enviado = true;

      console.log(
        'Formulario enviado:',
        this.formulario.value
      );

      this.formulario.reset({
        nombre: '',
        correo: '',
        terminos: false
      });

    } else {

      this.enviado = false;

      this.formulario.markAllAsTouched();

    }

  }
}






