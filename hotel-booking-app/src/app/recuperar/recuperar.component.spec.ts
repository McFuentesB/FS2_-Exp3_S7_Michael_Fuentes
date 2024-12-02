import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecuperarComponent } from './recuperar.component';
import { Router } from '@angular/router';

// Mock del servicio Router
class MockRouter {
  navigate = jasmine.createSpy('navigate');
}

describe('RecuperarComponent', () => {
  let component: RecuperarComponent;
  let fixture: ComponentFixture<RecuperarComponent>;
  let router: MockRouter;

  beforeEach(async () => {
    router = new MockRouter();

    // TestBed sin NgModule ni imports, solo el componente
    await TestBed.configureTestingModule({
      providers: [
        RecuperarComponent,
        { provide: Router, useValue: router },
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecuperarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();  // Detecta cambios después de crear el componente
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería cambiar el estado a "userFound" al encontrar al usuario', () => {
    const storedUser = { username: 'testUser', password: 'testPassword' };
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(storedUser));

    component.username = 'testUser';

    component.onRecover(new Event('submit'));

    expect(component.userFound).toBeTrue();
  });

  it('debería mostrar un error si el usuario no se encuentra', () => {
    spyOn(localStorage, 'getItem').and.returnValue('{}');
    spyOn(window, 'alert');

    component.username = 'nonExistentUser';

    component.onRecover(new Event('submit'));

    expect(window.alert).toHaveBeenCalledWith('Usuario no encontrado');
  });

  it('debería restablecer la contraseña si las contraseñas coinciden', () => {
    const storedUser = { username: 'testUser', password: 'testPassword' };
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(storedUser));
    spyOn(localStorage, 'setItem');
    spyOn(window, 'alert');

    component.username = 'testUser';
    component.newPassword = 'newPassword';
    component.confirmPassword = 'newPassword';

    component.onResetPassword(new Event('submit'));

    expect(localStorage.setItem).toHaveBeenCalledWith('user', JSON.stringify({
      username: 'testUser',
      password: 'newPassword'
    }));
    expect(window.alert).toHaveBeenCalledWith('Contraseña restablecida con éxito');
    expect(component.userFound).toBeFalse();
    expect(component.username).toBe('');
    expect(component.newPassword).toBe('');
    expect(component.confirmPassword).toBe('');
  });

  it('debería mostrar un error si las contraseñas no coinciden', () => {
    spyOn(window, 'alert');

    component.newPassword = 'newPassword';
    component.confirmPassword = 'differentPassword';

    component.onResetPassword(new Event('submit'));

    expect(window.alert).toHaveBeenCalledWith('Las contraseñas no coinciden');
  });

  it('debería redirigir al login cuando se haga clic en el botón "Volver atrás"', () => {
    component.goToLogin();

    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('debería almacenar los valores del formulario en las propiedades del componente al escribir en los campos', () => {
    // Asigna valores directamente a las propiedades del componente
    component.username = 'testUser';
    component.newPassword = 'newPassword';
    component.confirmPassword = 'newPassword';
  
    // Verifica que los valores se hayan almacenado correctamente en las propiedades del componente
    expect(component.username).toBe('testUser');
    expect(component.newPassword).toBe('newPassword');
    expect(component.confirmPassword).toBe('newPassword');
  });
  
});
