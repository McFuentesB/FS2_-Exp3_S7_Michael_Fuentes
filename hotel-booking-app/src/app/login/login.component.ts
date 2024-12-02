import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Importa el Router

/**
 * @fileoverview
 * Componente para el inicio de sesión del usuario.
 * Permite que el usuario ingrese su nombre de usuario y contraseña para acceder al sistema.
 */

/**
 * Componente de Login.
 * Permite a los usuarios ingresar su nombre de usuario y contraseña para acceder al sistema.
 * Si las credenciales son correctas, se redirige al Dashboard; si son incorrectas, muestra un mensaje de error.
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  /**
   * Nombre de usuario ingresado en el formulario de login.
   */
  username: string = '';

  /**
   * Contraseña ingresada en el formulario de login.
   */
  password: string = '';

  constructor(private router: Router) {} // Inyecta el Router para la navegación

  /**
   * Método que maneja el inicio de sesión del usuario.
   * Verifica las credenciales ingresadas con las almacenadas en `localStorage`.
   * Si son correctas, redirige al Dashboard; de lo contrario, muestra un mensaje de error.
   */
  onLogin() {
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    if (storedUser.username === this.username && storedUser.password === this.password) {
      console.log('Login exitoso');
      this.router.navigate(['/dashboard']); // Redirige al Dashboard
    } else {
      console.log('Usuario o contraseña incorrectos');
      alert('Usuario o contraseña incorrectos');
    }
  }

  /**
   * Método para capturar las entradas del formulario de login y actualizar las propiedades correspondientes.
   * 
   * @param event El evento de entrada del campo del formulario.
   * @param field El nombre del campo que se está actualizando.
   */
  onInput(event: Event, field: string) {
    const inputElement = event.target as HTMLInputElement;
    if (field === 'username') {
      this.username = inputElement.value;
    } else if (field === 'password') {
      this.password = inputElement.value;
    }
  }

  /**
   * Método para navegar a la página de recuperación de contraseña.
   */
  recuperar() {
    this.router.navigate(['/recuperar']); // Redirige a la página de recuperación de contraseña
  }

  /**
   * Método para navegar a la página de registro de nuevo usuario.
   */
  registro() {
    this.router.navigate(['/registro']); // Redirige a la página de registro
  }
}
