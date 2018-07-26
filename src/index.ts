import moment, { Moment } from 'moment';



interface StrStrObject {
    [key: string]: string;
}
type LangId = "sv-SE"|"en-US";
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
        [key: string]: any
    };
    fallback_language?: LangId;
    lang?: LangId;
}
interface Config {
    [key: string]: any;
    date_locale: LangId|null;
    dictionaries: Dictionary[];
    extend_with: {
        [key: string]: any
    }|null;
    fallback_language: LangId;
    lang: LangId;
}




moment.defineLocale('sv-SE', getDateLocale('sv-SE'));
moment.defineLocale('en-US', getDateLocale('en-US'));
moment.locale('en-US');



let translations: Dictionary = {};

let default_config: Config = {
    date_locale: null,
    dictionaries: [],
    extend_with: null,
    fallback_language: 'en-US',
    lang: 'en-US'
};
let config = Object.assign({}, default_config);
let supported_languages = ['sv-SE', 'en-US'];

//////////////////
//STRINGS

function translate(str: string, capitalize: boolean = true, language: LangId|null = null, empty_on_error: boolean = false, dictionary: Dictionary|null = null) {
    // const lang_in_jwt = (window.sso && window.sso.isLoggedIn()) ? window.sso.getJWT().getClaim("lang") : config.fallback_language;
    let lang = language || config.lang;
    dictionary = dictionary || translations;

    if (!dictionary) {
        console.error("Dictionary not defined.");
        return str;
    }

    if (!str || str.length === 0) {
        console.error("Tried to translate undefined string.");
        return "";
    }

    let translation = doTranslationCheck(str, dictionary, lang, empty_on_error);

    if (capitalize === true) {
        return capitalizeString(translation);
    }
    return translation;
}

function doTranslationCheck(key: string, dictionary: Dictionary, lang: string, empty_on_error: boolean = false) {
    if (dictionary.hasOwnProperty(lang) === false) {
        console.warn("Translation for language '" + lang +"' not supported, defaulting to: " + config.fallback_language);
        if (dictionary.hasOwnProperty(config.fallback_language) === false) {
            console.error("Fallback language '" + config.fallback_language + "' not defined in translation library!");
            if (empty_on_error) {
                return "";
            }
            return key + "";
        }
        lang = config.fallback_language;
    }

    let translation = dictionary[lang][key];
    if (!translation) {
        if (lang === config.fallback_language) {
            console.error("No translation found for '" + key + "' for '" + lang + "' or fallback language.");
            if (empty_on_error) {
                return "";
            }
            return key + "";
        }
        const dict = dictionary[config.fallback_language];
        if (dict) {
            translation = dict[key];
        } else {
            translation = undefined;
        }
        
        if (!translation) {
            console.error("No translation found for '" + key + "' for '" + lang + "' or fallback language.");
            if (empty_on_error) {
                return "";
            }
            return key + "";
        }

        console.warn("No translation found for '" + key + "' for '" + lang + "'. Returning fallback language.");
    }

    return translation;
}

