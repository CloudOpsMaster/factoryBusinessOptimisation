import { L10nLoader, L10nConfig, LogLevel } from 'angular-l10n';
import { EN } from 'src/assets/languages/en';
import { RU } from 'src/assets/languages/ru';

export const l10nConfig: L10nConfig = {
    logger: {
      level: LogLevel.Warn
    },
    locale: {
      languages: [
        { code: 'en', dir: 'ltr' },
        { code: 'ru', dir: 'ltr' }
      ],
      defaultLocale: { languageCode: 'ru', countryCode: 'RU' },
    },
    translation: {
      translationData: [
        { languageCode: 'en', data: EN },
        { languageCode: 'ru', data: RU }
      ],
      missingValue: 'No key'
    }
  };
  
  export function initL10n(l10nLoader: L10nLoader): Function {
    return () => l10nLoader.load();
  }