/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   language.ts                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: dnakano <dnakano@student.42tokyo.jp>       +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2021/01/17 08:22:30 by dnakano           #+#    #+#             */
/*   Updated: 2021/01/19 11:58:08 by dnakano          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

export type Language =
  | "ja-Hrkt"
  | "ko"
  | "zh-Hand"
  | "fr"
  | "de"
  | "es"
  | "it"
  | "en"
  | "ja"
  | "zh-Hans";

export const findNameInLang = (
  nameInLangs: { language: { name: Language }; name: string }[],
  langDesignation: Language
): string => {
  const nameInLang = nameInLangs.find(nameInLang => {
    return nameInLang.language.name === langDesignation;
  });
  if (nameInLang === void 0) {
    return "N/A";
  }
  return nameInLang.name;
};

export const findGenusInLang = (
  nameInLangs: { language: { name: Language }; genus: string }[],
  langDesignation: Language
): string => {
  const nameInLang = nameInLangs.find(nameInLang => {
    return nameInLang.language.name === langDesignation;
  });
  if (nameInLang === void 0) {
    return "N/A";
  }
  return nameInLang.genus;
};
