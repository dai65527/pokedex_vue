/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   pokemon.ts                                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: dnakano <dnakano@student.42tokyo.jp>       +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2021/01/14 12:13:28 by dnakano           #+#    #+#             */
/*   Updated: 2021/01/14 19:53:56 by dnakano          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

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
