import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { PaginaPokemonComponent } from './componentes/pagina-pokemon/pagina-pokemon.component';

const routes: Routes = [
  { path: '', component: HomeComponent }, // tela padrão (home), sendo carregada ao inicar.
  { path: 'pokemon/:id', component: PaginaPokemonComponent } // path da rota do pokemon, sendo carregado de acordo com o seu ID.
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
