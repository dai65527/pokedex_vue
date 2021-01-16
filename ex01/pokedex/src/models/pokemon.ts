/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   pokemon.ts                                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: totaisei <totaisei@student.42tokyo.jp>     +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2021/01/14 12:13:28 by dnakano           #+#    #+#             */
/*   Updated: 2021/01/15 19:17:05 by totaisei         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import axios from "axios";

const POKEAPI_ROOT = "https://pokeapi.co/api/v2/";
export const POKE_MAX = 898;

export default class Pokemon {
  private id_: number;
  private name_: string;
  private imageUrl_: string;

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

type Language =
  | "ja-Hrkt"
  | "ko"
  | "zh-Hand"
  | "fr"
  | "de"
  | "es"
  | "it"
  | "en"
  | "ja"
  | "zh-Hans";

const getPokeName = (
  nameInLangs: { language: { name: Language; url: string }; name: string }[],
  langDesignation: string
): string => {
  const pokeNameInLang = nameInLangs.find((nameInLang) => {
    return nameInLang.language.name === langDesignation;
  });
  if (pokeNameInLang === void 0) {
    return "N/A";
  }
  return pokeNameInLang.name;
};

const fetchAPokemon = async (url: string, lang: Language): Promise<Pokemon> => {
  const resPokeInfo = await axios.get(url);
  const resPokeSpecies = await axios.get(resPokeInfo.data.species.url);
  return new Pokemon(
    resPokeInfo.data.id,
    getPokeName(resPokeSpecies.data.names, lang),
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
