import { createEvent, h, proxyCustomElement } from '@stencil/core/internal/client';
export { setAssetPath } from '@stencil/core/internal/client';

const Autocomplete = class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.selected = createEvent(this, "selected", 7);
    this.unselected = createEvent(this, "unselected", 7);
    this.activeIndex = -1; // focused suggestion
    this.data = [];
    this.active = false; // has focus
    /**
     * The text is displayed by the form field for users
     */
    this.text = "";
    /**
     * The actual value of the form field
     */
    this.value = "";
    /**
     * The placeholder for the input field
     */
    this.placeholder = "";
    /**
     * If no value is selected, clear the input and emit unselected, if false, the value will not be cleared (usefull for suggesting values on a free text search)
     */
    this.clearOnUnselectedClosing = true;
    /**
     * Enable/Disable the input field
     */
    this.disabled = false;
    /**
     * The minimum input size for generating suggestions
     */
    this.minInput = 0;
    /**
     * The maximally shown suggestions in the list
     */
    this.maxSuggestions = 5;
    /**
     * Timing to suggest on empty (-1 to disable)
     */
    this.emptySuggestionTime = -1;
    /**
     * Form validation: is the form input required
     */
    this.required = false;
    /**
     * id of the input field
     */
    this.inputId = "";
    /**
     * The class names, which should be set on the rendered html elements
     */
    this.cssClasses = {
      wrapper: "",
      input: "",
      suggestions: "suggestions",
      suggestion: "suggestion",
      active: "active"
    };
  }
  /**
   * Returns the `value` of the selected item
   */
  async getValue() {
    return this.value;
  }
  /**
   * Returns the `text` of the selected item
   */
  async getText() {
    return this.text;
  }
  /**
   * Clears the form field (suggestions and selection)
   */
  async clear() {
    this.handleClose();
  }
  handleKeyDown(e) {
    if (["ArrowDown", "ArrowUp", "Down", "Up"].indexOf(e.key) >= 0) { // some older browsers use Up/Down instead of ArrayUp/ArrowDown (https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values)
      e.preventDefault();
      this.handleActivation(e.key == "ArrowDown" || e.key == "Down");
    }
    else if (e.key == "Enter" || e.key == "Tab") {
      e.preventDefault();
      this.handleSelection(this.activeIndex);
    }
    else if (e.key == "Escape") {
      this.handleClose();
    }
  }
  handleKeyUp(key, text) {
    if (["ArrowDown", "ArrowUp", "Enter", "Tab", "Escape"].indexOf(key) < 0) { // IE doesn't have Array.includes (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes)
      this.clearSelection(true);
      this.prepareSuggestions(text);
    }
    this.active = true;
    this.text = text;
  }
  handleFocus(e) {
    e.preventDefault();
    this.active = true;
    if (this.emptySuggestionTime >= 0) {
      this.prepareSuggestions(this.text).then(() => {
        this.handleActivation(false);
      });
    }
  }
  handleBlur(e) {
    e.preventDefault();
    setTimeout(() => {
      if (this.active) {
        if (this.value) {
          this.clearData();
        }
        else {
          this.handleClose();
        }
      }
    }, 250);
  }
  handleClose() {
    this.clearSelection();
    this.clearData();
  }
  handleActivation(next = true) {
    if (this.data.length > 0) {
      if (next && (this.activeIndex + 1) < this.data.length) {
        this.activeIndex += 1;
      }
      else if (next) {
        this.activeIndex = 0;
      }
      else if (!next && (this.activeIndex) > 0) {
        this.activeIndex -= 1;
      }
      else if (!next) {
        this.activeIndex = this.data.length - 1;
      }
    }
  }
  handleSelection(index) {
    if (index >= 0 && index < this.data.length) {
      this.text = this.data[index].text;
      this.value = this.data[index].value;
      this.selected.emit(this.data[index]);
      this.clearData();
    }
    else if (!this.clearOnUnselectedClosing) {
      this.handleClose();
    }
  }
  clearData() {
    this.data = [];
    this.activeIndex = -1;
    this.active = false;
  }
  clearSelection(clearOnlyValue = false) {
    if (this.value != "") {
      this.unselected.emit({
        text: this.text,
        value: this.value
      });
      if (this.clearOnUnselectedClosing) {
        this.value = "";
      }
    }
    if (!clearOnlyValue && this.clearOnUnselectedClosing) {
      this.text = "";
    }
  }
  async prepareSuggestions(text) {
    if (this.suggestionGenerator && text.length >= this.minInput) {
      let suggestions = await this.suggestionGenerator(text);
      suggestions.splice(this.maxSuggestions);
      this.data = suggestions;
    }
    else {
      this.data = [];
    }
  }
  render() {
    return (h("div", { class: this.cssClasses.wrapper }, h("input", { class: this.cssClasses.input, onKeyDown: (e) => this.handleKeyDown(e), onKeyUp: (e) => this.handleKeyUp(e.key, e.target['value']), onBlur: (e) => { this.handleBlur(e); }, onFocus: (e) => { this.handleFocus(e); }, type: "text", inputMode: this.inputmode, id: this.inputId, required: this.required, autocomplete: "off", disabled: this.disabled, placeholder: this.placeholder, value: this.text }), this.data && this.data.length > 0
      ? h("div", { class: this.cssClasses.suggestions }, this.data.map((suggestion, index) => {
        return h("button", { onClick: () => this.handleSelection(index), type: "button", class: this.cssClasses.suggestion + (this.activeIndex == index ? (" " + this.cssClasses.active) : ""), "data-value": suggestion.value }, suggestion.suggestion ? suggestion.suggestion : suggestion.text);
      }))
      : ""));
  }
};

const WebComplete = /*@__PURE__*/proxyCustomElement(Autocomplete, [0,"web-complete",{"text":[1025],"value":[1025],"placeholder":[1],"clearOnUnselectedClosing":[4,"clear-on-unselected-closing"],"disabled":[4],"minInput":[2,"min-input"],"maxSuggestions":[2,"max-suggestions"],"emptySuggestionTime":[2,"empty-suggestion-time"],"required":[4],"inputmode":[1],"inputId":[1,"input-id"],"suggestionGenerator":[16],"cssClasses":[16],"activeIndex":[32],"data":[32],"active":[32]}]);
const defineCustomElements = (opts) => {
  if (typeof customElements !== 'undefined') {
    [
      WebComplete
    ].forEach(cmp => {
      if (!customElements.get(cmp.is)) {
        customElements.define(cmp.is, cmp, opts);
      }
    });
  }
};

export { WebComplete, defineCustomElements };
