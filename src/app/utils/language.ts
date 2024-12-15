import {SearchParams} from 'next/dist/server/request/search-params';
import {xTrans} from '~/translations';

export async function serverDetLang(searchParams?: SearchParams) {
  const sp = await searchParams;
  const lang = sp?.lang === 'he' ? 'he' : 'he';
  const isHeb = lang === 'he';
  const t = xTrans[lang];
  return {lang, t, isHeb};
}