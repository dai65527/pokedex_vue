/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   pokeStats.ts                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: dnakano <dnakano@student.42tokyo.jp>       +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2021/01/16 22:54:40 by dnakano           #+#    #+#             */
/*   Updated: 2021/01/17 13:03:29 by dnakano          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

export default class PokeStats {
  constructor(
    public readonly hp: number,
    public readonly attack: number,
    public readonly defense: number,
    public readonly specialAttack: number,
    public readonly specialDefense: number,
    public readonly speed: number,
    public readonly accuracy: number,
    public readonly evasion: number
  ) {}
}

type StatName =
  | "hp"
  | "attack"
  | "defense"
  | "special-attack"
  | "special-defense"
  | "speed"
  | "accuracy"
  | "evasion";

// stats is stored in JSON in this way
type Stats = {
  base_stat: number;
  effort: number;
  stat: { name: string; url: string };
};

const findStatValue = (statsAry: Stats[], statName: StatName): number => {
  const statValue = statsAry.find(stat => stat.stat.name == statName)
    ?.base_stat;
  if (statValue == void 0) {
    return 0;
  }
  return statValue;
};

export const getPokeStats = (statsAry: Stats[]): PokeStats => {
  return new PokeStats(
    findStatValue(statsAry, "hp"),
    findStatValue(statsAry, "attack"),
    findStatValue(statsAry, "defense"),
    findStatValue(statsAry, "special-attack"),
    findStatValue(statsAry, "special-defense"),
    findStatValue(statsAry, "speed"),
    findStatValue(statsAry, "accuracy"),
    findStatValue(statsAry, "evasion")
  );
};
