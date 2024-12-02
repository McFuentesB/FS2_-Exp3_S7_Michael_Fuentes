import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { ReservasComponent } from './reservas.component';
import { StorageService } from '../services/storage.service';

describe('ReservasComponent', () => {
  let component: ReservasComponent;
  let fixture: ComponentFixture<ReservasComponent>;
  let storageService: jasmine.SpyObj<StorageService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    // Crear mocks de los servicios
    storageService = jasmine.createSpyObj('StorageService', ['get', 'save']);
    router = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [ReservasComponent], // Agregar el componente al array de imports
      providers: [
        { provide: StorageService, useValue: storageService },
        { provide: Router, useValue: router }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe cargar las reservas desde el almacenamiento al inicializar', () => {
    const mockReservations = [
      { id: '1', name: 'Reserva 1', roomId: 1, selectedDate: '2024-11-25' },
      { id: '2', name: 'Reserva 2', roomId: 2, selectedDate: '2024-11-26' }
    ];
    storageService.get.and.returnValue(mockReservations);

    component.ngOnInit();
    expect(component.reservations).toEqual(mockReservations);
  });

  it('debe establecer las reservas como vacías si no hay reservas almacenadas', () => {
    storageService.get.and.returnValue(null);

    component.ngOnInit();
    expect(component.reservations).toEqual([]);
  });

  it('debe cancelar una reserva por id', () => {
    const mockReservations = [
      { id: '1', name: 'Reserva 1', roomId: 1, selectedDate: '2024-11-25' },
      { id: '2', name: 'Reserva 2', roomId: 2, selectedDate: '2024-11-26' }
    ];
    component.reservations = mockReservations;
    storageService.save.and.callThrough();

    component.cancelReservation('1');
    expect(component.reservations.length).toBe(1);
    expect(component.reservations[0].id).toBe('2');
    expect(storageService.save).toHaveBeenCalledWith('reservations', component.reservations);
  });

  it('debe navegar al dashboard', () => {
    component.goToDashboard();
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('debe devolver la imagen de la habitación si la habitación existe', () => {
    const image = component.getRoomImage(1);
    expect(image).toBe('https://images.mirai.com/INFOROOMS/100377926/GEe1lJbqZ4nh3FPX9vKs/GEe1lJbqZ4nh3FPX9vKs_original.jpg');
  });

  it('debe devolver una cadena vacía si la habitación no existe', () => {
    const image = component.getRoomImage(999); // ID que no existe
    expect(image).toBe('');
  });
});
