import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-acerca',
  imports: [CommonModule],
  templateUrl: './acerca.html',
  styleUrl: './acerca.css'
})
export class Acerca {
  student = {
    name: 'Silvestre Alexander Olvera Rocha',
    major: 'Ingeniería en Sistemas Computacionales',
    university: 'Instituto Tecnológico de Ciudad Valles',
    bio: 'Apasionado por el desarrollo web y la tecnología, siempre en busca de nuevos desafíos y aprendizajes para crecer profesionalmente.',
    profileImageUrl: 'https://placehold.co/400x400/168ddc/ffffff?text=SO',
    skills: [
      'JavaScript (ES6+)',
      'HTML5 & CSS3',
      'Git & GitHub'
    ]
  };
}
