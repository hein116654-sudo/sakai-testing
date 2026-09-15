export interface LanguageMeta {
    code: string;
    label: string;
    flag: string; // Country flag code for UI icons
    dir: 'ltr' | 'rtl'; // Text direction (Supports LTR and RTL like Arabic)
    fontClass?: string; // Optional CSS font override class
}

export const SUPPORTED_LANGUAGES: LanguageMeta[] = [
    {
        code: 'en',
        label: 'English',
        flag: 'us',
        dir: 'ltr'
    },
    {
        code: 'my',
        label: 'မြန်မာ (Myanmar)',
        flag: 'mm',
        dir: 'ltr',
        fontClass: 'lang-my'
    }
];

export const DEFAULT_LANGUAGE = 'en';
