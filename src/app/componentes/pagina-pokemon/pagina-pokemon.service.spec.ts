import { TestBed } from '@angular/core/testing';

import { PaginaPokemonService } from './pagina-pokemon.service';

describe('PaginaPokemonService', () => {
  let service: PaginaPokemonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaginaPokemonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
