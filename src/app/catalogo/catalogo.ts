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

  /* ==============================
     CRUD
  ============================== */

  modoEdicion = false;
  heroeEditando: any = null;

  nuevoHeroe: any = {
    name: '',
    images: {
      lg: ''
    },
    biography: {
      fullName: '',
      publisher: '',
      firstAppearance: ''
    },
    appearance: {
      race: ''
    },
    work: {
      occupation: ''
    },
    powerstats: {
      intelligence: 0,
      strength: 0,
      speed: 0,
      power: 0
    }
  };


  /* ==============================
     CARGAR API
  ============================== */

  ngOnInit(): void {

    this.catalogoService.obtenerSuperheroes().subscribe({

      next: (datos) => {

        console.log(
          'Superhéroes cargados:',
          datos.length
        );

        this.superheroes = datos;

        this.superheroesFiltrados = datos;

        this.cargando = false;

      },

      error: (error) => {

        console.error(
          'Error al cargar superhéroes:',
          error
        );

        this.cargando = false;

        this.error = true;

      }

    });

  }


  /* ==============================
     FILTRAR
  ============================== */

  filtrarSuperheroes(): void {

    const texto =
      this.busqueda
        .toLowerCase()
        .trim();

    this.superheroesFiltrados =
      this.superheroes.filter(

        (heroe) => {

          const coincideNombre =
            heroe.name
              ?.toLowerCase()
              .includes(texto);

          const editorial =
            heroe.biography?.publisher ||
            'Desconocido';

          const coincideEditorial =
            this.editorialSeleccionada === 'Todas' ||
            editorial === this.editorialSeleccionada;

          return (
            coincideNombre &&
            coincideEditorial
          );

        }

      );

  }


  /* ==============================
     LIMPIAR FILTROS
  ============================== */

  limpiarFiltros(): void {

    this.busqueda = '';

    this.editorialSeleccionada =
      'Todas';

    this.superheroesFiltrados =
      this.superheroes;

  }


  /* ==============================
     OBTENER EDITORIALES
  ============================== */

  obtenerEditores(): string[] {

    const editores =
      this.superheroes

        .map(
          heroe =>
            heroe.biography?.publisher
        )

        .filter(
          editorial =>
            editorial
        );

    return [
      ...new Set(editores)
    ].sort();

  }


  /* ==============================
     AGREGAR
  ============================== */

  agregarHeroe(): void {

    if (!this.nuevoHeroe.name.trim()) {

      alert(
        'Ingrese el nombre del superhéroe'
      );

      return;

    }

    const nuevo = {

      id: Date.now(),

      name:
        this.nuevoHeroe.name,

      images: {
        lg:
          this.nuevoHeroe.images.lg ||
          'https://via.placeholder.com/400x500?text=Superheroe'
      },

      biography: {
        fullName:
          this.nuevoHeroe.biography.fullName ||
          'No disponible',

        publisher:
          this.nuevoHeroe.biography.publisher ||
          'Independiente',

        firstAppearance:
          this.nuevoHeroe.biography.firstAppearance ||
          'No disponible'
      },

      appearance: {
        race:
          this.nuevoHeroe.appearance.race ||
          'Desconocida'
      },

      work: {
        occupation:
          this.nuevoHeroe.work.occupation ||
          'Superhéroe'
      },

      powerstats: {
        intelligence:
          Number(
            this.nuevoHeroe.powerstats.intelligence
          ) || 0,

        strength:
          Number(
            this.nuevoHeroe.powerstats.strength
          ) || 0,

        speed:
          Number(
            this.nuevoHeroe.powerstats.speed
          ) || 0,

        power:
          Number(
            this.nuevoHeroe.powerstats.power
          ) || 0
      }

    };

    this.superheroes.unshift(nuevo);

    this.filtrarSuperheroes();

    this.limpiarFormulario();

    alert(
      'Superhéroe agregado correctamente'
    );

  }


  /* ==============================
     EDITAR
  ============================== */

  editarHeroe(heroe: any): void {

    this.modoEdicion = true;

    this.heroeEditando =
      JSON.parse(
        JSON.stringify(heroe)
      );

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

  }


  /* ==============================
     ACTUALIZAR
  ============================== */

  actualizarHeroe(): void {

    if (
      !this.heroeEditando ||
      !this.heroeEditando.name.trim()
    ) {

      alert(
        'El nombre del superhéroe es obligatorio'
      );

      return;

    }

    const indice =
      this.superheroes.findIndex(
        heroe =>
          heroe.id ===
          this.heroeEditando.id
      );

    if (indice !== -1) {

      this.superheroes[indice] =
        this.heroeEditando;

      this.filtrarSuperheroes();

      this.cancelarEdicion();

      alert(
        'Superhéroe actualizado correctamente'
      );

    }

  }


  /* ==============================
     ELIMINAR
  ============================== */

  eliminarHeroe(heroe: any): void {

    const confirmar =
      confirm(
        `¿Desea eliminar a ${heroe.name}?`
      );

    if (!confirmar) {
      return;
    }

    this.superheroes =
      this.superheroes.filter(
        personaje =>
          personaje.id !== heroe.id
      );

    this.filtrarSuperheroes();

    alert(
      'Superhéroe eliminado correctamente'
    );

  }


  /* ==============================
     CANCELAR EDICIÓN
  ============================== */

  cancelarEdicion(): void {

    this.modoEdicion = false;

    this.heroeEditando = null;

  }


  limpiarFormulario(): void {

    this.nuevoHeroe = {

      name: '',

      images: {
        lg: ''
      },

      biography: {
        fullName: '',
        publisher: '',
        firstAppearance: ''
      },

      appearance: {
        race: ''
      },

      work: {
        occupation: ''
      },

      powerstats: {
        intelligence: 0,
        strength: 0,
        speed: 0,
        power: 0
      }

    };

  }


  obtenerPorcentaje(
    valor: number
  ): number {

    if (
      !valor ||
      valor < 0
    ) {

      return 0;

    }

    return Math.min(
      valor,
      100
    );

  }

}