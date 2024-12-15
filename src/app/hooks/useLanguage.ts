import {SearchParams} from 'next/dist/server/request/search-params';
import {useSearchParams} from 'next/navigation';
import {xTrans} from '~/translations';

export function useLanguage() {
  const searchParams = useSearchParams();
  const lang = searchParams.get('lang') || 'en';
  const isHeb = lang === 'he';
  const t = isHeb ? xTrans.he : xTrans.en;
  return {lang, isHeb, t};
}
