import moment from 'moment';
export declare type LangId = "sv-SE" | "en-US";
export interface Dictionary {
    [key: string]: any;
    "sv-SE"?: StrStrObject;
    "en-US"?: StrStrObject;
    prefix?: string;
}
export interface TypedDictionary<T> {
    "sv-SE"?: T;
    "en-US"?: T;
    prefix?: string;
}
export interface FormatOptions {
    round?: number;
    ceil?: number;
    floor?: number;
    integer_padding?: number;
    decimal_padding?: number;
    padding?: number;
    trunc?: boolean;
    grouping?: boolean;
}
export interface OHConfig extends Partial<Config> {
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
interface StrStrObject {
    [key: string]: string;
}
declare function translateTyped<T>(key: keyof T, capitalize?: boolean, language?: LangId | null, empty_on_error?: boolean, dictionary?: Dictionary | null): any;
declare function translate(str: string, capitalize?: boolean, language?: LangId | null, empty_on_error?: boolean, dictionary?: Dictionary | null): any;
declare function formatDateAsString(d: Date | string | moment.Moment | number, output_format?: string, input_format?: string | null, utc?: boolean): string;
declare function formatDateAsTimeString(d: Date | string | moment.Moment | number, input_format?: null, utc?: boolean): string;
declare function dateToMoment(d: Date, utc?: boolean): moment.Moment;
declare function getDateLocale(language?: LangId | null): moment.LocaleSpecification;
declare function formatSecondsToMS(value: number, alwaysInclude?: string, padding?: boolean, colon?: boolean): string;
declare function roundTo(input: number, round_exp?: number): number;
declare function roundUpTo(input: number, ceil_exp?: number): number;
declare function roundDownTo(input: number, floor_exp?: number): number;
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
    translateTyped: typeof translateTyped;
};
declare function setConfig(config_opts: OHConfig): void;
declare function getCurrentConfig(): Config;
declare function getLang(): LangId;
declare function getFallbackLang(): LangId;
export default exported_funcs;
