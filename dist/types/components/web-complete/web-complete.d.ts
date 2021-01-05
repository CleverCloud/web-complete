import { ComponentInterface, EventEmitter } from '../../stencil-public-runtime';
export declare class Autocomplete implements ComponentInterface {
  activeIndex: number;
  data: Array<{
    text: string;
    value: string;
    suggestion?: string;
  }>;
  active: boolean;
  /**
   * The text is displayed by the form field for users
   */
  text: string;
  /**
   * The actual value of the form field
   */
  value: string;
  /**
   * The placeholder for the input field
   */
  placeholder: string;
  /**
   * If no value is selected, clear the input and emit unselected, if false, the value will not be cleared (usefull for suggesting values on a free text search)
   */
  clearOnUnselectedClosing: boolean;
  /**
   * Enable/Disable the input field
   */
  disabled: boolean;
  /**
   * The minimum input size for generating suggestions
   */
  minInput: number;
  /**
   * The maximally shown suggestions in the list
   */
  maxSuggestions: number;
  /**
   * Timing to suggest on empty (-1 to disable)
   */
  emptySuggestionTime: number;
  /**
   * Form validation: is the form input required
   */
  required: boolean;
  /**
   * A hint to the browser for which keyboard to display.
   * Possible values: `"none"`, `"text"`, `"tel"`, `"url"`,
   * `"email"`, `"numeric"`, `"decimal"`, and `"search"`.
   */
  inputmode?: 'none' | 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search';
  /**
   * id of the input field
   */
  inputId: string;
  /**
   * Async suggestion generator:
   * `text` is the displayed for users in the form after selection (if no `suggesion` also as suggesion)
   * `value` is the actual value of the form field
   * optional `suggesion` if the autocomplete suggestion item should be formatted differently than `text`
   */
  suggestionGenerator: (text: string) => Promise<Array<{
    text: string;
    value: string;
    suggestion?: string;
  }>>;
  /**
   * The class names, which should be set on the rendered html elements
   */
  cssClasses: {
    wrapper: string;
    input: string;
    suggestions: string;
    suggestion: string;
    active: string;
  };
  /**
   * Emitted when an item from suggestions was selected
   */
  selected: EventEmitter;
  /**
   * Emitted when item was cleared/unselected
   */
  unselected: EventEmitter;
  /**
   * Returns the `value` of the selected item
   */
  getValue(): Promise<string>;
  /**
   * Returns the `text` of the selected item
   */
  getText(): Promise<string>;
  /**
   * Clears the form field (suggestions and selection)
   */
  clear(): Promise<void>;
  handleKeyDown(e: KeyboardEvent): void;
  handleKeyUp(key: any, text: any): void;
  handleFocus(e: FocusEvent): void;
  handleBlur(e: FocusEvent): void;
  handleClose(): void;
  handleActivation(next?: boolean): void;
  handleSelection(index: any): void;
  clearData(): void;
  clearSelection(clearOnlyValue?: boolean): void;
  prepareSuggestions(text: any): Promise<void>;
  render(): any;
}
