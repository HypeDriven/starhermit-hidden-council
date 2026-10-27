// Localization: the browser build's tables (src/strings.js, nine locales keyed
// by the US-English text) through src/i18n.js, in the interface language the
// runtime reports (preferences().language: the player's choice in Options ›
// Language, else the device's), mapped to the nearest shipped locale. The
// browser build's own Language selector, its ?lang= override and the
// account's preferred-language lookup are the runtime's now. A change shows
// on the next frame (the UI is immediate mode).
import { onPreferencesChange, preferences } from "starhermit:engine";
import * as ui from "starhermit:ui";
import { T as tr, setLocale } from "../src/i18n.js";

/** Translates an English source string ({name} placeholders from vars). */
export function T(key: string, vars?: Record<string, unknown>): string { return tr(key, vars); }

function apply(tag: string): void { ui.setLanguage(setLocale(tag)); }
/** Wires the language (from onStart). */
export function initLanguage(): void {
  apply(preferences().language);
  onPreferencesChange((p) => apply(p.language));
}
