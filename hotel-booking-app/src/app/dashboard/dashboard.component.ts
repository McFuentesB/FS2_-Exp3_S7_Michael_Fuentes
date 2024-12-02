import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  minDate: string;
  rooms: any[] = [];
  errorMessage: string | null = null;
  private jsonUrl = 'https://hotelreservationsroomsfullstack2.s3.us-east-1.amazonaws.com/rooms.json';

  constructor(private router: Router, private http: HttpClient) {
    this.minDate = this.getTodayDate();
  }

  ngOnInit(): void {
    const storedRooms = localStorage.getItem('rooms');
    if (storedRooms) {
      this.rooms = JSON.parse(storedRooms);
    } else {
      this.fetchRooms();
    }
  }
  

  getTodayDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  fetchRooms() {
    this.http.get<any[]>(this.jsonUrl).subscribe({
      next: (data) => {
        this.rooms = data;
        this.errorMessage = null; // Resetea el error si la carga es exitosa
      },
      error: (err) => {
        console.error('Error al cargar las habitaciones:', err);
        this.errorMessage = 'No se pudieron cargar las habitaciones. Inténtelo más tarde.';
      },
    });
  }

  onDateSelect(event: Event, room: any) {
    const input = event.target as HTMLInputElement;
    room.selectedDate = input.value;
  }

  makeReservation(room: any) {
    if (!room || !room.selectedDate) {
      alert('Por favor, selecciona una fecha válida para continuar.');
      return;
    }

    const newReservation = {
      id: room.id,
      name: room.name,
      description: room.description,
      price: room.price,
      reservedAt: new Date().toISOString(),
      selectedDate: room.selectedDate,
    };

    const storedReservations = JSON.parse(localStorage.getItem('reservations') || '[]');
    localStorage.setItem('reservations', JSON.stringify([...storedReservations, newReservation]));

    alert(`Reserva realizada para: ${room.name} en la fecha: ${room.selectedDate}`);
  }

  logout() {
    this.router.navigate(['/login']);
  }

  goToPerfil() {
    this.router.navigate(['/perfil']);
  }

  goToReservas() {
    this.router.navigate(['/reservas']);
  }
}
