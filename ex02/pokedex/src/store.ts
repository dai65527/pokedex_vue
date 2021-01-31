/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   store.ts                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: totaisei <totaisei@student.42tokyo.jp>     +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2021/01/28 09:06:23 by dnakano           #+#    #+#             */
/*   Updated: 2021/01/31 08:46:02 by totaisei         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import Vue from "vue";
import Vuex from "vuex";
import { Language } from "@/models/language";

Vue.use(Vuex);

export default new Vuex.Store<{ language: Language, search: string, typeFilter: string }>({
  state: {
    language: "ja-Hrkt",
    search: "",
    typeFilter: "None"
  },
  getters: {
    language: state => state.language,
    search: state => state.search,
    typeFilter: state => state.typeFilter
  },
  mutations: {
    changeLanguage(state, language: Language) {
      state.language = language;
    },
    changeSearch(state, search: string) {
      state.search = search;
    },
    changeTypeFilter(state, typeFilter: string){
      state.typeFilter = typeFilter;
    }
  }
});
