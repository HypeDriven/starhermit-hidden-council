'use strict';
// Localized strings for the Graphics settings section (the rest of the game is
// English-only). Locale comes from navigator.language: exact tag, then a
// regional fallback for the language, then en-US.

const en = {
  graphics: 'Graphics', quality: 'Quality', auto: 'Auto (detected: {tier})',
  presets: { low: 'Low', balanced: 'Balanced', high: 'High', ultra: 'Ultra' },
  renderScale: 'Render scale', fromPreset: 'From preset ({tier})',
  cats: { shadows: 'Shadows', ao: 'Ambient occlusion', bloom: 'Bloom', grade: 'Color grade', antialias: 'Anti-aliasing', reflections: 'Reflections', particles: 'Dust motes', detail: 'Surface detail' },
  tiers: { off: 'Off', on: 'On', low: 'Low', medium: 'Medium', high: 'High', fxaa: 'FXAA', smaa: 'SMAA', msaa: 'MSAA', plain: 'Plain', detailed: 'Detailed' },
  adaptive: 'Adaptive resolution', showFps: 'Show frame rate',
  postFailed: 'Post-processing is unavailable on this device; the station renders without it.',
  sum: { noShadows: 'no shadows', shadows: '{n}² shadows', ao: 'ambient occlusion', aoFull: 'full ambient occlusion', bloom: 'bloom', reflections: 'reflections', motes: '{n} motes', noAa: 'no anti-aliasing', px: '{w}×{h} px' },
};

