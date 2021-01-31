/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   pokemon.ts                                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: totaisei <totaisei@student.42tokyo.jp>     +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2021/01/14 12:13:28 by dnakano           #+#    #+#             */
/*   Updated: 2021/01/31 09:52:08 by totaisei         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import axios from "axios";
import { findNameInLang, Language } from "./language";

export const POKEAPI_ROOT = "https://pokeapi.co/api/v2/";
export const POKE_MAX = 898;

export default class Pokemon {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly imageUrl: string
  ) {}
}

const fetchAPokemon = async (url: string, lang: Language): Promise<Pokemon> => {
  const resPokeInfo = await axios.get(url);
  const resPokeSpecies = await axios.get(resPokeInfo.data.species.url);
  return new Pokemon(
    resPokeInfo.data.id,
    findNameInLang(resPokeSpecies.data.names, lang),
    resPokeInfo.data.sprites.other["official-artwork"].front_default
  );
};

export const fetchPokemons = async (
  fetchUrl: string,
  lang: Language,
  filtered: boolean
): Promise<Pokemon[]> => {
  const resPokeList = await axios.get(POKEAPI_ROOT + fetchUrl);
  let pokemons: Pokemon[] = [];
  if (!filtered) {
    pokemons = await Promise.all(
      resPokeList.data.results.map(
        async (result: { url: string }): Promise<Pokemon> => {
          const pokemon = await fetchAPokemon(result.url, lang);
          return pokemon;
        }
      )
    );
  } else {
    pokemons = await Promise.all(
      resPokeList.data.pokemon.map(
        async (result: { pokemon: { url: string } }): Promise<Pokemon> => {
          const pokemon = await fetchAPokemon(result.pokemon.url, lang);
          return pokemon;
        }
      )
    );
    pokemons = pokemons.filter(item => item.id < 10000);
  }
  return pokemons;
};
