/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   pokeType.ts                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: totaisei <totaisei@student.42tokyo.jp>     +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2021/01/17 07:16:00 by dnakano           #+#    #+#             */
/*   Updated: 2021/01/30 18:57:49 by totaisei         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import axios from "axios";
import { findNameInLang, Language } from "./language";
import { POKEAPI_ROOT } from "./pokemon";

type PokeTypeNameEn =
  | "normal"
  | "fighting"
  | "flying"
  | "poison"
  | "ground"
  | "rock"
  | "bug"
  | "ghost"
  | "steel"
  | "fire"
  | "water"
  | "grass"
  | "electric"
  | "ice"
  | "dragon"
  | "dark"
  | "fairy"
  | "unknown"
  | "shadow";

export default class PokeType {
  constructor(
    public readonly id: number,
    public readonly nameEn: PokeTypeNameEn,
    public readonly name: string
  ) {}
}

// types is stored in JSON in this way
type TypeObj = {
  stats: number;
  type: {
    name: PokeTypeNameEn;
    url: string;
  };
};

const fetchAPokeType = async (
  typeObjUrl: string,
  lang: Language
): Promise<PokeType> => {
  const res = await axios.get(typeObjUrl);
  return new PokeType(
    res.data.id,
    res.data.name,
    findNameInLang(res.data.names, lang)
  );
}

export const fetchPokeTypes = async (
  typeObjAry: TypeObj[],
  lang: Language
): Promise<PokeType[]> => {
  return await Promise.all(
    typeObjAry.map(
      async (typeObj): Promise<PokeType> => {
        return fetchAPokeType(typeObj.type.url, lang);
      }
    )
  );
};

export const fetchPokeTypesInLang = async (
  lang: Language
): Promise<PokeType[]> => {
  const resTypes = await axios.get(POKEAPI_ROOT + 'type');
  const tmpTypes: {name: string, url: string}[] = resTypes.data.results;
  const tmpTypesInlang = await Promise.all(
    tmpTypes.map(
      async (item): Promise<PokeType> => {
        return fetchAPokeType(item.url, lang);
      }
    )
  );
  const pokeTypesInlang = tmpTypesInlang.filter(item => item.id < 1000);
  return pokeTypesInlang;
};
