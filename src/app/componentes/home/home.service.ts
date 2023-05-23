import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  private urlBase = 'https://pokeapi.co/api/v2/pokemon/';

  async getUrlPokemons() {
    const resposta: any = await this.http.get(`${this.urlBase}?limit=100`).toPromise(); // Obtendo os 100 primeiros pokemons da API.
    const resultados: any[] = resposta['results']; // Obtém a lista de resultados/results da resposta da API (onde estão as Urls referentes aos Pokémons).
    const UrlPokemons: string[] = resultados.map(pokemon => pokemon['url']); // Mapeia os resultados/results para extrair as URLs dos Pokémons.
    return UrlPokemons; // Retorna a lista de URLs dos Pokémons.
  }

  // Faz uma chamada para a URL específica do Pokémon, assim obtendo seus detalhes para preenchimento no Html.
  async getPokemonDetails(url: string) {
    return await this.http.get(url).toPromise(); 
  }

  // Retorna o Objeto do pokemon pesquisado.
  searchPokemon(pokemonPesquisa: string): Promise<any> {
    const url = `${this.urlBase}${pokemonPesquisa}`;
    return this.http.get<any>(url).toPromise();
  }
}
