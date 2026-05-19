
import { TRANSLATIONS } from './src/lib/translations';

const enKeys = Object.keys(TRANSLATIONS.en);
const urKeys = Object.keys(TRANSLATIONS.ur);
const msKeys = Object.keys(TRANSLATIONS.ms);

console.log('Missing in ur:', enKeys.filter(k => !urKeys.includes(k)));
console.log('Missing in ms:', enKeys.filter(k => !msKeys.includes(k)));
