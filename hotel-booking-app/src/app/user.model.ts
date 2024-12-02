/**
 * @fileoverview
 * Modelo de datos para el usuario en la aplicación.
 * Define la estructura que debe seguir un objeto de usuario.
 */

/**
 * Interfaz que representa a un usuario.
 * 
 * Un usuario consta de un nombre de usuario y una contraseña.
 * Estos datos se utilizan para autenticar al usuario en la aplicación.
 */
export interface User {
  /**
   * Nombre de usuario único para la autenticación.
   * @example 'juan123'
   */
  username: string;

  /**
   * Contraseña asociada al nombre de usuario.
   * @example 'mypassword123'
   */
  password: string;
}
