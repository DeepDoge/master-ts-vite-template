import { defineElement } from "master-ts/framework/element"
import { html } from "master-ts/framework/template"
import { Counter } from "./counter"
import typescriptLogo from "./typescript.svg"
import "./style.css"

export const App = defineElement('x-app', () =>
{
  return html`
      <h1>Master.TS</h1>
      
      <div class="logos">
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" class="logo" alt="Vite logo" />
        </a>
        <a href="https://www.typescriptlang.org/" target="_blank">
          <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
        </a>
      </div>
      <h2>Vite + TypeScript</h2>
      
      <h2>Default Counter</h2>
      ${Counter({})}
      
      <h2>Counter with Custom Text</h2>
      <x ${Counter({})}>
        Click me:
      </x>

      <style>
        *, *::before, *::after {
          box-sizing: border-box;
        }

        :host {
          display: grid;
          justify-items: center;
          place-content: center;
          min-height: 100vh;
          gap: 1em;
        }

        img {
          max-width: 100%;
        }
        
        .logos {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1em;
          width: min(15em, 100%);
          place-items: stretch
        }

        .logos > * {
          display: grid;
          place-items: stretch;
          aspect-ratio: 1;
        }

        .logos img {
          object-fit: contain;
        }
      </style>
`
})

const app = App({})
app.$mount(document.querySelector('#app')!)