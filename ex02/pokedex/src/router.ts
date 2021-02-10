import Vue from "vue";
import Router from "vue-router";
import Pokedex from "./components/Pokedex.vue";
import Pokemon from "./components/Pokemon.vue";
import PokemonRetro from './components/PokemonRetro.vue';

Vue.use(Router);
export default new Router({
  base: "/pokedex_vue/",
  routes: [
    {
      path: "/",
      name: "pokedex",
      component: Pokedex,
    },
    {
      path: "/pokemon/:id",
      name: "pokemon",
      component: Pokemon,
    },
    {
      path: "/pokemonRetro/:id",
      name: "pokemonRetro",
      component: PokemonRetro,
    },
    {
      path: "*",
      redirect: "/",
    },
  ],
  mode: "history",
});
