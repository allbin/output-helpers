import moment, { Moment } from 'moment';
interface StrStrObject {
    [key: string]: string;
}
declare type LangId = "sv-SE" | "en-US";
interface Dictionary {
    [key: string]: any;
    "sv-SE"?: StrStrObject;
    "en-US"?: StrStrObject;
    prefix?: string;
}
interface FormatOptions {
    round?: number;
    ceil?: number;
    floor?: number;
    fixed?: number;
    integer_padding?: number;
    decimal_padding?: number;
    padding?: number;
    trunc?: boolean;
    grouping?: boolean;
}
interface InputConfig {
    [key: string]: any;
    date_locale?: LangId;
    dictionaries?: Dictionary[];
    extend_with?: {
        [key: string]: any;
    };
    fallback_language?: LangId;
    lang?: LangId;
}
interface Config {
    [key: string]: any;
    date_locale: LangId | null;
    dictionaries: Dictionary[];
    extend_with: {
        [key: string]: any;
    } | null;
    fallback_language: LangId;
    lang: LangId;
}
declare function translate(str: string, capitalize?: boolean, language?: LangId | null, empty_on_error?: boolean, dictionary?: Dictionary | null): any;
declare function formatDateAsString(d: Date | string | Moment, output_format?: string, input_format?: string | null): string;
declare function formatDateAsTimeString(d: Date | string | Moment, input_format?: null): string;
declare function dateToMoment(d: Date): moment.Moment;
declare function getDateLocale(language?: LangId | null): moment.LocaleSpecification;
declare function formatSecondsToMS(value: number, alwaysInclude?: string, padding?: boolean, colon?: boolean): string;
declare function roundTo(input: number, round_exp?: number): number;
declare function roundUpTo(input: number, ceil_exp?: number): number;
declare function roundDownTo(input: number, floor_exp?: number): number;
interface FormatOptions {
    round?: number;
    ceil?: number;
    floor?: number;
    integer_padding?: number;
    decimal_padding?: number;
    padding?: number;
    trunc?: boolean;
    grouping?: boolean;
}
declare function format(value: number, options: FormatOptions): string;
declare function addDictionary(dictionary: Dictionary): void;
declare let exported_funcs: {
    addDictionary: typeof addDictionary;
    dateToMoment: typeof dateToMoment;
    format: typeof format;
    formatDateAsString: typeof formatDateAsString;
    formatDateAsTimeString: typeof formatDateAsTimeString;
    formatSecondsToMS: typeof formatSecondsToMS;
    getCurrentConfig: typeof getCurrentConfig;
    getDateLocale: typeof getDateLocale;
    getFallbackLang: typeof getFallbackLang;
    getLang: typeof getLang;
    roundDownTo: typeof roundDownTo;
    roundTo: typeof roundTo;
    roundUpTo: typeof roundUpTo;
    setConfig: typeof setConfig;
    translate: typeof translate;
};
declare function setConfig(config_opts: InputConfig): void;
declare function getCurrentConfig(): Config;
declare function getLang(): LangId;
declare function getFallbackLang(): LangId;
export default exported_funcs;
//# sourceMappingURL=index.d.ts.map