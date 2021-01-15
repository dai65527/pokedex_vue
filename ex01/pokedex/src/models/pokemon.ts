/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Pokemon.ts                                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: dnakano <dnakano@student.42tokyo.jp>       +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2021/01/14 12:13:28 by dnakano           #+#    #+#             */
/*   Updated: 2021/01/15 20:40:00 by dnakano          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import axios from "axios";

const POKEAPI_ROOT = "https://pokeapi.co/api/v2/";
export const POKE_MAX = 898;

export default class Pokemon {
  private id_: number;
  name_: string;
  imageUrl_: string;

  constructor(id: number, name: string, imageUrl: string) {
    this.id_ = id;
    this.name_ = name;
    this.imageUrl_ = imageUrl;
  }

  public get id(): number {
    return this.id_;
  }

  public get name(): string {
    return this.name_;
  }

  public get imageUrl(): string {
    return this.imageUrl_;
  }
}

const fetchAPokemon = async (url: string): Promise<Pokemon> => {
  const resPokeInfo = await axios.get(url);
  const resPokeSpecies = await axios.get(resPokeInfo.data.species.url);
  return new Pokemon(
    resPokeInfo.data.id,
    resPokeSpecies.data.names[9].name,
    resPokeInfo.data.sprites.other["official-artwork"].front_default
  );
};

export const fetchPokemons = async (
  offset: number,
  limit: number
): Promise<Pokemon[]> => {
  const resPokeList = await axios.get(
    POKEAPI_ROOT + `pokemon/?offset=${offset}&limit=${limit}`
  );
  const pokemons: Pokemon[] = await Promise.all(
    resPokeList.data.results.map(async (result: { url: string }) => {
      const pokemon = await fetchAPokemon(result.url);
      return pokemon;
    })
  );
  return pokemons;
};
