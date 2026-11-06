// Localization: the engine's string tables (assets/strings.json, generated from
// the browser build's tables: nine locales keyed by the US-English text) in the
// interface language the runtime reports (the player's choice in Options ›
// Language, else the device's). The browser build's own Language selector, its
// ?lang= override and the account's preferred-language lookup are the runtime's
// now. A change shows on the next frame (the UI is immediate mode). The account
// lines are the engine's `starhermit.*` keys.
import { strings } from "starhermit:engine";
import * as ui from "starhermit:ui";
import { T as tr, bindStrings } from "../src/i18n.js";

strings.load("assets/strings.json");
strings.defaultLocale = "en-US";
ui.setLanguage(strings.locale);
strings.onChange((locale) => ui.setLanguage(locale));
bindStrings(strings);

/** Translates an English source string ({name} placeholders from vars). */
export function T(key: string, vars?: Record<string, unknown>): string { return tr(key, vars); }
/** An account or leaderboard line (the engine's `starhermit.*` strings). */
export function sh(key: "signIn" | "invite" | "inviteCopied" | "inviteLink" | "signedOut" | "leaderboardPosting" | "leaderboardRank" | "leaderboardPosted" | "leaderboardNotPosted", vars?: Record<string, unknown>): string {
  return strings.t(`starhermit.${key}`, vars);
}
