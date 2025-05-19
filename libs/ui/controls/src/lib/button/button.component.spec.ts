import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';
import { By } from '@angular/platform-browser'; // Für DebugElement Querying

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;
  let buttonElement: HTMLButtonElement;
  let hostElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    hostElement = fixture.nativeElement;
    buttonElement = fixture.debugElement.query(By.css('button')).nativeElement;
  });

  it('should create', () => {
    fixture.detectChanges(); // Initiales Rendering
    expect(component).toBeTruthy();
  });

  it('should display the provided label', () => {
    component.label = 'Click Me';
    fixture.detectChanges();
    expect(buttonElement.textContent?.trim()).toBe('Click Me');
  });

  it('should display an empty label if no label is provided', () => {
    fixture.detectChanges();
    expect(buttonElement.textContent?.trim()).toBe('');
  });
  describe('Primary State', () => {
    it('should apply primary class when isPrimary is true', () => {
      component.isPrimary = true;
      fixture.detectChanges();
      expect(hostElement.classList.contains('primary')).toBe(true);
      expect(buttonElement.classList.contains('primary')).toBe(true);
    });

    it('should not apply primary class when isPrimary is false (default)', () => {
      fixture.detectChanges();
      expect(hostElement.classList.contains('primary')).toBe(false);
      expect(buttonElement.classList.contains('primary')).toBe(false);
    });
  });

  describe('Disabled State', () => {
    it('should apply disabled attributes and classes when isDisabled is true', () => {
      component.isDisabled = true;
      fixture.detectChanges();
      expect(hostElement.classList.contains('disabled')).toBe(true); // KORREKTUR
      expect(hostElement.getAttribute('aria-disabled')).toBe('true'); // Dies ist OK, da String-Vergleich
      expect(buttonElement.classList.contains('disabled')).toBe(true); // KORREKTUR
      expect(buttonElement.disabled).toBe(true); // KORREKTUR (nativeElement.disabled ist boolean)
    });

    it('should not apply disabled attributes and classes when isDisabled is false (default)', () => {
      fixture.detectChanges();
      expect(hostElement.classList.contains('disabled')).toBe(false); // KORREKTUR
      expect(hostElement.getAttribute('aria-disabled')).toBeNull(); // OK
      expect(buttonElement.classList.contains('disabled')).toBe(false); // KORREKTUR
      expect(buttonElement.disabled).toBe(false); // KORREKTUR
    });
  });
});

// Ja, der Test für deinen ButtonComponent (so wie wir ihn besprochen haben, mit TestBed oder @testing-library/angular's render) ist ein Unit-Test im Angular-Kontext.
// Du hast es richtig erfasst:
// Es wird nur eine Komponente getestet: Der Fokus liegt ausschließlich auf der ButtonComponent, ihren Inputs, Outputs, ihrem internen Zustand und wie ihr Template gerendert wird.
// Isolation (im Angular-Sinne): Obwohl das TestBed eine Mini-Angular-Umgebung aufbaut, dient diese Umgebung dazu, die eine Komponente isoliert von anderen Teilen deiner Anwendung (wie anderen Komponenten, komplexen Services, Routing etc.) zu testen. Abhängigkeiten werden entweder nicht benötigt oder durch einfache Mocks/Stubs bereitgestellt.
// Warum die Verwirrung manchmal entsteht (und warum es trotzdem ein Unit-Test ist):
// "Klassische" Unit-Tests: In traditioneller Softwareentwicklung außerhalb von UI-Frameworks testet ein Unit-Test oft eine einzelne Funktion oder eine Klasse, die direkt instanziiert wird, ohne jegliches Framework-Setup.
// Angular Unit-Tests ("Integrierte Unit-Tests"): Für Angular-Komponenten (und Direktiven, Pipes) ist es fast immer notwendig, das TestBed (oder eine Abstraktion davon) zu verwenden. Das liegt daran, dass eine Komponente ohne Angulars Dependency Injection, Change Detection und Template-Kompilierung oft nicht sinnvoll testbar ist.
// Das TestBed stellt genau diese minimale Infrastruktur bereit, damit die eine zu testende Komponente funktioniert, als wäre sie in einer echten Angular-Anwendung – aber eben isoliert.
// Man könnte es als "integrierten Unit-Test" bezeichnen, weil die Unit (die Komponente) mit den Kernmechanismen des Frameworks integriert getestet wird, aber immer noch auf die eine Unit beschränkt ist.
// Abgrenzung zum Integrationstest:
// Ein Integrationstest in Angular würde typischerweise das Zusammenspiel testen:
// Einer Komponente mit einem echten (oder komplexer gemockten) Service.
// Einer Elternkomponente mit einer ihrer Kindkomponenten (z.B. ob @Input und @Output korrekt funktionieren, wenn die Kindkomponente in der Elternkomponente verwendet wird).
// Mehrerer Komponenten, die über einen gemeinsamen Service Zustände austauschen.
// Fazit:
// Ja, der Test für deinen ButtonComponent ist ein Unit-Test. Es ist die gängige und empfohlene Art, einzelne Angular-Komponenten zu testen. Die Verwendung des TestBed macht es nicht automatisch zu einem Integrationstest, solange der Fokus klar auf der Funktionalität dieser einen Komponente liegt.
