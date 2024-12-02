import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // Importa el Router

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule], // Asegúrate de incluir CommonModule
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent {
  rooms: any[] = [];
  roomToEdit: any = {
    id: null,
    name: '',
    description: '',
    price: 0,
    image: '',
  }; // Inicialización segura de roomToEdit
  isEditing = false;
  isAdding = false;
  errorMessage: string = ''; // Añadimos esta línea para manejar el mensaje de error

  jsonUrl = 'https://hotelreservationsroomsfullstack2.s3.us-east-1.amazonaws.com/rooms.json';

  constructor(private router: Router, private http: HttpClient) {
    this.fetchRooms();
  }

  fetchRooms() {
    this.http.get<any[]>(this.jsonUrl).subscribe({
      next: (data) => {
        this.rooms = data;
        this.errorMessage = ''; // Limpiar el mensaje de error si la carga es exitosa
      },
      error: (err) => {
        console.error('Error al cargar las habitaciones:', err);
        this.errorMessage = 'No se pudo cargar las habitaciones. Intenta nuevamente más tarde.'; // Asignar un mensaje de error
      },
    });
  }

  deleteRoom(roomId: number) {
    this.rooms = this.rooms.filter(room => room.id !== roomId);
    // Actualizar localStorage después de eliminar la habitación
    localStorage.setItem('rooms', JSON.stringify(this.rooms));
    alert('Habitación eliminada');
  }
  

  editRoom(room: any) {
    this.isEditing = true;
    this.isAdding = false;
    this.roomToEdit = { ...room }; // Copiar los datos de la habitación seleccionada
  }

  addRoom() {
    this.isAdding = true;
    this.isEditing = false;
    this.roomToEdit = { id: this.rooms.length + 1, name: '', description: '', price: 0, image: '' }; // Objeto vacío con valores predeterminados
  }

  saveRoom() {
    if (this.isEditing) {
      const index = this.rooms.findIndex(room => room.id === this.roomToEdit.id);
      if (index !== -1) {
        this.rooms[index] = this.roomToEdit;
      }
    } else if (this.isAdding) {
      this.rooms.push(this.roomToEdit);
    }
    // Guardar habitaciones en localStorage
    localStorage.setItem('rooms', JSON.stringify(this.rooms));
    this.cancelEdit();
  }
  

  cancelEdit() {
    this.isEditing = false;
    this.isAdding = false;
    this.roomToEdit = { id: null, name: '', description: '', price: 0, image: '' }; // Resetear objeto
  }

  onInput(event: Event, field: string) {
    const input = event.target as HTMLInputElement; // Hacer casting a HTMLInputElement
    this.roomToEdit[field] = input.value;
  }

  logout() {
    // Lógica de cierre de sesión, redirigir a la página de login o eliminar sesión
    console.log('Cerrando sesión');
    alert('Sesión cerrada');
    this.router.navigate(['/login']);
  }
}
