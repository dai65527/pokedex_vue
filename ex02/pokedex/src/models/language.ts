/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   language.ts                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: dnakano <dnakano@student.42tokyo.jp>       +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2021/01/17 08:22:30 by dnakano           #+#    #+#             */
/*   Updated: 2021/01/28 13:56:43 by dnakano          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

export type Language =
  | "ja-Hrkt"
  | "ko"
  | "fr"
  | "de"
  | "es"
  | "it"
  | "en"
  | "zh-Hans";

type DisplayName = string;

export const languageNameMap: ReadonlyMap<Language, DisplayName> = new Map([
  ["ja-Hrkt", "JA"],
  ["ko", "KO"],
  ["fr", "FR"],
  ["de", "DE"],
  ["es", "ES"],
  ["it", "IT"],
  ["en", "EN"],
  ["zh-Hans", "CH"]
]);

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
