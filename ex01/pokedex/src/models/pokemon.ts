/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   pokemon.ts                                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: dnakano <dnakano@student.42tokyo.jp>       +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2021/01/14 12:13:28 by dnakano           #+#    #+#             */
/*   Updated: 2021/01/14 13:12:49 by dnakano          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

export interface IPokemon {
  id: number;
  name: string;
  imageUrl: string;
}

export default class Pokemon {
  private _props: IPokemon;

  constructor(props: IPokemon) {
    this._props = props;
  }

  public get id() : number {
    return this._props.id;
  }

  public get name() : string {
    return this._props.name;
  }

  public get imagering() : string {
    return this._props.imageUrl;
  }
}
