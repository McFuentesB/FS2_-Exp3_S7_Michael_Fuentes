import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Importa Router para redirección

/**
 * @fileoverview
 * Componente para gestionar el perfil del usuario.
 * Permite visualizar y actualizar los datos del usuario, incluyendo su nombre de usuario y contraseña.
 */

/**
 * Componente para gestionar el perfil del usuario, incluyendo la visualización y actualización de los datos almacenados en `localStorage`.
 */
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  
  /**
   * Nombre de usuario del perfil.
   */
  username: string = '';

  /**
   * Contraseña actual del usuario.
   */
  password: string = '';

  /**
   * Confirmación de la nueva contraseña.
   */
  confirmPassword: string = '';

  constructor(private router: Router) {} // Inyecta Router para navegación

  /**
   * Método de ciclo de vida que se ejecuta cuando el componente se inicializa.
   * Carga los datos del usuario desde `localStorage` si el entorno es el navegador.
   */
  ngOnInit(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      this.loadUser();
    }
  }

  /**
   * Método que carga los datos del usuario desde `localStorage`.
   * Si el usuario está almacenado en `localStorage`, se asignan los valores a las propiedades del componente.
   */
  loadUser() {
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    if (storedUser.username) {
      this.username = storedUser.username;
      this.password = storedUser.password;
    }
  }

  /**
   * Método que actualiza los datos del usuario.
   * Verifica que las contraseñas coincidan antes de actualizar los datos en `localStorage`.
   */
  onUpdate() {
    if (this.password === this.confirmPassword) {
      const updatedUser = { username: this.username, password: this.password };
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('user', JSON.stringify(updatedUser));
        console.log('Usuario actualizado exitosamente', updatedUser);
        alert('Usuario actualizado exitosamente');
      }
    } else {
      console.log('Las contraseñas no coinciden');
      alert('Las contraseñas no coinciden');
    }
  }

  /**
   * Método para capturar las entradas del formulario y actualizar las propiedades correspondientes.
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
    } else if (field === 'confirmPassword') {
      this.confirmPassword = inputElement.value;
    }
  }

  /**
   * Método que navega al componente de Dashboard.
   */
  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }
}
