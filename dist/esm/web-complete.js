import { p as promiseResolve, b as bootstrapLazy } from './index-5e773d39.js';

/*
 Stencil Client Patch Browser v2.3.0 | MIT Licensed | https://stenciljs.com
 */
const patchBrowser = () => {
    const importMeta = import.meta.url;
    const opts =  {};
    if ( importMeta !== '') {
        opts.resourcesUrl = new URL('.', importMeta).href;
    }
    return promiseResolve(opts);
};

patchBrowser().then(options => {
  return bootstrapLazy([["web-complete",[[0,"web-complete",{"text":[1025],"value":[1025],"placeholder":[1],"clearOnUnselectedClosing":[4,"clear-on-unselected-closing"],"disabled":[4],"minInput":[2,"min-input"],"maxSuggestions":[2,"max-suggestions"],"emptySuggestionTime":[2,"empty-suggestion-time"],"required":[4],"inputmode":[1],"inputId":[1,"input-id"],"suggestionGenerator":[16],"cssClasses":[16],"activeIndex":[32],"data":[32],"active":[32],"getValue":[64],"getText":[64],"clear":[64]}]]]], options);
});
