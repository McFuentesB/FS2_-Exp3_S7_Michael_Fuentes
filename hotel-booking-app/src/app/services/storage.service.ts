import { Injectable } from '@angular/core';

/**
 * @fileoverview
 * Servicio para interactuar con el almacenamiento local del navegador (localStorage).
 * Este servicio proporciona métodos para guardar, obtener, eliminar y limpiar datos en el localStorage.
 */

/**
 * Servicio para gestionar datos en el localStorage del navegador.
 * Permite almacenar, recuperar, eliminar y limpiar valores en el almacenamiento local.
 */
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  /**
   * Guarda un valor en el localStorage.
   * Convierte el valor a JSON antes de almacenarlo.
   * 
   * @param key Clave que se usará para almacenar el valor.
   * @param value El valor a almacenar en el localStorage.
   */
  save(key: string, value: any) {
    if (typeof window !== 'undefined') { // Verificación para el entorno del navegador
      localStorage.setItem(key, JSON.stringify(value));
    }
  }

  /**
   * Recupera un valor desde el localStorage.
   * Si no existe el valor para la clave proporcionada, retorna null.
   * 
   * @param key Clave del valor que se desea recuperar.
   * @returns El valor asociado a la clave en el localStorage, o null si no existe.
   */
  get(key: string) {
    if (typeof window !== 'undefined') { // Verificación para el entorno del navegador
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    }
    return null;
  }

  /**
   * Elimina un valor del localStorage.
   * 
   * @param key Clave del valor que se desea eliminar.
   */
  remove(key: string) {
    if (typeof window !== 'undefined') { // Verificación para el entorno del navegador
      localStorage.removeItem(key);
    }
  }

  /**
   * Limpia todo el contenido del localStorage.
   * Elimina todos los valores almacenados en el localStorage.
   */
  clear() {
    if (typeof window !== 'undefined') { // Verificación para el entorno del navegador
      localStorage.clear();
    }
  }
}
