/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   store.ts                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: dnakano <dnakano@student.42tokyo.jp>       +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2021/01/28 09:06:23 by dnakano           #+#    #+#             */
/*   Updated: 2021/01/28 11:20:38 by dnakano          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import Vue from "vue";
import Vuex from "vuex";
import { Language } from "@/models/language";

Vue.use(Vuex);

export default new Vuex.Store<{ language: Language }>({
  state: {
    language: "en"
  }
});
