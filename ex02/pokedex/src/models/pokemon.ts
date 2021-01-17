/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   pokemon.ts                                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: dnakano <dnakano@student.42tokyo.jp>       +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2021/01/14 12:13:28 by dnakano           #+#    #+#             */
/*   Updated: 2021/01/17 09:02:15 by dnakano          ###   ########.fr       */
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
  offset: number,
  limit: number,
  lang: Language
): Promise<Pokemon[]> => {
  const resPokeList = await axios.get(
    POKEAPI_ROOT + `pokemon/?offset=${offset}&limit=${limit}`
  );
  const pokemons: Pokemon[] = await Promise.all(
    resPokeList.data.results.map(
      async (result: { url: string }): Promise<Pokemon> => {
        const pokemon = await fetchAPokemon(result.url, lang);
        return pokemon;
      }
    )
  );
  return pokemons;
};
