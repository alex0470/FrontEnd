import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  title = 'Bienvenido a Mi Primera App Angular';
  subtitle = 'Esta es una aplicación de demostración para aprender los conceptos básicos de Angular, incluyendo componentes, enrutamiento y estilos.';
}
