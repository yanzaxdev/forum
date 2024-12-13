"use client";

import type { FC } from "react";
import { TranslationsType } from "~/translations";
import { useLanguage } from "../providers";

type Props = { text: TranslationsType };
export const Text: FC<Props> = ({ text }) => {
  const { lang: lang, toggleLanguage, isHeb } = useLanguage();
  const showText = lang === "en" ? text.en : text.he;
  /* ----- Return -----*/
  return <span dir={isHeb ? "rtl" : "ltr"}>{showText}</span>;
};
