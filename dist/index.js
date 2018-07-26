'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_moment2.default.defineLocale('sv-SE', getDateLocale('sv-SE'));
_moment2.default.defineLocale('en-US', getDateLocale('en-US'));
_moment2.default.locale('en-US');
var translations = {};
var default_config = {
    date_locale: null,
    dictionaries: [],
    extend_with: null,
    fallback_language: 'en-US',
    lang: 'en-US'
};
var config = Object.assign({}, default_config);
var supported_languages = ['sv-SE', 'en-US'];
//////////////////
//STRINGS
function translate(str) {
    var capitalize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    var language = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    var empty_on_error = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    var dictionary = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;

    // const lang_in_jwt = (window.sso && window.sso.isLoggedIn()) ? window.sso.getJWT().getClaim("lang") : config.fallback_language;
    var lang = language || config.lang;
    dictionary = dictionary || translations;
    if (!dictionary) {
        console.error("Dictionary not defined.");
        return str;
    }
    if (!str || str.length === 0) {
        console.error("Tried to translate undefined string.");
        return "";
    }
    var translation = doTranslationCheck(str, dictionary, lang, empty_on_error);
    if (capitalize === true) {
        return capitalizeString(translation);
    }
    return translation;
}
function doTranslationCheck(key, dictionary, lang) {
    var empty_on_error = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

    if (dictionary.hasOwnProperty(lang) === false) {
        console.warn("Translation for language '" + lang + "' not supported, defaulting to: " + config.fallback_language);
        if (dictionary.hasOwnProperty(config.fallback_language) === false) {
            console.error("Fallback language '" + config.fallback_language + "' not defined in translation library!");
            if (empty_on_error) {
                return "";
            }
            return key + "";
        }
        lang = config.fallback_language;
    }
    var translation = dictionary[lang][key];
    if (!translation) {
        if (lang === config.fallback_language) {
            console.error("No translation found for '" + key + "' for '" + lang + "' or fallback language.");
            if (empty_on_error) {
                return "";
            }
            return key + "";
        }
        var dict = dictionary[config.fallback_language];
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
function capitalizeString(str) {
    var force_lower = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    if (typeof str !== "string") {
        console.warn("Capitalize err: input not a string.");
        return "";
    }
    if (str.length < 1) {
        return "";
    }
    if (force_lower) {
        return str.charAt(0).toUpperCase() + str.substring(1).toLowerCase();
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
}
///////////////
//DATE and TIME
function formatDateAsString(d) {
    var output_format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "YYYY-MM-DD HH:mm";
    var input_format = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    if (_moment2.default.isMoment(d)) {
        return d.format(output_format);
    }
    if (typeof d === "string") {
        if (input_format) {
            d = (0, _moment2.default)(d, input_format);
        } else {
            d = (0, _moment2.default)(d);
        }
    } else if (typeof d.getMonth === 'function') {
        d = (0, _moment2.default)(d);
    } else {
        console.error("Cannot formatDateAsString; unknown format of input. moments, strings and dates are supported. Returning input.");
        return d + ""; //Force string.
    }
    return d.format(output_format);
}
function formatDateAsTimeString(d) {
    var input_format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    return formatDateAsString(d, "HH:mm", input_format);
}
function dateToMoment(d) {
    return (0, _moment2.default)(d);
}
function getDateLocale() {
    var language = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    // const lang_in_jwt = (window.sso && window.sso.isLoggedIn()) ? window.sso.getJWT().getClaim("lang") : fallback_language;
    var lang = language || config.lang;
    var date_locales = {
        "sv-SE": {
            months: ["Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli", "Augusti", "September", "Oktober", "November", "December"],
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
            months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
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
function formatSecondsToMS(value) {
    var alwaysInclude = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "none";
    var padding = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var colon = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

    //Function to convert a value (seconds) to a [m]m[s]s format: 1m2s.
    //alwaysInclude can be:
    // "none" - if not enough for a minute only returns seconds, if an exact minute the seconds will not be included.
    // "minutes" - if value not above 60 "0m" will be prepended to the seconds.
    // "seconds" - if value is exact minute "0s" will be appended after the minute.
    // "both" - Will always prepend and append "0m" and "0s" respectively as needed.
    //padding <bool> toggles if values should be padded so 4 becomes 04. Both minutes and seconds will be padded.
    //colon <bool> changes the format to be mm:ss instead of "mmMssS". Will always include both minutes and seconds, always padding.
    var minutes = value > 0 ? Math.floor(value / 60) : Math.ceil(value / 60);
    var seconds = value % 60;
    var m_str = "";
    var s_str = "";
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
function roundTo(input) {
    var round_exp = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    if (round_exp === 0) {
        return Math.round(input);
    }
    var stringified = [""];
    stringified = input.toString().split('e');
    var round = Math.round(+(stringified[0] + 'e' + (stringified[1] ? +stringified[1] - round_exp : -round_exp)));
    stringified = round.toString().split('e');
    return +(stringified[0] + 'e' + (stringified[1] ? +stringified[1] + round_exp : round_exp));
}
function roundUpTo(input) {
    var ceil_exp = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    if (ceil_exp === 0) {
        return Math.ceil(input);
    }
    var stringified = [""];
    stringified = input.toString().split('e');
    var ceil = Math.ceil(+(stringified[0] + 'e' + (stringified[1] ? +stringified[1] - ceil_exp : -ceil_exp)));
    stringified = ceil.toString().split('e');
    return +(stringified[0] + 'e' + (stringified[1] ? +stringified[1] + ceil_exp : ceil_exp));
}
function roundDownTo(input) {
    var floor_exp = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    if (floor_exp === 0) {
        return Math.floor(input);
    }
    var stringified = [""];
    stringified = input.toString().split('e');
    var floor = Math.floor(+(stringified[0] + 'e' + (stringified[1] ? +stringified[1] - floor_exp : -floor_exp)));
    stringified = floor.toString().split('e');
    return +(stringified[0] + 'e' + (stringified[1] ? +stringified[1] + floor_exp : floor_exp));
}
function format(value, options) {
    var str = void 0;
    var str_arr = void 0;
    var round = typeof options.round === "number" || false;
    var round_exp = options.round;
    var ceil = typeof options.ceil === "number" || false;
    var ceil_exp = options.ceil;
    var floor = typeof options.floor === "number" || false;
    var floor_exp = options.floor;
    var separate_padding = typeof options.integer_padding === "number" || typeof options.decimal_padding === "number" || false;
    var i_pad_length = options.integer_padding;
    var d_pad_length = options.decimal_padding;
    var padding = typeof options.padding === "number" || false;
    var pad_length = options.padding;
    var trunc = options.trunc === true || false;
    var grouping = options.grouping === true || false;
    var is_negative = value < 0;
    if (typeof value !== "number") {
        console.warn("Tried to format a value but input was typeof: ", typeof value === 'undefined' ? 'undefined' : _typeof(value));
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
        if (is_negative) {
            //Remove minus sign if negative.
            str = str.substr(1);
        }
        var separated = str.split('.'); //We only want to group the value before the decimal point.
        str_arr = separated[0].split('');
        str = "";
        while (str_arr.length > 3) {
            str = " " + str_arr[str_arr.length - 3] + str_arr[str_arr.length - 2] + str_arr[str_arr.length - 1] + str;
            str_arr = str_arr.slice(0, str_arr.length - 3);
        }
        var joined_arr = str_arr.join("");
        str = joined_arr.length > 0 ? joined_arr + str : str;
        str += separated.length > 1 ? "." + separated[1] : "";
        if (is_negative) {
            //Add minus sign if negative.
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
function updateTranslations(dictionary_arr) {
    var warn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    var overwrite = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

    translations = {};
    dictionary_arr.forEach(function (dict, dict_index) {
        var prefix = dict.hasOwnProperty('prefix') ? dict.prefix : "";
        var keys = Object.keys(dict);
        keys.forEach(function (potential_lang) {
            if (supported_languages.includes(potential_lang) === false) {
                return;
            }
            var lang = potential_lang;
            var lang_in_dict = dict[lang];
            if (!lang_in_dict) {
                return;
            }
            var keys_for_lang = Object.keys(lang_in_dict);
            if (translations.hasOwnProperty(lang) === false) {
                var new_lang_translations = {};
                keys_for_lang.forEach(function (key) {
                    new_lang_translations[prefix + key] = lang_in_dict[key];
                });
                translations[lang] = new_lang_translations;
            } else {
                if (warn || !overwrite) {
                    var updated_lang_translations = Object.assign({}, translations[lang]);
                    keys_for_lang.forEach(function (translation_key) {
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
                    var _new_lang_translations = {};
                    keys_for_lang.forEach(function (key) {
                        _new_lang_translations[prefix + key] = lang_in_dict[key];
                    });
                    translations[lang] = Object.assign({}, translations[lang], _new_lang_translations);
                }
            }
        });
    });
}
function addDictionary(dictionary) {
    config.dictionaries.push(dictionary);
    updateTranslations(config.dictionaries);
}
var funcs = {
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
    translate: translate
};
var exported_funcs = Object.assign({}, funcs);
function setConfig(config_opts) {
    var invalid = false;
    Object.keys(config_opts).forEach(function (key) {
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
        _moment2.default.locale(config.date_locale);
    } else {
        _moment2.default.locale(config.lang);
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
exports.default = exported_funcs;
//# sourceMappingURL=index.js.map
