# output-helpers

## Usage

`import oh from output-helpers`

Optionally use `oh.config(config_object)` to configure default languages and setup translation dictionaries.

# Functions

## oh.addDictionary
`oh.addDictionary(dictionary): undefined`

Add additional dictionaries for the *translate* function to use for lookups.

> See [Dictionary definition](#dictionary-definition).

## oh.dateToMoment
`oh.dateToMoment(date): Moment`

Converts a javascript date to a Moment.

> `date <Date, required>` - The input javascript date to be converted.

## oh.format
`oh.format(value): string`

> `value <number, required>` - The value to be formatted.

## oh.formatDateAsString
`oh.formatDateAsString(date, output_format, input_format): string`

Formats a given date according to output_format. Formats are specified according to Moment standard.

> `date <Date|string|Moment, required>` - The date to be formatted.

> `output_format <string, default YYYY-MM-DD HH:mm>` - The output format.

> `input_format <string, optional>` - If input date is a string optionally a input format can be specified for Moments parser.

## oh.formatDateAsTimeString
`oh.formatDateAsTimeString(date, input_format): string`

Formats given date as *HH:mm*. Equivalent to *oh.formatDateAsString(date, "HH:mm")*.

> `date <Date|string|Moment, required>` - Date to be formatted.

> `input_format <string, optional>` - If input date is a string optionally a input format can be specified for Moments parser.

## oh.formatSecondsToMS
`oh.formatSecondsToMS(value, always_include, padding, colon): string`

Converts a value (seconds) to a [m]m[s]s format: 1m2s.

> `value <integer, required>` - Number of seconds to be formatted.

> `always_include <"none"|"minutes"|"seconds"|"both", default "none">` - Optional specifyer for which parts to always include.  
> *none* - If not enough for a minute only returns seconds, if an exact minute the seconds will not be included.  
> *minutes* - If value not above 60 "0m" will be prepended to the seconds.  
> *seconds* - If value is exact minute "0s" will be appended after the minute.  
> *both* - Will always prepend and append "0m" and "0s" respectively as needed.

> `padding <bool, default false>` - Toggles if values should be padded so 4 becomes 04. Both minutes and seconds will be padded. Defaults to *false*.

> `colon <bool, default false>` - Changes the output format to be "mm:ss" instead of "[m]m[s]s". Will always include both minutes and seconds, always padding. Defaults to false.

## oh.getCurrentConfig
`oh.getCurrentConfig(): OutputHelpers config object`

## oh.getDateLocale
`oh.getDateLocale(language): Moment locale object`

Returns a Moment locale object for the given language. This is used with Moments *moment.defineLocale* function to add locale support for calendars etc.  
**NOTE:** OH will automatically add all available locales to moment! You only need to use this if you are running a separate moment instance or to change the definition and re-define the locale with moment manually.

> `language <"sv-SE"|"en-US", defaults to configured language>` - The language for which to return the locale specifications.

## oh.getFallbackLang
`oh.getFallbackLang(): "sv-SE" | "en-US"`

Returns the currently configured fallback language used by *oh.translate* when primary language is not found.

## oh.getLang
`oh.getLang(): "sv-SE" | "en-US"`

Returns the currently configured language used by *oh.translate*.

## oh.roundDownTo
`oh.roundDownTo(value, power): number`

Returns value rounded down to the power.

> `value <number, required>` - The value to be rounded.

> `power <number, default 0>` - The power to round to.

Ex: *roundDownTo(1345.341, 1)* > 1340

## oh.roundTo
`oh.roundTo(value, ???): number`

Returns value rounded to the power.

> `value <number, required>` - The value to be rounded.

> `power <number, default 0>` - The power to round to.

Ex: *roundTo(1345.341, 1)* > 1350

## oh.roundUpTo
`oh.roundUpTo(value, ???): number`

Returns value rounded to the power.

> `value <number, required>` - The value to be rounded.

> `power <number, default 0>` - The power to round to.

Ex: *roundUpTo(1345.341, 2)* > 1400

## oh.setConfig
`oh.setConfig(config_options): undefined`

## oh.translate
`oh.translate(key, capitalize, language, empty_on_error, dictionary): string`

Looks up key in dictionary for language and returns specified value.  
Will use the configured language and dictionaries unless specified.

>`key <string, required>` - The key to look for in dictionary.

>`capitalize <bool, default true` - Capitalizes the returned value.

>`language <"sv-SE"|"en-US", default to configured language>` - Language to check for in dictionary.

>`empty_on_error <true|false, default false>` - When `true` an empty string will be returned when the requested key or language is not found. When `false` the key is returned.  
>*NOTE: Does not affect error logging.*

>`dictionary <object, default to configured and added dictionaries>` - **See the `oh.addDictionary()` docs.**

# Dictionary definition

