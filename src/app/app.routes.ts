import { Routes } from '@angular/router';
import { Home } from './home/home'; 
import { Catalogo } from './catalogo/catalogo';
import { Nosotros } from './nosotros/nosotros';
import { Contacto } from './contacto/contacto';

export const routes: Routes = [

    { path: '', component: Home },
    { path: 'catalogo', component: Catalogo },
    { path: 'nosotros', component: Nosotros },
    { path: 'contacto', component: Contacto },
    { path: '**', redirectTo: '' }
];

