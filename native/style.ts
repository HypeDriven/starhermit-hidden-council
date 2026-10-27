// The look of the menus, HUD and dialogs: the browser build's style sheet,
// rewritten class-based in tools/ui-style.css and converted once with
// `starhermit css` into assets/ui-style.json (`npm run css`), registered at
// start with the theme the runtime's own widgets (checkboxes, selects, text
// fields, dialogs, scroll bars) take. The key art behind the title card and
// the council chamber above the results are box backgrounds (with the old
// darkening gradient over the key art). High contrast is the runtime's option
// (its colours replace the theme's); the title drops its key art there, as
// the old .hc-high-contrast rule did.
import { files } from "starhermit:engine";
import * as ui from "starhermit:ui";

export function initStyles(): void {
  const css = files.readJson("assets/ui-style.json") as unknown as ui.CssStyles;
  ui.setTokens(css.tokens);
  ui.setAnimations(css.animations);
  ui.setStyles({
    ...css.styles,
    label: { text: { color: "$text" } },
    paragraph: { text: { color: "$text" } },
    heading: { text: { color: "$text" } },
    widget: { focusRing: { color: "$focus", width: 3, offset: 2 } },
    checkbox: {
      text: { color: "$text" }, minHeight: 44,
      parts: { box: { background: "$panel-2", border: { width: 1, color: "$line-2" }, radius: 4 }, mark: { background: "$accent" } },
    },
    select: {
      text: { color: "$text" },
      parts: {
        field: { background: "$panel-2", radius: 8, padding: { top: 8, end: 10, bottom: 8, start: 10 }, minHeight: 44, border: { width: 1, color: "$line-2" }, hovered: { border: { color: "$accent" } } },
        list: { background: "$panel", radius: 8, border: { width: 1, color: "$accent" } },
        option: { hovered: { background: "#262b42" }, selected: { text: { color: "$accent" } } },
      },
    },
    textField: { text: { color: "$text" }, background: "$panel-2", radius: 8, border: { width: 1, color: "$line-2" }, padding: { top: 8, end: 10, bottom: 8, start: 10 }, minHeight: 40 },
    dialog: {
      background: "$panel", radius: 14, padding: 24, border: { width: 1, color: "$line" },
      shadow: { y: 18, blur: 60, color: "#00000080" },
      parts: { backdrop: { background: "$veil" } },
    },
    scrollArea: { parts: { bar: { background: "#3a4060", radius: 4 } } },
    // The title card over the station key art, darkened (the old linear-gradient over url()).
    ".screen-title": {
      extends: [".screen"],
      background: [
        { type: "linear", angle: 180, stops: ["#131520d1", "#0d0f16f0"] },
        { image: "assets/title-keyart.webp", size: "cover", position: { x: 0.5, y: 0.5 } },
        "#171a26",
      ],
    },
    ".screen-title-plain": { extends: [".screen"] },
    // The empty council chamber above the results (the old <img class="hc-hero-img">).
    ".hero-img": { extends: [".hero"], background: [{ image: "assets/council-chamber.webp", size: "cover" }, "#1e2233"] },
    ".rail-blur": { extends: [".rail"], backdropBlur: 4 },
    ".screen-dim-blur": { extends: [".screen-dim"], backdropBlur: 6, background: "#0a0b12b8" },
  });
  ui.setTheme({
    fontSize: 16, headingSize: 22, smallSize: 13.6, padding: 8, spacing: 8, radius: 10,
    text: "#e8e4da", muted: "#9a96a8", panel: "#171a26", control: "#1e2233", hovered: "#262b42",
    pressed: "#2c3048", field: "#1e2233", accent: "#ffb54d", focus: "#6bd5ff", outline: "#3a4060",
  });
}
