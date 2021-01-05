import { Component, Prop, h, State, Event, Method } from '@stencil/core';
export class Autocomplete {
  constructor() {
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
    return (h("div", { class: this.cssClasses.wrapper },
      h("input", { class: this.cssClasses.input, onKeyDown: (e) => this.handleKeyDown(e), onKeyUp: (e) => this.handleKeyUp(e.key, e.target['value']), onBlur: (e) => { this.handleBlur(e); }, onFocus: (e) => { this.handleFocus(e); }, type: "text", inputMode: this.inputmode, id: this.inputId, required: this.required, autocomplete: "off", disabled: this.disabled, placeholder: this.placeholder, value: this.text }),
      this.data && this.data.length > 0
        ? h("div", { class: this.cssClasses.suggestions }, this.data.map((suggestion, index) => {
          return h("button", { onClick: () => this.handleSelection(index), type: "button", class: this.cssClasses.suggestion + (this.activeIndex == index ? (" " + this.cssClasses.active) : ""), "data-value": suggestion.value }, suggestion.suggestion ? suggestion.suggestion : suggestion.text);
        }))
        : ""));
  }
  static get is() { return "web-complete"; }
  static get properties() { return {
    "text": {
      "type": "string",
      "mutable": true,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "The text is displayed by the form field for users"
      },
      "attribute": "text",
      "reflect": false,
      "defaultValue": "\"\""
    },
    "value": {
      "type": "string",
      "mutable": true,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "The actual value of the form field"
      },
      "attribute": "value",
      "reflect": false,
      "defaultValue": "\"\""
    },
    "placeholder": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "The placeholder for the input field"
      },
      "attribute": "placeholder",
      "reflect": false,
      "defaultValue": "\"\""
    },
    "clearOnUnselectedClosing": {
      "type": "boolean",
      "mutable": false,
      "complexType": {
        "original": "boolean",
        "resolved": "boolean",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "If no value is selected, clear the input and emit unselected, if false, the value will not be cleared (usefull for suggesting values on a free text search)"
      },
      "attribute": "clear-on-unselected-closing",
      "reflect": false,
      "defaultValue": "true"
    },
    "disabled": {
      "type": "boolean",
      "mutable": false,
      "complexType": {
        "original": "boolean",
        "resolved": "boolean",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "Enable/Disable the input field"
      },
      "attribute": "disabled",
      "reflect": false,
      "defaultValue": "false"
    },
    "minInput": {
      "type": "number",
      "mutable": false,
      "complexType": {
        "original": "number",
        "resolved": "number",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "The minimum input size for generating suggestions"
      },
      "attribute": "min-input",
      "reflect": false,
      "defaultValue": "0"
    },
    "maxSuggestions": {
      "type": "number",
      "mutable": false,
      "complexType": {
        "original": "number",
        "resolved": "number",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "The maximally shown suggestions in the list"
      },
      "attribute": "max-suggestions",
      "reflect": false,
      "defaultValue": "5"
    },
    "emptySuggestionTime": {
      "type": "number",
      "mutable": false,
      "complexType": {
        "original": "number",
        "resolved": "number",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "Timing to suggest on empty (-1 to disable)"
      },
      "attribute": "empty-suggestion-time",
      "reflect": false,
      "defaultValue": "-1"
    },
    "required": {
      "type": "boolean",
      "mutable": false,
      "complexType": {
        "original": "boolean",
        "resolved": "boolean",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "Form validation: is the form input required"
      },
      "attribute": "required",
      "reflect": false,
      "defaultValue": "false"
    },
    "inputmode": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "'none' | 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search'",
        "resolved": "\"decimal\" | \"email\" | \"none\" | \"numeric\" | \"search\" | \"tel\" | \"text\" | \"url\"",
        "references": {}
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": "A hint to the browser for which keyboard to display.\nPossible values: `\"none\"`, `\"text\"`, `\"tel\"`, `\"url\"`,\n`\"email\"`, `\"numeric\"`, `\"decimal\"`, and `\"search\"`."
      },
      "attribute": "inputmode",
      "reflect": false
    },
    "inputId": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "id of the input field"
      },
      "attribute": "input-id",
      "reflect": false,
      "defaultValue": "\"\""
    },
    "suggestionGenerator": {
      "type": "unknown",
      "mutable": false,
      "complexType": {
        "original": "(text: string) => Promise<Array<{ text: string, value: string, suggestion?: string }>>",
        "resolved": "(text: string) => Promise<{ text: string; value: string; suggestion?: string; }[]>",
        "references": {
          "Promise": {
            "location": "global"
          },
          "Array": {
            "location": "global"
          }
        }
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "Async suggestion generator:\n`text` is the displayed for users in the form after selection (if no `suggesion` also as suggesion)\n`value` is the actual value of the form field\noptional `suggesion` if the autocomplete suggestion item should be formatted differently than `text`"
      }
    },
    "cssClasses": {
      "type": "unknown",
      "mutable": false,
      "complexType": {
        "original": "{ wrapper: string; input: string; suggestions: string; suggestion: string; active: string; }",
        "resolved": "{ wrapper: string; input: string; suggestions: string; suggestion: string; active: string; }",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "The class names, which should be set on the rendered html elements"
      },
      "defaultValue": "{\n    wrapper: \"\",\n    input: \"\",\n    suggestions: \"suggestions\",\n    suggestion: \"suggestion\",\n    active: \"active\"\n  }"
    }
  }; }
  static get states() { return {
    "activeIndex": {},
    "data": {},
    "active": {}
  }; }
  static get events() { return [{
      "method": "selected",
      "name": "selected",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": "Emitted when an item from suggestions was selected"
      },
      "complexType": {
        "original": "any",
        "resolved": "any",
        "references": {}
      }
    }, {
      "method": "unselected",
      "name": "unselected",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": "Emitted when item was cleared/unselected"
      },
      "complexType": {
        "original": "any",
        "resolved": "any",
        "references": {}
      }
    }]; }
  static get methods() { return {
    "getValue": {
      "complexType": {
        "signature": "() => Promise<string>",
        "parameters": [],
        "references": {
          "Promise": {
            "location": "global"
          }
        },
        "return": "Promise<string>"
      },
      "docs": {
        "text": "Returns the `value` of the selected item",
        "tags": []
      }
    },
    "getText": {
      "complexType": {
        "signature": "() => Promise<string>",
        "parameters": [],
        "references": {
          "Promise": {
            "location": "global"
          }
        },
        "return": "Promise<string>"
      },
      "docs": {
        "text": "Returns the `text` of the selected item",
        "tags": []
      }
    },
    "clear": {
      "complexType": {
        "signature": "() => Promise<void>",
        "parameters": [],
        "references": {
          "Promise": {
            "location": "global"
          }
        },
        "return": "Promise<void>"
      },
      "docs": {
        "text": "Clears the form field (suggestions and selection)",
        "tags": []
      }
    }
  }; }
}
