import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {

  menu = [
    { label: 'Ir a Inicio', path: '/home', icon: 'home' },
    { label: 'Usuarios', path: '/usuarios' },
    { label: 'Acerca de', path: '/acerca' }
  ];

}
