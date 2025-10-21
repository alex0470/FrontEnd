import { Routes } from '@angular/router';
import { Home } from '../components/home/home';
import { Acerca } from '../components/acerca/acerca';
import { UserProfileComponent } from '../components/user-profile/user-profile';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home, title: 'Inicio' },
  { path: 'usuarios', component: UserProfileComponent, title: 'Usuarios' },
  { path: 'acerca', component: Acerca, title: 'Acerca de' }
];
