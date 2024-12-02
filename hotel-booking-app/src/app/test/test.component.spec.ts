import { ComponentFixture, TestBed } from '@angular/core/testing'; // Importa las herramientas necesarias para las pruebas en Angular
import { TestComponent } from './test.component'; // Importa el componente que vamos a probar

describe('TestComponent', () => {
  let component: TestComponent; // Variable para almacenar la instancia del componente
  let fixture: ComponentFixture<TestComponent>; // Variable para almacenar la instancia del 'Fixture' que gestiona la creación y el ciclo de vida del componente

  // Este bloque se ejecuta antes de cada prueba, para configurar el entorno de pruebas
  beforeEach(async () => {
    // Configura el módulo de pruebas de Angular con lo mínimo, sin importar el @NgModule
    await TestBed.configureTestingModule({
      declarations: [TestComponent] // Declara el componente que se va a probar
    })
    .compileComponents(); // Compila los componentes declarados (requiere compilar los componentes antes de usarlos)
  });

  // Este bloque se ejecuta después de cada prueba, para inicializar las instancias del componente y la 'fixture'
  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent); // Crea una instancia de 'TestComponent' con el 'Fixture'
    component = fixture.componentInstance; // Asigna la instancia del componente a la variable 'component'
    fixture.detectChanges(); // Ejecuta el ciclo de cambios para que Angular actualice las vistas del componente
  });

  // Prueba 1: Verifica que el componente se crea correctamente
  it('debería crear el componente', () => {
    expect(component).toBeTruthy(); // Asegura que la instancia del componente no sea nula o indefinida
  });

  // Prueba 2: Verifica que el valor inicial de 'title' sea correcto
  it('debería tener el título inicial correcto', () => {
    expect(component.title).toBe('Test Component'); // Verifica que la propiedad 'title' tenga el valor esperado
  });

  // Prueba 3: Verifica que el contador se incremente correctamente
  it('debería incrementar el contador cuando se llama al método increment', () => {
    component.increment(); // Llama al método 'increment' que debería aumentar el contador
    expect(component.counter).toBe(1); // Verifica que el contador sea 1 después de incrementar
  });

  // Prueba 4: Verifica que el contador se resetea correctamente
  it('debería resetear el contador cuando se llama al método reset', () => {
    component.increment(); // Incrementa el contador (debería ser 1)
    component.reset(); // Llama al método 'reset' para poner el contador a 0
    expect(component.counter).toBe(0); // Verifica que el contador sea 0 después de resetear
  });

  // Prueba 5: Verifica que el contador se duplique correctamente
  it('debería duplicar el contador cuando se llama al método double', () => {
    component.increment(); // Incrementa el contador (debería ser 1)
    component.double(); // Llama al método 'double' para duplicar el valor del contador
    expect(component.counter).toBe(2); // Verifica que el contador sea 2 después de duplicarlo
  });

  // Prueba 6: Verifica que el título se muestre correctamente en la plantilla
  it('debería renderizar el título correcto en la plantilla', () => {
    const compiled = fixture.nativeElement as HTMLElement; // Obtiene el elemento HTML de la plantilla del componente
    expect(compiled.querySelector('h1')?.textContent).toContain('Test Component'); // Verifica que el texto dentro de la etiqueta <h1> contenga el título esperado
  });
});
