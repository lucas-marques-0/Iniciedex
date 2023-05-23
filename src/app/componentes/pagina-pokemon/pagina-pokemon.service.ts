import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaginaPokemonService {

  private urlBase = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) { }

  // -> Obtendo objeto referente ao pokemon atravavés do ID fornecido pela rota. 
  getDetalhesPokemon(idPokemon: string): Observable<any> {
    const url = `${this.urlBase}/pokemon/${idPokemon}`;
    return this.http.get<any>(url);
  }

  // -> Obtendo descrição referente ao Pokémon.
  async getDescricaoPokemon(idPokemon: string) {
    const url = `${this.urlBase}/pokemon-species/${idPokemon}`; 
    const dadosEspecie = await this.http.get<any>(url).toPromise();
    const descricoes = dadosEspecie['flavor_text_entries']; // pegando a propriedade 'flavor_text_entries' do objeto retornado, onde estão os textos.
    const descricaoIngles = descricoes.find((entry: any) => entry.language.name === 'en'); // Encontrando a descrição em inglês.
    const descricao = descricaoIngles['flavor_text']; // Obtendo texto.
    return descricao; // Retornando texto.
  }
}
