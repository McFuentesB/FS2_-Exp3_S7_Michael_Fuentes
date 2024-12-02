import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importamos CommonModule
import { Router } from '@angular/router';

/**
 * @fileoverview
 * Componente para la página de inicio (Home).
 * Muestra un carrusel de imágenes y proporciona opciones para navegar al login o registro.
 */

/**
 * Componente de la página de inicio (Home).
 * Muestra un carrusel con imágenes de las habitaciones del hotel y permite la navegación a la página de login o registro.
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true, // Asegúrate de marcar el componente como standalone
  imports: [CommonModule] // Añadimos CommonModule aquí
})
export class HomeComponent implements OnInit {

  /**
   * Índice de la imagen actualmente visible en el carrusel.
   */
  currentSlide: number = 0;

  /**
   * Arreglo con las imágenes y descripciones del carrusel.
   * Contiene objetos con las propiedades: image, alt, title y description.
   */
  slides = [
    {
      image: 'https://images.mirai.com/INFOROOMS/100377926/GEe1lJbqZ4nh3FPX9vKs/GEe1lJbqZ4nh3FPX9vKs_original.jpg',
      alt: 'Habitación 101',
      title: 'Habitación Deluxe',
      description: 'Comodidad y lujo con vistas al mar'
    },
    {
      image: 'https://images.mirai.com/INFOROOMS/100377926/iMoSTVry2RUN8ztTXive/iMoSTVry2RUN8ztTXive_original.jpg',
      alt: 'Habitación 102',
      title: 'Habitación Familiar',
      description: 'Espacio perfecto para toda la familia'
    },
    {
      image: 'https://images.mirai.com/INFOROOMS/100377926/v9txb3gzIkeHPJqNCYWG/v9txb3gzIkeHPJqNCYWG_original.jpg',
      alt: 'Habitación 103',
      title: 'Habitación Económica',
      description: 'Calidad al mejor precio'
    }
  ];

  constructor(private router: Router) {}

  /**
   * Método del ciclo de vida `ngOnInit` que se ejecuta cuando el componente es inicializado.
   * En este caso, no realiza ninguna acción, pero es requerido por la interfaz `OnInit`.
   */
  ngOnInit(): void {}

  /**
   * Cambia al slide anterior del carrusel.
   * Si está en el primer slide, se redirige al último slide.
   */
  prevSlide(): void {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
  }

  /**
   * Cambia al siguiente slide del carrusel.
   * Si está en el último slide, se redirige al primer slide.
   */
  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  /**
   * Redirige al usuario a la página de inicio de sesión (login).
   */
  login() {
    this.router.navigate(['/login']); // Redirige al login
  }

  /**
   * Redirige al usuario a la página de registro de nuevo usuario.
   */
  registro() {
    this.router.navigate(['/registro']); // Redirige al registro
  }
}
