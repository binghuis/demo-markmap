import { loadCSS, loadJS } from "markmap-common";
import { Transformer } from "markmap-lib";
import * as markmap from "markmap-view";
export { Markmap } from "markmap-view";

import "markmap-toolbar/dist/style.css";

export const transformer = new Transformer();

const { scripts, styles } = transformer.getAssets();

if (styles) {
  loadCSS(styles);
}

if (scripts) {
  loadJS(scripts);
}

declare global {
  interface Window {
    markmap: typeof markmap;
  }
}

window.markmap = markmap;
