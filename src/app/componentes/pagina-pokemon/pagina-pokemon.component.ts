import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaginaPokemonService } from './pagina-pokemon.service';

@Component({
  selector: 'app-pagina-pokemon',
  templateUrl: './pagina-pokemon.component.html',
  styleUrls: ['./pagina-pokemon.component.css']
})
export class PaginaPokemonComponent {

  pokemon: any;
  descricaoPokemon: string = '';
  corTipoPokemon: any;
  
  // -> Variáveis para armazenar os status/atributos do Pokémon.
  atributoVida: number = 0;
  atributoDefesa: number = 0;
  atributoVelocidade: number = 0;
  atributoAtaque: number = 0;

  constructor(
    private route: ActivatedRoute,
    private paginaPokemonService: PaginaPokemonService
  ) { }

  // -> Obtém o ID pela rota e carrega os detalhes do Pokémon com base nele.
  ngOnInit(): void{
    this.route.params.subscribe(params => {
      const idPokemon = params['id'];
      this.carregarDetalhesPokemon(idPokemon);
    });
  }

  // -> Obtendo objeto do pokemon através do seu ID.
  carregarDetalhesPokemon(idPokemon: string){
    this.paginaPokemonService.getDetalhesPokemon(idPokemon).subscribe(resp => {
      this.pokemon = resp;
      this.carregarDescricao(idPokemon);
      this.carregarAtributos(this.pokemon['stats']); 
      this.corTipoPokemon = this.carregarCorTipo(this.pokemon['types'][0]['type']['name']);
    });
  }

  // -> Obtendo descrição referente ao Pokémon.
  async carregarDescricao(pokemonId: string){
    this.descricaoPokemon = await this.paginaPokemonService.getDescricaoPokemon(pokemonId);
  }

  // -> Vasculhando os 'stats' até achar os equivalentes as variáveis e armazenar a sua propriedade 'base_stat'.
  carregarAtributos(objAtributos: any){
    this.atributoVida = objAtributos.find((stat: any) => stat.stat.name === 'hp').base_stat;
    this.atributoDefesa = objAtributos.find((stat: any) => stat.stat.name === 'defense').base_stat;
    this.atributoVelocidade = objAtributos.find((stat: any) => stat.stat.name === 'speed').base_stat;
    this.atributoAtaque = objAtributos.find((stat: any) => stat.stat.name === 'attack').base_stat;
  }

  // -> Como a API não disponibiliza a cor referente ao tipo do pokemon, precisei fazer manualmente.
  carregarCorTipo(tipo: string): string {
    const corTipoPokemonHex: { [key: string]: string } = {
      normal: "#A8A77A",
      fire: "#EE8130",
      water: "#6390F0",
      electric: "#F7D02C",
      grass: "#7AC74C",
      ice: "#96D9D6",
      fighting: "#C22E28",
      poison: "#A33EA1",
      ground: "#E2BF65",
      flying: "#A98FF3",
      psychic: "#F95587",
      bug: "#A6B91A",
      rock: "#B6A136",
      ghost: "#735797",
      dragon: "#6F35FC",
      dark: "#705746",
      steel: "#B7B7CE",
      fairy: "#D685AD",
    };
    return corTipoPokemonHex[tipo] || "#000000";
  }

  // -> Função para capitalizar textos, caso a API não retorne formatado.
  formatarTexto(texto: string){
    const primeiraLetra = texto.charAt(0).toUpperCase();
    const restoDoTexto = texto.slice(1).toLowerCase(); 
    return primeiraLetra + restoDoTexto;
  }
}
