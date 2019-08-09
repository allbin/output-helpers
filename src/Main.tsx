import React, { useState, CSSProperties } from 'react';
import oh from './module';
import { Dict, dictionary, other_dictionary } from './dummy_data';
oh.addDictionary(dictionary);

const lang: 'sv-SE' | 'en-USE' = 'sv-SE';
const n1 = 1345.3265;
const n2 = 0.36478;
oh.setConfig({
    lang: lang
});

const style = {
    position: "relative",
    width: "90%",
    marginTop: '20px',
    cursor: 'pointer',
    backgroundColor: 'rgb(200,200,255)',
    padding: '5px',
    minHeight: '20px'
} as CSSProperties;


const Main: React.FunctionComponent = () => {
    const [sections, setSections] = useState({
        translation: true,
        format: true,
        date: true,
    });
    const other_lang = lang === 'sv-SE' ? 'en-US' : 'sv-SE';
    const setSection = (section: string, val: boolean) => {
        setSections(Object.assign({}, sections, { [section]: val }));
    };

    return (
        <div style={{ padding: '5px', fontFamily: 'Arial' }}>
            Tests for OutputHelpers. Current language: {lang}.

            <div style={style} onClick={() => setSection('translation', !sections.translation)}>
                <i><b>oh.translateTyped&lt;Dict&gt;(key, capitalize, language, empty_on_error, dictionary): string</b></i>
                <div style={{ display: sections.translation ? 'block' : 'none' }}>
                    oh.translateTyped('test', true): {oh.translateTyped<Dict>('test', true)}<br />
                    oh.translateTyped('foo', false): {oh.translateTyped<Dict>('foo', false)}<br />
                    oh.translateTyped('never', ): {oh.translateTyped<Dict>('never')}<br />
                    oh.translateTyped('bar', undefined, '{other_lang}'): {oh.translateTyped<Dict>('test', undefined, other_lang)}<br />
                    oh.translateTyped('bar', undefined, '{other_lang}', undefined, other_dictionary): {oh.translateTyped<Dict>('test', undefined, other_lang, undefined, other_dictionary)}<br />
                </div>
            </div>

            <div style={style} onClick={() => setSection('format', !sections.format)}>
                <i><b>oh.format(value, options): string</b></i>
                <div style={{ display: sections.format ? 'block' : 'none' }}>
                    <i>n1 = {n1} | n2: {n2}</i><br />
                    'round: 0': {oh.format(n1, { round: 0 })} | {oh.format(n2, { round: 0 })}<br />
                    'round: -1, padding: 5, grouping: true': {oh.format(n1, { round: -1, padding: 5, grouping: true })} | {oh.format(n2, { round: -1, padding: 5, grouping: true })}<br />
                    'round: 2, grouping: true': {oh.format(n1, { round: 2, grouping: true })} | {oh.format(n2, { round: 2, grouping: true })}<br />
                </div>
            </div>

            <div style={style} onClick={() => setSection('date', !sections.date)}>
                <i><b>oh.formatDateAsString(date, output_format?, input_format?, utc?): string</b></i>
                <div style={{ display: sections.date ? 'block' : 'none' }}>
                    'oh.formatDateAsString(new Date())': {oh.formatDateAsString(new Date())}<br />
                    'oh.formatDateAsString(new Date(), "YYYY-MM-DD")': {oh.formatDateAsString(new Date(), "YYYY-MM-DD")}<br />
                </div>
                <i><b>oh.formatDateAsTimeString(date, output_format?, input_format?, utc?): string</b></i>
                <div style={{ display: sections.date ? 'block' : 'none' }}>
                    'oh.formatDateAsTimeString(new Date())': {oh.formatDateAsTimeString(new Date())}<br />
                </div>
                <i><b>oh.formatSecondsToMS(value, always_include?, padding?, colon?): string</b></i>
                <div style={{ display: sections.date ? 'block' : 'none' }}>
                    n1: {n1} | n2: {n2}
                    'oh.formatSecondsToMS(n)': {oh.formatSecondsToMS(n1)} | {oh.formatSecondsToMS(n2)}<br />
                </div>
            </div>

        </div>
    );
};

export default Main;
