import Vue from "vue";
import Router from "vue-router";
import Pokedex from "./components/Pokedex.vue";
import Pokemon from "./components/Pokemon.vue";

Vue.use(Router);
export default new Router({
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
      path: "*",
      redirect: "/",
    },
  ],
  mode: "history",
});
