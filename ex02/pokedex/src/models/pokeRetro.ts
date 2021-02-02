/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   pokeRetro.ts                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: totaisei <totaisei@student.42tokyo.jp>     +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2021/02/01 16:36:39 by totaisei          #+#    #+#             */
/*   Updated: 2021/02/02 14:01:08 by totaisei         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import axios from "axios";
import Pokemon, { POKEAPI_ROOT } from "./pokemon";
import PokeType, { fetchPokeTypes } from "./pokeType";
import {
  findNameInLang,
  findGenusInLang,
  findFlavorTextInLang,
  Language,
} from "./language";

export default class PokeRetro extends Pokemon {
  constructor(
    pokemon: Pokemon,
    public readonly weight: number,
    public readonly height: number,
    public readonly genus: string,
    public readonly types: PokeType[],
    public readonly flavorText: string[]
  ) {
    super(pokemon.id, pokemon.name, pokemon.imageUrl);
  }
}

export const emptyPokeRetro = new PokeRetro(
  new Pokemon(0, "", ""),
  0,
  0,
  "",
  [],
  []
);

export const fetchPokeRetroById = async (
  id: number,
  lang: Language
): Promise<PokeRetro> => {
  const resPokeInfo = await axios.get(POKEAPI_ROOT + `pokemon/${id}`);
  const [pokeTypes, resPokeSpecies] = await Promise.all([
    fetchPokeTypes(resPokeInfo.data.types, lang),
    axios.get(resPokeInfo.data.species.url),
  ]);
  return new PokeRetro(
    new Pokemon(
      id,
      findNameInLang(resPokeSpecies.data.names, lang),
      resPokeInfo.data.sprites.versions["generation-i"]["red-blue"].front_gray
    ),
    resPokeInfo.data.weight / 10,
    resPokeInfo.data.height / 10,
    findGenusInLang(resPokeSpecies.data.genera, lang),
    pokeTypes,
    findFlavorTextInLang(resPokeSpecies.data.flavor_text_entries, lang)
  );
};
