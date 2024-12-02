import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { Router } from '@angular/router';

// Mock del servicio Router
class MockRouter {
  navigate = jasmine.createSpy('navigate');
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: MockRouter;

  beforeEach(async () => {
    router = new MockRouter();

    // TestBed sin NgModule ni imports, solo el componente
    await TestBed.configureTestingModule({
      providers: [
        LoginComponent, // Directamente el componente que queremos probar
        { provide: Router, useValue: router },  // Mock del router
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();  // Verifica que el componente se haya creado correctamente
  });

  it('debería almacenar el valor del username al escribir', () => {
    const inputElement = fixture.nativeElement.querySelector('#username');
    inputElement.value = 'testUser';
    inputElement.dispatchEvent(new Event('input'));

    expect(component.username).toBe('testUser');  // Verifica que el valor del username se haya almacenado
  });

  it('debería almacenar el valor del password al escribir', () => {
    const inputElement = fixture.nativeElement.querySelector('#password');
    inputElement.value = 'testPassword';
    inputElement.dispatchEvent(new Event('input'));

    expect(component.password).toBe('testPassword');  // Verifica que el valor del password se haya almacenado
  });

  it('debería navegar al dashboard al hacer login con credenciales correctas', () => {
    // Mock de localStorage
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify({ username: 'testUser', password: 'testPassword' }));
    component.username = 'testUser';
    component.password = 'testPassword';

    component.onLogin();

    expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);  // Verifica que la navegación al dashboard ocurra
  });

  it('debería mostrar una alerta al hacer login con credenciales incorrectas', () => {
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify({ username: 'testUser', password: 'testPassword' }));
    component.username = 'wrongUser';
    component.password = 'wrongPassword';

    spyOn(window, 'alert');  // Espía sobre la función alert
    component.onLogin();

    expect(window.alert).toHaveBeenCalledWith('Usuario o contraseña incorrectos');  // Verifica que se muestre la alerta
  });
});
