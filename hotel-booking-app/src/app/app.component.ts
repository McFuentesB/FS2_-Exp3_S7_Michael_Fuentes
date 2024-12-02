import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/**
 * @fileoverview
 * Componente principal de la aplicación Angular que sirve como contenedor
 * para la navegación y la estructura de la aplicación.
 * Este componente se encarga de la gestión de las rutas a través del `RouterOutlet`.
 */

/**
 * Componente raíz de la aplicación Angular.
 * Este componente sirve como punto de entrada para las rutas definidas en la aplicación.
 * Utiliza `RouterOutlet` para cargar los componentes según la ruta activa.
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet], // Importa RouterOutlet para cargar rutas hijas
  templateUrl: './app.component.html', // Plantilla HTML para el componente raíz
  styleUrls: ['./app.component.css'] // Archivos de estilo para el componente raíz
})
export class AppComponent {
  /**
   * Título de la aplicación.
   * Se puede acceder desde cualquier parte del componente o plantilla.
   * En este caso, está establecido como 'hotel-booking-app'.
   */
  title = 'hotel-booking-app';
}
 