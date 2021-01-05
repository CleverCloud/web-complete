'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-6644b88a.js');

/*
 Stencil Client Patch Esm v2.3.0 | MIT Licensed | https://stenciljs.com
 */
const patchEsm = () => {
    return index.promiseResolve();
};

const defineCustomElements = (win, options) => {
  if (typeof window === 'undefined') return Promise.resolve();
  return patchEsm().then(() => {
  return index.bootstrapLazy([["web-complete.cjs",[[0,"web-complete",{"text":[1025],"value":[1025],"placeholder":[1],"clearOnUnselectedClosing":[4,"clear-on-unselected-closing"],"disabled":[4],"minInput":[2,"min-input"],"maxSuggestions":[2,"max-suggestions"],"emptySuggestionTime":[2,"empty-suggestion-time"],"required":[4],"inputmode":[1],"inputId":[1,"input-id"],"suggestionGenerator":[16],"cssClasses":[16],"activeIndex":[32],"data":[32],"active":[32],"getValue":[64],"getText":[64],"clear":[64]}]]]], options);
  });
};

exports.defineCustomElements = defineCustomElements;
