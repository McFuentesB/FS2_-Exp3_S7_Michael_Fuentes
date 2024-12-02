import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

/**
 * @fileoverview
 * Componente que gestiona la recuperación de contraseñas de usuarios.
 * Permite buscar al usuario por nombre de usuario, verificar la existencia y realizar el restablecimiento de la contraseña.
 */

/**
 * Componente para gestionar la recuperación de contraseñas de usuarios.
 * Permite buscar al usuario por nombre de usuario, validar la existencia del usuario y restablecer la contraseña si es necesario.
 */
@Component({
  selector: 'app-recuperar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recuperar.component.html',
  styleUrls: ['./recuperar.component.css']
})
export class RecuperarComponent {

  /**
   * Nombre de usuario proporcionado por el usuario para la recuperación de la contraseña.
   */
  username: string = '';

  /**
   * Nueva contraseña proporcionada por el usuario para restablecerla.
   */
  newPassword: string = '';

  /**
   * Confirmación de la nueva contraseña proporcionada por el usuario.
   */
  confirmPassword: string = '';

  /**
   * Indicador de si el usuario ha sido encontrado o no.
   */
  userFound: boolean = false;

  constructor(private router: Router) {}

  /**
   * Método que gestiona la recuperación de la cuenta.
   * Busca el usuario en `localStorage` y valida si el nombre de usuario coincide.
   * Si el usuario es encontrado, permite restablecer la contraseña.
   * 
   * @param event El evento de submit del formulario.
   */
  onRecover(event: Event) {
    event.preventDefault();

    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (user && user.username === this.username) {
      console.log('Usuario encontrado:', this.username);
      this.userFound = true;
    } else {
      console.log('Usuario no encontrado');
      alert('Usuario no encontrado');
    }
  }

  /**
   * Método para restablecer la contraseña del usuario si la nueva contraseña y la confirmación coinciden.
   * Actualiza el campo de la contraseña en `localStorage` si todo es válido.
   * 
   * @param event El evento de submit del formulario de restablecimiento de contraseña.
   */
  onResetPassword(event: Event) {
    event.preventDefault();

    if (this.newPassword === this.confirmPassword) {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      if (user) {
        user.password = this.newPassword;
        localStorage.setItem('user', JSON.stringify(user));

        console.log('Contraseña actualizada');
        alert('Contraseña restablecida con éxito');
        this.userFound = false;
        this.username = '';
        this.newPassword = '';
        this.confirmPassword = '';
      }
    } else {
      alert('Las contraseñas no coinciden');
    }
  }

  /**
   * Método que maneja los eventos de entrada de los campos del formulario.
   * 
   * @param event El evento de entrada del campo.
   * @param field El nombre del campo a actualizar.
   */
  onInput(event: Event, field: string) {
    const inputElement = event.target as HTMLInputElement;
    if (field === 'username') {
      this.username = inputElement.value;
    } else if (field === 'newPassword') {
      this.newPassword = inputElement.value;
    } else if (field === 'confirmPassword') {
      this.confirmPassword = inputElement.value;
    }
  }

  /**
   * Navega al componente de inicio de sesión.
   */
  goToLogin() {
    this.router.navigate(['/login']);
  }
}
