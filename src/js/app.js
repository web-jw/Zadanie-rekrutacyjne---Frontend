import initInlineSVG from './inline-svg.js';
import './TableTeams/index.js';

document.addEventListener('DOMContentLoaded', () => {
  initInlineSVG();
});

// class NotYourCircle extends HTMLElement {
//   constructor() {
//     super();
//     this.attachShadow({ mode: 'open' });
//   }

//   get color() {
//     return this.getAttribute('color');
//   }

//   set color(val) {
//     this.setAttribute('color', val);
//   }

//   get radius() {
//     return this.getAttribute('radius');
//   }

//   set radius(val) {
//     this.setAttribute('radius', val);
//   }

//   static get observedAttributes() {
//     return ['color', 'radius'];
//   }

//   attributeChangedCallback(name, oldVal, newVal) {
//     this.updateStyles();
//   }

//   changeRadius(e) {
//     this.setAttribute('radius', e.target.value);
//   }
//   changeColor(e) {
//     this.setAttribute('color', e.target.value);
//   }

//   connectedCallback() {
//     this.render();
//   }

//   renderStyles() {
//     return `
//       .circle {
//           width: 20px;
//           height: 20px;
//           background-color: red;
//       }`;
//   }

//   updateStyles() {
//     const style = this.shadowRoot.querySelector('style');

//     style && (style.innerHTML = this.renderStyles());
//   }

//   render() {
//     this.shadowRoot.innerHTML = `
//         <style>
//             ${this.renderStyles()}
//         </style>
//         <div>
//             <h2>Not Your Circle</h2>
//             <div class="circle" id='circle'></div>

//         </div>
//     `;
//   }
// }

// customElements.define('not-your-circle', NotYourCircle);
