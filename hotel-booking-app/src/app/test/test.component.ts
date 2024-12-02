import { Component } from '@angular/core';

/**
 * @fileoverview
 * Componente de prueba que muestra un contador interactivo.
 * Este componente permite incrementar, reiniciar y duplicar un valor numérico.
 */

/**
 * Componente de prueba para demostrar el funcionamiento de un contador.
 * El componente incluye un título y un contador que puede ser modificado con botones.
 */
@Component({
  selector: 'app-test',
  template: `
    <div>
      <h1>{{ title }}</h1>
      <button (click)="increment()">Increment</button>
      <p>{{ counter }}</p>
    </div>
  `
})
export class TestComponent {
  /**
   * Título que se muestra en el componente.
   * @example 'Test Component'
   */
  title = 'Test Component';

  /**
   * Valor del contador que se puede modificar mediante los métodos increment, reset y double.
   * @example 0
   */
  counter = 0;

  /**
   * Incrementa el valor del contador en 1.
   * Este método se llama cuando el usuario hace clic en el botón "Increment".
   */
  increment() {
    this.counter++;
  }

  /**
   * Restablece el contador a 0.
   * Este método no tiene parámetros y se utiliza para reiniciar el contador.
   */
  reset() {
    this.counter = 0;
  }

  /**
   * Duplica el valor actual del contador.
   * Este método multiplica el contador por 2.
   */
  double() {
    this.counter *= 2;
  }
}