const STRINGS = {
  'en-US': en,
  'en-GB': Object.assign({}, en, { cats: Object.assign({}, en.cats, { grade: 'Colour grade' }) }),
  'es-419': {
    graphics: 'Gráficos', quality: 'Calidad', auto: 'Automático (detectado: {tier})',
    presets: { low: 'Baja', balanced: 'Equilibrada', high: 'Alta', ultra: 'Ultra' },
    renderScale: 'Escala de renderizado', fromPreset: 'Según el ajuste ({tier})',
    cats: { shadows: 'Sombras', ao: 'Oclusión ambiental', bloom: 'Resplandor', grade: 'Corrección de color', antialias: 'Antialiasing', reflections: 'Reflejos', particles: 'Partículas de polvo', detail: 'Detalle de superficies' },
    tiers: { off: 'Desactivado', on: 'Activado', low: 'Bajo', medium: 'Medio', high: 'Alto', fxaa: 'FXAA', smaa: 'SMAA', msaa: 'MSAA', plain: 'Simple', detailed: 'Detallado' },
    adaptive: 'Resolución adaptable', showFps: 'Mostrar fotogramas por segundo',
    postFailed: 'El posprocesado no está disponible en este dispositivo; la estación se muestra sin él.',
    sum: { noShadows: 'sin sombras', shadows: 'sombras {n}²', ao: 'oclusión ambiental', aoFull: 'oclusión ambiental completa', bloom: 'resplandor', reflections: 'reflejos', motes: '{n} partículas', noAa: 'sin antialiasing', px: '{w}×{h} px' },
  },
  'es-ES': null, // filled below from es-419 with Spain-specific terms
  'de-DE': {
    graphics: 'Grafik', quality: 'Qualität', auto: 'Automatisch (erkannt: {tier})',
    presets: { low: 'Niedrig', balanced: 'Ausgewogen', high: 'Hoch', ultra: 'Ultra' },
    renderScale: 'Renderskalierung', fromPreset: 'Laut Voreinstellung ({tier})',
    cats: { shadows: 'Schatten', ao: 'Umgebungsverdeckung', bloom: 'Leuchteffekt', grade: 'Farbkorrektur', antialias: 'Kantenglättung', reflections: 'Spiegelungen', particles: 'Staubpartikel', detail: 'Oberflächendetails' },
    tiers: { off: 'Aus', on: 'An', low: 'Niedrig', medium: 'Mittel', high: 'Hoch', fxaa: 'FXAA', smaa: 'SMAA', msaa: 'MSAA', plain: 'Schlicht', detailed: 'Detailliert' },
    adaptive: 'Adaptive Auflösung', showFps: 'Bildrate anzeigen',
    postFailed: 'Nachbearbeitung ist auf diesem Gerät nicht verfügbar; die Station wird ohne sie dargestellt.',
    sum: { noShadows: 'keine Schatten', shadows: '{n}²-Schatten', ao: 'Umgebungsverdeckung', aoFull: 'volle Umgebungsverdeckung', bloom: 'Leuchteffekt', reflections: 'Spiegelungen', motes: '{n} Staubpartikel', noAa: 'keine Kantenglättung', px: '{w}×{h} px' },
  },
  'fr-FR': {
    graphics: 'Graphismes', quality: 'Qualité', auto: 'Auto (détecté : {tier})',
    presets: { low: 'Basse', balanced: 'Équilibrée', high: 'Haute', ultra: 'Ultra' },
    renderScale: 'Échelle de rendu', fromPreset: 'Selon le préréglage ({tier})',
    cats: { shadows: 'Ombres', ao: 'Occlusion ambiante', bloom: 'Halo lumineux', grade: 'Étalonnage des couleurs', antialias: 'Anticrénelage', reflections: 'Reflets', particles: 'Poussières', detail: 'Détail des surfaces' },
    tiers: { off: 'Désactivé', on: 'Activé', low: 'Bas', medium: 'Moyen', high: 'Élevé', fxaa: 'FXAA', smaa: 'SMAA', msaa: 'MSAA', plain: 'Simple', detailed: 'Détaillé' },
    adaptive: 'Résolution adaptative', showFps: 'Afficher les images par seconde',
    postFailed: 'Le post-traitement est indisponible sur cet appareil ; la station est affichée sans lui.',
    sum: { noShadows: 'sans ombres', shadows: 'ombres {n}²', ao: 'occlusion ambiante', aoFull: 'occlusion ambiante complète', bloom: 'halo', reflections: 'reflets', motes: '{n} poussières', noAa: 'sans anticrénelage', px: '{w}×{h} px' },
  },
  'fr-CA': null, // filled below from fr-FR
  'pt-BR': {
    graphics: 'Gráficos', quality: 'Qualidade', auto: 'Automático (detectado: {tier})',
    presets: { low: 'Baixa', balanced: 'Equilibrada', high: 'Alta', ultra: 'Ultra' },
    renderScale: 'Escala de renderização', fromPreset: 'Conforme a predefinição ({tier})',
    cats: { shadows: 'Sombras', ao: 'Oclusão de ambiente', bloom: 'Brilho', grade: 'Correção de cor', antialias: 'Antisserrilhamento', reflections: 'Reflexos', particles: 'Partículas de poeira', detail: 'Detalhe das superfícies' },
    tiers: { off: 'Desligado', on: 'Ligado', low: 'Baixo', medium: 'Médio', high: 'Alto', fxaa: 'FXAA', smaa: 'SMAA', msaa: 'MSAA', plain: 'Simples', detailed: 'Detalhado' },
    adaptive: 'Resolução adaptável', showFps: 'Mostrar taxa de quadros',
    postFailed: 'O pós-processamento não está disponível neste dispositivo; a estação é exibida sem ele.',
    sum: { noShadows: 'sem sombras', shadows: 'sombras {n}²', ao: 'oclusão de ambiente', aoFull: 'oclusão de ambiente completa', bloom: 'brilho', reflections: 'reflexos', motes: '{n} partículas', noAa: 'sem antisserrilhamento', px: '{w}×{h} px' },
  },
  'it-IT': {
    graphics: 'Grafica', quality: 'Qualità', auto: 'Automatica (rilevata: {tier})',
    presets: { low: 'Bassa', balanced: 'Bilanciata', high: 'Alta', ultra: 'Ultra' },
    renderScale: 'Scala di rendering', fromPreset: 'Da preimpostazione ({tier})',
    cats: { shadows: 'Ombre', ao: 'Occlusione ambientale', bloom: 'Bagliore', grade: 'Correzione colore', antialias: 'Antialiasing', reflections: 'Riflessi', particles: 'Pulviscolo', detail: 'Dettaglio superfici' },
    tiers: { off: 'No', on: 'Sì', low: 'Basso', medium: 'Medio', high: 'Alto', fxaa: 'FXAA', smaa: 'SMAA', msaa: 'MSAA', plain: 'Semplice', detailed: 'Dettagliato' },
    adaptive: 'Risoluzione adattiva', showFps: 'Mostra frequenza fotogrammi',
    postFailed: 'La post-elaborazione non è disponibile su questo dispositivo; la stazione viene mostrata senza.',
    sum: { noShadows: 'nessuna ombra', shadows: 'ombre {n}²', ao: 'occlusione ambientale', aoFull: 'occlusione ambientale completa', bloom: 'bagliore', reflections: 'riflessi', motes: '{n} particelle', noAa: 'nessun antialiasing', px: '{w}×{h} px' },
  },
};
STRINGS['es-ES'] = Object.assign({}, STRINGS['es-419'], {
  renderScale: 'Escala de renderizado', showFps: 'Mostrar fotogramas por segundo',
  adaptive: 'Resolución adaptativa',
  postFailed: 'El posprocesado no está disponible en este dispositivo; la estación se muestra sin él.',
});
STRINGS['fr-CA'] = Object.assign({}, STRINGS['fr-FR'], { showFps: 'Afficher la fréquence d’images' });

const FALLBACK = { en: 'en-US', es: 'es-419', de: 'de-DE', fr: 'fr-FR', pt: 'pt-BR', it: 'it-IT' };

export const GFX_LOCALES = Object.keys(STRINGS);

export function gfxLocale(lang) {
  const l = String(lang || (typeof navigator !== 'undefined' ? navigator.language : '') || 'en-US');
  const exact = GFX_LOCALES.find((k) => k.toLowerCase() === l.toLowerCase());
  if (exact) return exact;
  const base = l.split(/[-_]/)[0].toLowerCase();
  if (base === 'es' && /-(ES)$/i.test(l)) return 'es-ES';
  return FALLBACK[base] || 'en-US';
}

export function gfxStrings(lang) { return STRINGS[gfxLocale(lang)]; }

export function fmt(s, vars) { return String(s).replace(/\{(\w+)\}/g, (_, k) => (vars && k in vars ? vars[k] : '')); }
