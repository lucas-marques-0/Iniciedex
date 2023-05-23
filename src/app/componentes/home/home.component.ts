import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  pokemons: any[] = [];
  indexAtual: number = 0;
  pokemonUrls: string[] = [];
  pokemonPesquisa: string = '';  
  naoEncontrado: boolean = false;

  constructor(private homeService: HomeService) {}

  ngOnInit() {
    this.carregarUrlPokemons();
  }

  // -> Obtendo as Urls dos Pokémons e usando-as para carregar suas informações através da função 'carregarPokemons()'.
  async carregarUrlPokemons() {
    this.pokemonUrls = await this.homeService.getUrlPokemons();
    this.carregarPokemons();
  }

  // -> Função assíncrona responsável por carregar informações dos Pokémon.
  async carregarPokemons() {
    const urls = this.pokemonUrls.slice(this.indexAtual, this.indexAtual + 10); // Obtém uma fatia de URLs de Pokémon com base no índice atual e no próximo intervalo de 10 URLs.
    const pokemonPromises = urls.map(url => this.homeService.getPokemonDetails(url)); // Mapeia cada URL para obter os detalhes de cada um dos 10 Pokémons.
    const pokemons = await Promise.all(pokemonPromises); // Aguarda a resolução de todas as promises usando 'Promise.all()' e armazena os Pokémon retornados na variável 'pokemons'.
    this.pokemons = pokemons; // Atualiza o array de 'pokemons' do componente com os Pokémons carregados.
  }

  // -> Carrega os próximos Pokémons, se houver mais disponíveis. (OBS: usado para montar a variável 'urls' de 'carregarPokemons()').
  pokemonsProx() { 
    if (this.indexAtual + 10 < this.pokemonUrls.length) {
      this.indexAtual += 10;
      this.carregarPokemons();
    }
  }

  // -> Carrega os Pokémons anteriores, se houver mais disponíveis. (OBS: usado para montar a variável 'urls' de 'carregarPokemons()').
  pokemonsAnt() {
    if (this.indexAtual >= 10) {
      this.indexAtual -= 10;
      this.carregarPokemons();
    }
  }

  // -> Realiza a busca de um Pokémon e carrega seus detalhes.
  async searchPokemon() {
    if (this.pokemonPesquisa.trim() !== '') { // Verifica se a pesquisa não está vazia.
      try {
        const pokemon = await this.homeService.searchPokemon(this.pokemonPesquisa.toLowerCase()); // Buscando o pokemon.
        if (pokemon) { // Verificando se o Pokémon foi encontrado.
          this.pokemons = [pokemon];
        }
      } catch (error) { // Trata o erro, caso ele ocorra durante a busca do Pokémon.
        this.naoEncontrado = true;
        this.pokemonPesquisa = '';
      }
    } else { // Executa caso o termo de pesquisa esteja vazio.
      this.naoEncontrado = true;
      this.pokemonPesquisa = '';
    }
  }

  // -> Função para capitalizar textos, caso a API não retorne formatado.
  formatarTexto(texto: string){
    const primeiraLetra = texto.charAt(0).toUpperCase();
    const restoDoTexto = texto.slice(1).toLowerCase(); 
    return primeiraLetra + restoDoTexto;
  }
}
