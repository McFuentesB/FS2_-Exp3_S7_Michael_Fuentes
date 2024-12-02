import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PerfilComponent } from './perfil.component';
import { Router } from '@angular/router';

// Mock del servicio Router
class MockRouter {
  navigate = jasmine.createSpy('navigate');
}

describe('PerfilComponent', () => {
  let component: PerfilComponent;
  let fixture: ComponentFixture<PerfilComponent>;
  let router: MockRouter;

  beforeEach(async () => {
    router = new MockRouter();

    // TestBed sin NgModule ni imports, solo el componente
    await TestBed.configureTestingModule({
      providers: [
        PerfilComponent, // Directamente el componente que queremos probar
        { provide: Router, useValue: router },  // Mock del router
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();  // Verifica que el componente se haya creado correctamente
  });

  it('debería cargar los datos del usuario desde localStorage al inicializar', () => {
    // Mock de localStorage
    const storedUser = { username: 'testUser', password: 'testPassword' };
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(storedUser));

    component.ngOnInit();  // Ejecutar ngOnInit para cargar el usuario

    expect(component.username).toBe(storedUser.username);
    expect(component.password).toBe(storedUser.password);
  });

  it('debería actualizar los datos del usuario cuando se envíe el formulario con contraseñas coincidentes', () => {
    spyOn(window, 'alert');  // Asegúrate de espiar antes de la acción
  
    component.username = 'testUser';
    component.password = 'newPassword';
    component.confirmPassword = 'newPassword';
  
    spyOn(localStorage, 'setItem');  // Espía sobre localStorage.setItem
  
    component.onUpdate();  // Llamamos al método onUpdate
  
    expect(localStorage.setItem).toHaveBeenCalledWith('user', JSON.stringify({
      username: 'testUser',
      password: 'newPassword'
    }));
    expect(window.alert).toHaveBeenCalledWith('Usuario actualizado exitosamente');  // Verifica la alerta
  });
  

  it('debería mostrar un error cuando las contraseñas no coinciden', () => {
    // Simula el valor de los inputs
    component.username = 'testUser';
    component.password = 'newPassword';
    component.confirmPassword = 'differentPassword';

    spyOn(window, 'alert');  // Espía sobre la función alert

    component.onUpdate();  // Llamamos al método onUpdate

    expect(window.alert).toHaveBeenCalledWith('Las contraseñas no coinciden');  // Verifica la alerta de error
  });

  it('debería redirigir al dashboard cuando se haga clic en el botón "Volver al Dashboard"', () => {
    component.goToDashboard();  // Llamamos al método goToDashboard

    expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);  // Verifica que la navegación ocurra
  });

  it('debería almacenar los valores del formulario en las propiedades del componente al escribir en los campos', () => {
    // Simula la escritura en los campos
    const usernameInput = fixture.nativeElement.querySelector('#username');
    usernameInput.value = 'newUser';
    usernameInput.dispatchEvent(new Event('input'));

    const passwordInput = fixture.nativeElement.querySelector('#password');
    passwordInput.value = 'newPassword';
    passwordInput.dispatchEvent(new Event('input'));

    const confirmPasswordInput = fixture.nativeElement.querySelector('#confirmPassword');
    confirmPasswordInput.value = 'newPassword';
    confirmPasswordInput.dispatchEvent(new Event('input'));

    expect(component.username).toBe('newUser');
    expect(component.password).toBe('newPassword');
    expect(component.confirmPassword).toBe('newPassword');
  });
});
