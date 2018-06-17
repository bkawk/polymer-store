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
      <template is="dom-if" if="{{debug}}">
      <h4>[[key]]</h4>
      <h4>[[value]]</h4>
      <h4>[[operation]]</h4>
      <h4>[[result]]</h4>
      </template>
    `;
  }
  static get properties() {
    return {
      key: {
        type: String,
      },
      value: {
        type: String,
      },
      debug: {
        type: Boolean,
        value: false,
      },
      operation: {
        type: String,
        observer: "_start"
      },
      result: {
        type: String,
        notify: true,
        reflectToAttribute: true,
      },
      overwrite: {
        type: Boolean,
        value: false,
      },
      error: {
        type: String,
        notify: true,
        reflectToAttribute: true,
      },
    };
  }

  _start(){
    if(this.operation == 'set' && this.key && this.value){
      this.set(this.key, this.value)
    } else if (this.operation == 'get' && this.key){
      this.get(this.key)
    } else if (this.operation == 'delete' && this.key){
      this.delete(this.key)
    } else {
      this.error = "wrong arguments"
    }
  }

  set(key, value){
    return new Promise((resolve, reject) => {
      if(this.overwrite){
        localStorage.setItem(key, value);
      }
      if(!this.overwrite){
        this.get(key)
        .then((val)=>{
          if(val == null){
            localStorage.setItem(key, value);
          }
        })
      }
    })
  }

  get(key){
    return new Promise((resolve, reject) => {
      resolve(localStorage.getItem(key))
    })
  }

  delete(key){
    return new Promise((resolve, reject) => {
      console.log("FIRE DEL")
      resolve(localStorage.removeItem(key))
    })
  }

} window.customElements.define('polymer-store', PolymerStore);
