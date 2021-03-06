/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   pokeInfo.ts                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: totaisei <totaisei@student.42tokyo.jp>     +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2021/01/16 22:21:35 by dnakano           #+#    #+#             */
/*   Updated: 2021/01/19 14:31:42 by totaisei         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import axios from "axios";
import Pokemon, { POKEAPI_ROOT } from "./pokemon";
import PokeStats, { getPokeStats } from "./pokeStats";
import PokeType, { fetchPokeTypes } from "./pokeType";
import { findNameInLang, findGenusInLang, Language } from "./language";

export default class PokeInfo extends Pokemon {
  constructor(
    pokemon: Pokemon,
    public readonly weight: number,
    public readonly height: number,
    public readonly genus: string,
    public readonly types: PokeType[],
    public readonly stats: PokeStats
  ) {
    super(pokemon.id, pokemon.name, pokemon.imageUrl);
  }
}

export const emptyPokeInfo = new PokeInfo(
  new Pokemon(0, "", ""),
  0,
  0,
  "",
  [],
  new PokeStats(0, 0, 0, 0, 0, 0, 0, 0)
);

export const fetchPokeInfoById = async (
  id: number,
  lang: Language
): Promise<PokeInfo> => {
  const resPokeInfo = await axios.get(POKEAPI_ROOT + `pokemon/${id}`);
  const [pokeTypes, resPokeSpecies] = await Promise.all([
    fetchPokeTypes(resPokeInfo.data.types, lang),
    axios.get(resPokeInfo.data.species.url),
  ]);
  return new PokeInfo(
    new Pokemon(
      id,
      findNameInLang(resPokeSpecies.data.names, lang),
      resPokeInfo.data.sprites.other["official-artwork"].front_default
    ),
    resPokeInfo.data.weight / 10,
    resPokeInfo.data.height / 10,
    findGenusInLang(resPokeSpecies.data.genera, lang),
    pokeTypes,
    getPokeStats(resPokeInfo.data.stats)
  );
};
