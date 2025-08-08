import { messages } from '@/configs/i18n';

export const useI18n = () => {
  const config = useRuntimeConfig();
  const locale = useState('locale', () => config.public.defaultLocale || 'pl');
  const t = (key) => {
    return key.split('.').reduce((o, i) => (o ? o[i] : undefined), messages[locale.value]) || key;
  };
  return { t, locale };
};