function capitalizeString(str: string, force_lower:boolean = false) {
    if (typeof str !== "string") { console.warn("Capitalize err: input not a string."); return ""; }
    if (str.length < 1) { return ""; }

    if (force_lower) {
        return str.charAt(0).toUpperCase() + str.substring(1).toLowerCase();
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
}





///////////////
//DATE and TIME

function formatDateAsString(d: Date|string|Moment, output_format = "YYYY-MM-DD HH:mm", input_format: string|null = null) {
    if (moment.isMoment(d)) {
        return d.format(output_format);
    }

    if (typeof d === "string") {
        if (input_format) {
            d = moment(d, input_format);
        } else {
            d = moment(d);
        }
    } else if (typeof d.getMonth === 'function') {
        d = moment(d);
    } else {
        console.error("Cannot formatDateAsString; unknown format of input. moments, strings and dates are supported. Returning input.");
        return d + ""; //Force string.
    }
    return d.format(output_format);
}

function formatDateAsTimeString(d: Date|string|Moment, input_format = null) {
    return formatDateAsString(d, "HH:mm", input_format);
}

function dateToMoment(d: Date) {
    return moment(d);
}

function getDateLocale(language: LangId|null = null) {
    // const lang_in_jwt = (window.sso && window.sso.isLoggedIn()) ? window.sso.getJWT().getClaim("lang") : fallback_language;
    let lang = language || config.lang;

    const date_locales: {
        [key: string]: moment.LocaleSpecification
    } = {
        "sv-SE": {
            months: [
                "Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli",
                "Augusti", "September", "Oktober", "November", "December"
            ],
            monthsShort: ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"],
            weekdays: ["Söndag", "Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Lördag"],
            weekdaysShort: ["Sön", "Mån", "Tis", "Ons", "Tor", "Fre", "Lör"],
            weekdaysMin: ["Sö", "Må", "Ti", "On", "To", "Fr", "Lö"],
            week: {
                dow: 1,
                doy: 4
            }
        },
        "en-US": {
            months: [
                "January", "February", "March", "April", "May", "June", "July",
                "August", "September", "October", "November", "December"
            ],
            monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            weekdays: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            weekdaysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            weekdaysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
            week: {
                dow: 1,
                doy: 4
            }
        }
    };

    if (date_locales.hasOwnProperty(lang)) {
        return date_locales[lang];
    } else if (date_locales.hasOwnProperty(config.fallback_language)) {
        console.error("Missing date locales for lang '" + lang + "', returning fallback language '" + config.fallback_language + "'.");
        return date_locales[config.fallback_language];
    }
    throw new Error("Missing date locales for lang '" + lang + "' and fallback language '" + config.fallback_language + "'. Returning null.");
}

function formatSecondsToMS(value: number, alwaysInclude = "none", padding = false, colon = false) {
    //Function to convert a value (seconds) to a [m]m[s]s format: 1m2s.
    //alwaysInclude can be:
    // "none" - if not enough for a minute only returns seconds, if an exact minute the seconds will not be included.
    // "minutes" - if value not above 60 "0m" will be prepended to the seconds.
    // "seconds" - if value is exact minute "0s" will be appended after the minute.
    // "both" - Will always prepend and append "0m" and "0s" respectively as needed.
    //padding <bool> toggles if values should be padded so 4 becomes 04. Both minutes and seconds will be padded.
    //colon <bool> changes the format to be mm:ss instead of "mmMssS". Will always include both minutes and seconds, always padding.

    const minutes = (value > 0) ? Math.floor(value / 60) : Math.ceil(value / 60);
    const seconds = value % 60;

    let m_str = "";
    let s_str = "";

    if (padding || colon) {
        m_str = format(minutes, { padding: 2 });
        s_str = format(seconds, { padding: 2 });
    } else {
        m_str = minutes + ""; //Ensure string.
        s_str = seconds + ""; //Ensure string.
    }

    if (colon) {
        return m_str + ":" + s_str;
    }

    if (alwaysInclude === "none") {
        if (minutes !== 0 && seconds !== 0) {
            return m_str + "m" + s_str + "s";
        } else if (minutes === 0) {
            return s_str + "s";
        }
        return m_str + "m";
    } else if (alwaysInclude === "minutes") {
        if (seconds !== 0) {
            return m_str + "m" + s_str + "s";
        }
        return m_str + "m";
    } else if (alwaysInclude === "seconds") {
        if (minutes !== 0) {
            return m_str + "m" + s_str + "s";
        }
        return s_str + "s";
    }
    return m_str + "m" + s_str + "s";
}






////////////////
//Numeric

function roundTo(input: number, round_exp: number = 0) {
    if (round_exp === 0) { return Math.round(input); }
    let stringified: string[] = [""];
    stringified = input.toString().split('e');
    let round = Math.round(+(stringified[0] + 'e' + (stringified[1] ? (+stringified[1] - round_exp) : -round_exp)));
    stringified = round.toString().split('e');
    return +(stringified[0] + 'e' + (stringified[1] ? (+stringified[1] + round_exp) : round_exp));
}

function roundUpTo(input: number, ceil_exp: number = 0) {
    if (ceil_exp === 0) { return Math.ceil(input); }
    let stringified: string[] = [""];
    stringified = input.toString().split('e');
    let ceil = Math.ceil(+(stringified[0] + 'e' + (stringified[1] ? (+stringified[1] - ceil_exp) : -ceil_exp)));
    stringified = ceil.toString().split('e');
    return +(stringified[0] + 'e' + (stringified[1] ? (+stringified[1] + ceil_exp) : ceil_exp));
}

function roundDownTo(input: number, floor_exp: number = 0) {
    if (floor_exp === 0) { return Math.floor(input); }
    let stringified: string[] = [""];
    stringified = input.toString().split('e');
    let floor = Math.floor(+(stringified[0] + 'e' + (stringified[1] ? (+stringified[1] - floor_exp) : -floor_exp)));
    stringified = floor.toString().split('e');
    return +(stringified[0] + 'e' + (stringified[1] ? (+stringified[1] + floor_exp) : floor_exp));
}

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

function format(value: number, options: FormatOptions) {
    let str: string;
    let str_arr: string[];
    const round = (typeof options.round === "number") || false;
    const round_exp = options.round;
    const ceil = (typeof options.ceil === "number") || false;
    const ceil_exp = options.ceil;
    const floor = (typeof options.floor === "number") || false;
    const floor_exp = options.floor;
    const separate_padding = (typeof options.integer_padding === "number" || typeof options.decimal_padding === "number") || false;
    const i_pad_length = options.integer_padding;
    const d_pad_length = options.decimal_padding;
    const padding = (typeof options.padding === "number") || false;
    const pad_length = options.padding;
    const trunc = (options.trunc === true) || false;
    const grouping = (options.grouping === true) || false;

    const is_negative = (value < 0);

    if (typeof value !== "number") {
        console.warn("Tried to format a value but input was typeof: ", typeof value);
        return value;
    }

    if (round && !ceil && !floor) {
        value = roundTo(value, round_exp);
    }
    if (ceil && !floor) {
        value = roundUpTo(value, ceil_exp);
    }
    if (floor) {
        value = roundDownTo(value, floor_exp);
    }

    if (trunc && !round) {
        str = Math.trunc(value).toString();
    } else {
        str = value.toString();
    }

    if (grouping) {
        if (is_negative) { //Remove minus sign if negative.
            str = str.substr(1);
        }
        let separated = str.split('.'); //We only want to group the value before the decimal point.
        str_arr = separated[0].split('');
        str = "";
        while (str_arr.length > 3) {
            str = " " + str_arr[str_arr.length - 3] + str_arr[str_arr.length - 2] + str_arr[str_arr.length - 1] + str;
            str_arr = str_arr.slice(0, str_arr.length - 3);
        }
        let joined_arr = str_arr.join("");
        str = (joined_arr.length > 0) ? joined_arr + str : str;
        str += (separated.length > 1) ? "." + separated[1] : "";
        if (is_negative) { //Add minus sign if negative.
            str = "-" + str;
        }
    }

    if (separate_padding) {
        str_arr = str.split(".");
        if (i_pad_length && str_arr[0].length < i_pad_length) {
            str_arr[0] = ("000000000000000000000" + str_arr[0]).slice(-i_pad_length);
        }
        if (d_pad_length) {
            if (str_arr.length > 1 && str_arr[1].length < d_pad_length) {
                str_arr[1] = (str_arr[1] + "000000000000000000000").slice(0, d_pad_length);
                str_arr.join(".");
            } else if (str_arr.length > 1) {
                str = str_arr[0] + "." + (str_arr[1] + "00000000000000000").slice(0, d_pad_length);
            } else {
                str = str_arr[0] + "." + "00000000000000000".slice(0, d_pad_length);
            }
        }
    }
    if (padding && pad_length) {
        if (str.length < pad_length) {
            str = (str + "000000000000000000000").slice(0, pad_length);
        }
    }

    return str;
}






function updateTranslations(dictionary_arr: Dictionary[], warn = true, overwrite = true) {
    translations = {};
    dictionary_arr.forEach((dict: Dictionary, dict_index: number) => {
        let prefix = dict.hasOwnProperty('prefix') ? dict.prefix : "";
        let keys = Object.keys(dict);
        keys.forEach((potential_lang) => {
            if (supported_languages.includes(potential_lang) === false) {
                return;
            }
            let lang = potential_lang as LangId;
            const lang_in_dict = dict[lang];
            if (!lang_in_dict) { return; }
            let keys_for_lang: string[] = Object.keys(lang_in_dict);
            if (translations.hasOwnProperty(lang) === false) {
                let new_lang_translations: StrStrObject = {};
                keys_for_lang.forEach((key) => {
                    new_lang_translations[prefix + key] = lang_in_dict[key];
                });
                translations[lang] = new_lang_translations;
            } else {
                if (warn || !overwrite) {
                    let updated_lang_translations = Object.assign({}, translations[lang]);
                    
                    keys_for_lang.forEach((translation_key) => { 
                        if (updated_lang_translations.hasOwnProperty(prefix + translation_key)) {
                            if (warn) {
                                console.warn("OH: Dictionary " + dict_index + " is conflicting with existing key '" + (prefix + translation_key) + "'.");
                            }
                            if (overwrite) {
                                updated_lang_translations[prefix + translation_key] = lang_in_dict[translation_key];
                            }
                        }
                        updated_lang_translations[prefix + translation_key] = lang_in_dict[translation_key];
                    });
                    translations[lang] = updated_lang_translations;
                } else {
                    let new_lang_translations: StrStrObject = {};
                    keys_for_lang.forEach((key) => {
                        new_lang_translations[prefix + key] = lang_in_dict[key];
                    });
                    translations[lang] = Object.assign({}, translations[lang], new_lang_translations);
                }
            }
        });
    });
}

function addDictionary(dictionary: Dictionary) {
    config.dictionaries.push(dictionary);
    updateTranslations(config.dictionaries);
}

let funcs = {
    addDictionary: addDictionary,
    dateToMoment: dateToMoment,
    format: format,
    formatDateAsString: formatDateAsString,
    formatDateAsTimeString: formatDateAsTimeString,
    formatSecondsToMS: formatSecondsToMS,
    getCurrentConfig: getCurrentConfig,
    getDateLocale: getDateLocale,
    getFallbackLang: getFallbackLang,
    getLang: getLang,
    roundDownTo: roundDownTo,
    roundTo: roundTo,
    roundUpTo: roundUpTo,
    setConfig: setConfig,
    translate: translate,
};

let exported_funcs = Object.assign({}, funcs);

function setConfig(config_opts: InputConfig) {
    let invalid = false;
    Object.keys(config_opts).forEach((key) => {
        if (key === "dictionaries" && config.dictionaries.length > 0) {
            console.warn("OH: To add dictionaries after initial setConfig use 'OH.addDictionary()'");
            invalid = true;
            return;
        }
        if (config[key] !== default_config[key]) {
            console.warn("OH: setConfig has overwritten previous setting '" + key + "': " + config[key] + " => " + config_opts[key]);
        }
    });
    if (invalid) {
        console.error("OH: Unable to setConfig, invalid settings.");
        return;
    }
    config = Object.assign({}, config, config_opts);

    if (!config.lang) {
        console.warn("OH: No lang specified with setConfig, defaulting to fallback language: " + config.fallback_language + ".");
        config.lang = config.fallback_language;
    }
    if (config.date_locale) {
        moment.locale(config.date_locale);
    } else {
        moment.locale(config.lang);
    }
    if (Array.isArray(config.dictionaries) === false) {
        console.error("OH: 'dictionaries' prop required to be an array.");
        config.dictionaries = [];
        translations = {};
    }

    updateTranslations(config.dictionaries);
    exported_funcs = Object.assign(exported_funcs, config.extend_with, funcs);
}

function getCurrentConfig() {
    return Object.assign({}, config);
}

function getLang() {
    return config.lang;
}
function getFallbackLang() {
    return config.fallback_language;
}



export default exported_funcs;