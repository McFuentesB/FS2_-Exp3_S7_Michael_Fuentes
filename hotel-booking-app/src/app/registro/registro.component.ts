import { Component } from '@angular/core';
import { Router } from '@angular/router';

/**
 * @fileoverview
 * Componente para gestionar el registro de nuevos usuarios.
 * Permite validar y almacenar los datos del usuario en el almacenamiento local.
 */

/**
 * Componente que gestiona el registro de nuevos usuarios.
 * - Validación de campos como usuario, correo electrónico, contraseñas y fecha de nacimiento.
 * - Almacenamiento de los datos del usuario en `localStorage` y navegación al login tras el registro exitoso.
 */
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  /**
   * Nombre de usuario proporcionado por el usuario.
   */
  username: string = '';

  /**
   * Correo electrónico proporcionado por el usuario.
   */
  email: string = '';

  /**
   * Contraseña proporcionada por el usuario.
   */
  password: string = '';

  /**
   * Confirmación de la contraseña proporcionada por el usuario.
   */
  confirmPassword: string = '';

  /**
   * Fecha de nacimiento proporcionada por el usuario.
   */
  birthdate: string = '';

  constructor(private router: Router) {}

  /**
   * Método para manejar los eventos de entrada de los campos del formulario.
   * 
   * @param event El evento de entrada.
   * @param field El nombre del campo a actualizar.
   */
  onInput(event: Event, field: string) {
    const inputElement = event.target as HTMLInputElement;
    if (field === 'username') {
      this.username = inputElement.value;
    } else if (field === 'email') {
      this.email = inputElement.value;
    } else if (field === 'password') {
      this.password = inputElement.value;
    } else if (field === 'confirmPassword') {
      this.confirmPassword = inputElement.value;
    } else if (field === 'birthdate') {
      this.birthdate = inputElement.value;
    }
  }

  /**
   * Método que maneja el evento de registro.
   * Realiza la validación de los campos y almacena los datos del usuario en `localStorage` si todo es correcto.
   */
onRegister() {
  // Validar campos obligatorios
  if (!this.username || !this.email || !this.password || !this.confirmPassword || !this.birthdate) {
    alert('Por favor, completa todos los campos.');
    return;
  }

  // Validar formato de correo electrónico
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(this.email)) {
    alert('Por favor, ingresa un correo electrónico válido.');
    return;
  }

  // Validar contraseñas iguales
  if (this.password !== this.confirmPassword) {
    alert('Las contraseñas no coinciden.');
    return;
  }

  // Validar requisitos de contraseña
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,18}$/;
  if (!passwordRegex.test(this.password)) {
    alert('La contraseña debe tener entre 6 y 18 caracteres, al menos un número y al menos una letra mayúscula.');
    return;
  }

  // Validar rango de fechas y edad mínima
  const birthdate = new Date(this.birthdate);
  const today = new Date();
  const minYear = 1900; // Año mínimo permitido
  const minAge = 13;

  // Validar si el año de nacimiento es mayor o igual al año 1900
  if (birthdate.getFullYear() < minYear) {
    alert(`El año de nacimiento debe ser posterior a ${minYear}.`);
    return;
  }

  // Validar edad mínima
  const age = today.getFullYear() - birthdate.getFullYear();
  const isOldEnough =
    age > minAge || (age === minAge && today >= new Date(birthdate.getFullYear() + minAge, birthdate.getMonth(), birthdate.getDate()));

  if (!isOldEnough) {
    alert(`Debes tener al menos ${minAge} años para registrarte.`);
    return;
  }

  // Guardar usuario en LocalStorage
  const user = { username: this.username, email: this.email, password: this.password, birthdate: this.birthdate };
  localStorage.setItem('user', JSON.stringify(user));

  alert('Registro exitoso');
  this.router.navigate(['/login']);
}


  /**
   * Limpia todos los campos del formulario de registro.
   */
  clearForm() {
    this.username = '';
    this.email = '';
    this.password = '';
    this.confirmPassword = '';
    this.birthdate = '';
  }

  /**
   * Obtiene la fecha máxima permitida para el campo de fecha de nacimiento (13 años atrás).
   * 
   * @returns La fecha máxima como cadena en formato `YYYY-MM-DD`.
   */
  getMaxDate(): string {
    const today = new Date();
    today.setFullYear(today.getFullYear() - 13); // Edad mínima
    return today.toISOString().split('T')[0];
  }

  /**
   * Navega al componente de inicio de sesión.
   */
  goToLogin() {
    this.router.navigate(['/login']);
  }
}
