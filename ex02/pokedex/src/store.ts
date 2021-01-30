/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   store.ts                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: totaisei <totaisei@student.42tokyo.jp>     +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2021/01/28 09:06:23 by dnakano           #+#    #+#             */
/*   Updated: 2021/01/30 16:43:05 by totaisei         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import Vue from "vue";
import Vuex from "vuex";
import { Language } from "@/models/language";

Vue.use(Vuex);

export default new Vuex.Store<{ language: Language }>({
  state: {
    language: "ja-Hrkt",
    
  },
  getters: {
    language: state => state.language
  },
  mutations: {
    changeLanguage(state, language: Language) {
      state.language = language;
    }
  }
});
