'use strict';
// StarHermit account strings (sign-in, invite link, toasts, the leaderboard
// line) in the game's nine locales, from the browser build's src/i18n-gfx.js.
// fmt fills {name} placeholders.

import { currentLang } from './i18n.js';

const SH_STRINGS = {
  "en-US": {
    "signIn": "Sign in with StarHermit",
    "invite": "Invite a friend",
    "copied": "Invite link copied to clipboard.",
    "copyFailed": "Could not copy the invite link: {link}",
    "signedOut": "Signed out of StarHermit. Progress keeps saving on this device.",
    "lbPosting": "Posting score to the leaderboard…",
    "lbRank": "Leaderboard rank: #{rank}",
    "lbPosted": "Score posted to the leaderboard.",
    "lbNotPosted": "Score not posted to the leaderboard."
  },
  "en-GB": {
    "signIn": "Sign in with StarHermit",
    "invite": "Invite a friend",
    "copied": "Invite link copied to clipboard.",
    "copyFailed": "Could not copy the invite link: {link}",
    "signedOut": "Signed out of StarHermit. Progress keeps saving on this device.",
    "lbPosting": "Posting score to the leaderboard…",
    "lbRank": "Leaderboard rank: #{rank}",
    "lbPosted": "Score posted to the leaderboard.",
    "lbNotPosted": "Score not posted to the leaderboard."
  },
  "es-419": {
    "signIn": "Iniciar sesión con StarHermit",
    "invite": "Invitar a un amigo",
    "copied": "Enlace de invitación copiado al portapapeles.",
    "copyFailed": "No se pudo copiar el enlace de invitación: {link}",
    "signedOut": "Sesión de StarHermit cerrada. El progreso se sigue guardando en este dispositivo.",
    "lbPosting": "Enviando la puntuación a la clasificación…",
    "lbRank": "Puesto en la clasificación: #{rank}",
    "lbPosted": "Puntuación enviada a la clasificación.",
    "lbNotPosted": "La puntuación no se envió a la clasificación."
  },
  "es-ES": {
    "signIn": "Iniciar sesión con StarHermit",
    "invite": "Invitar a un amigo",
    "copied": "Enlace de invitación copiado al portapapeles.",
    "copyFailed": "No se ha podido copiar el enlace de invitación: {link}",
    "signedOut": "Se ha cerrado la sesión de StarHermit. El progreso se sigue guardando en este dispositivo.",
    "lbPosting": "Enviando la puntuación a la clasificación…",
    "lbRank": "Puesto en la clasificación: #{rank}",
    "lbPosted": "Puntuación enviada a la clasificación.",
    "lbNotPosted": "La puntuación no se envió a la clasificación."
  },
  "de-DE": {
    "signIn": "Mit StarHermit anmelden",
    "invite": "Freund einladen",
    "copied": "Einladungslink in die Zwischenablage kopiert.",
    "copyFailed": "Einladungslink konnte nicht kopiert werden: {link}",
    "signedOut": "Von StarHermit abgemeldet. Der Fortschritt wird weiter auf diesem Gerät gespeichert.",
    "lbPosting": "Punktzahl wird an die Bestenliste gesendet…",
    "lbRank": "Platz in der Bestenliste: #{rank}",
    "lbPosted": "Punktzahl an die Bestenliste gesendet.",
    "lbNotPosted": "Punktzahl wurde nicht an die Bestenliste gesendet."
  },
  "fr-FR": {
    "signIn": "Se connecter avec StarHermit",
    "invite": "Inviter un ami",
    "copied": "Lien d’invitation copié dans le presse-papiers.",
    "copyFailed": "Impossible de copier le lien d’invitation : {link}",
    "signedOut": "Déconnecté de StarHermit. La progression reste enregistrée sur cet appareil.",
    "lbPosting": "Envoi du score au classement…",
    "lbRank": "Rang au classement : #{rank}",
    "lbPosted": "Score envoyé au classement.",
    "lbNotPosted": "Score non envoyé au classement."
  },
  "fr-CA": {
    "signIn": "Se connecter avec StarHermit",
    "invite": "Inviter un ami",
    "copied": "Lien d’invitation copié dans le presse-papiers.",
    "copyFailed": "Impossible de copier le lien d’invitation : {link}",
    "signedOut": "Déconnecté de StarHermit. La progression reste enregistrée sur cet appareil.",
    "lbPosting": "Envoi du pointage au classement…",
    "lbRank": "Rang au classement : #{rank}",
    "lbPosted": "Pointage envoyé au classement.",
    "lbNotPosted": "Pointage non envoyé au classement."
  },
  "pt-BR": {
    "signIn": "Entrar com StarHermit",
    "invite": "Convidar um amigo",
    "copied": "Link de convite copiado para a área de transferência.",
    "copyFailed": "Não foi possível copiar o link de convite: {link}",
    "signedOut": "Você saiu do StarHermit. O progresso continua salvo neste dispositivo.",
    "lbPosting": "Enviando a pontuação para o ranking…",
    "lbRank": "Posição no ranking: #{rank}",
    "lbPosted": "Pontuação enviada ao ranking.",
    "lbNotPosted": "Pontuação não enviada ao ranking."
  },
  "it-IT": {
    "signIn": "Accedi con StarHermit",
    "invite": "Invita un amico",
    "copied": "Link di invito copiato negli appunti.",
    "copyFailed": "Impossibile copiare il link di invito: {link}",
    "signedOut": "Disconnesso da StarHermit. I progressi restano salvati su questo dispositivo.",
    "lbPosting": "Invio del punteggio alla classifica…",
    "lbRank": "Posizione in classifica: #{rank}",
    "lbPosted": "Punteggio inviato alla classifica.",
    "lbNotPosted": "Punteggio non inviato alla classifica."
  }
};

/** The account strings in a locale (default: the current language). */
export function shStrings(lang) { return SH_STRINGS[lang || currentLang()] || SH_STRINGS['en-US']; }

export function fmt(s, vars) { return String(s).replace(/\{(\w+)\}/g, (_, k) => (vars && k in vars ? vars[k] : '')); }
