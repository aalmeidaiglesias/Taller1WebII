import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CatalogoService } from '../services/catalogo';

@Component({
  selector: 'app-catalogo',
  imports: [FormsModule],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css'
})
export class Catalogo implements OnInit {

  private catalogoService = inject(CatalogoService);

  superheroes: any[] = [];

  superheroesFiltrados: any[] = [];

  cargando = true;

  error = false;

  busqueda = '';

  editorialSeleccionada = 'Todas';


  ngOnInit(): void {

    this.catalogoService.obtenerSuperheroes().subscribe({

      next: (datos) => {

        console.log('Superhéroes cargados:', datos.length);

        this.superheroes = datos;

        this.superheroesFiltrados = datos;

        this.cargando = false;

      },

      error: (error) => {

        console.error('Error al cargar superhéroes:', error);

        this.cargando = false;

        this.error = true;

      }

    });

  }


  filtrarSuperheroes(): void {

    const texto = this.busqueda
      .toLowerCase()
      .trim();


    this.superheroesFiltrados = this.superheroes.filter(

      (heroe) => {

        const coincideNombre =
          heroe.name
            ?.toLowerCase()
            .includes(texto);


        const editorial =
          heroe.biography?.publisher || 'Desconocido';


        const coincideEditorial =
          this.editorialSeleccionada === 'Todas' ||
          editorial === this.editorialSeleccionada;


        return coincideNombre && coincideEditorial;

      }

    );

  }


  limpiarFiltros(): void {

    this.busqueda = '';

    this.editorialSeleccionada = 'Todas';

    this.superheroesFiltrados = this.superheroes;

  }


  obtenerEditores(): string[] {

    const editores = this.superheroes

      .map(
        heroe =>
          heroe.biography?.publisher
      )

      .filter(
        editorial => editorial
      );


    return [...new Set(editores)].sort();

  }


  obtenerPorcentaje(valor: number): number {

    if (!valor || valor < 0) {
      return 0;
    }

    return Math.min(valor, 100);

  }

}