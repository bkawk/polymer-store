import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * `polymer-store`
 * 
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class PolymerStore extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <h2>Hello [[prop1]]!</h2>
    `;
  }
  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'polymer-store',
      },
    };
  }
}

window.customElements.define('polymer-store', PolymerStore);
