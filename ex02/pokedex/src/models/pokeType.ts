/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   pokeType.ts                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: dnakano <dnakano@student.42tokyo.jp>       +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2021/01/17 07:16:00 by dnakano           #+#    #+#             */
/*   Updated: 2021/01/17 12:48:05 by dnakano          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import axios from "axios";
import { findNameInLang, Language } from "./language";

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

export const fetchPokeTypes = async (
  typeObjAry: TypeObj[],
  lang: Language
): Promise<PokeType[]> => {
  return await Promise.all(
    typeObjAry.map(
      async (typeObj): Promise<PokeType> => {
        const res = await axios.get(typeObj.type.url);
        return new PokeType(
          res.data.id,
          typeObj.type.name,
          findNameInLang(res.data.names, lang)
        );
      }
    )
  );
};
