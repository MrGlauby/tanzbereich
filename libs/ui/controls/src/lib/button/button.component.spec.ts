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

