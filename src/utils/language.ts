import {SearchParams} from 'next/dist/server/request/search-params';
import {xTrans} from '~/translations';

export async function serverDetLang(searchParams?: SearchParams) {
  const sp = await searchParams;
  const lang = sp?.lang === 'en' ? 'en' : 'he';
  const isHeb = lang === 'he';
  const t = xTrans[lang];
  const langParam = lang === 'he' ? '' : '?lang=en';
  return {lang, t, isHeb, langParam};
}