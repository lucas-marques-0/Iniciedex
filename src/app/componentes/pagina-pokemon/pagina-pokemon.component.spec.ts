import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaPokemonComponent } from './pagina-pokemon.component';

describe('PaginaPokemonComponent', () => {
  let component: PaginaPokemonComponent;
  let fixture: ComponentFixture<PaginaPokemonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaginaPokemonComponent]
    });
    fixture = TestBed.createComponent(PaginaPokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
