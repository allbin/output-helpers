import { TypedDictionary } from './module';

type DictKeys = "test" | "new" | "never" | "thing" | "foo" | "bar";

export type Dict = {
    [key in DictKeys]: string;
};

export const dictionary: TypedDictionary<Dict> = {
    "sv-SE": {
        bar: 'sv bar',
        foo: 'sv foo',
        new: 'ny',
        never: 'aldrig',
        test: 'sv test',
        thing: 'sak'
    },
    "en-US": {
        bar: 'en bar',
        foo: 'en foo',
        new: 'new',
        never: 'never',
        test: 'en test',
        thing: 'thing'
    }
};

type OtherDictKeys = "other_key" | "other_thing";

export type OtherDict = {
    [key in OtherDictKeys]: string
};

export const other_dictionary: TypedDictionary<OtherDict> = {
    "sv-SE": {
        other_key: 'annan nyckel',
        other_thing: 'annan sak'
    },
    "en-US": {
        other_key: 'other key',
        other_thing: 'other_thing'
    }
};
