/**
 * @fileoverview
 * Archivo principal para la configuración de Angular Universal en el servidor.
 * Inicializa la aplicación Angular en el lado del servidor.
 */
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';

/**
 * Función de inicialización para arrancar la aplicación Angular en el servidor.
 * 
 * Usa el componente raíz `AppComponent` junto con la configuración definida en `app.config.server`.
 * 
 * @returns {Promise<void>} Promesa que indica el estado de inicialización.
 */
const bootstrap = () => bootstrapApplication(AppComponent, config);

export default bootstrap;
