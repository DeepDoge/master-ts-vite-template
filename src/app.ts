import makeItImage from '@/assets/make-it-yourself.webp'
import { defineMasterElement, MasterElement } from "master-ts/library/element"
import { html } from "master-ts/library/template"
import { importAsync } from "master-ts/library/utils/importAsync"

MasterElement.globalFragment.append(html`<link rel="stylesheet" href="/styles/global.css" />`)

const { Counter } = importAsync(import('./counter'), 'Counter')

const Element = defineMasterElement('my-app')
export function App()
{
  const element = Element()
  const $ = element.$

  const toggle = $.signal(false)
  const myCounter = Counter(1)

  return element.html`
    <main>
      <h1>Master TS</h1>

      <img src=${makeItImage} />

      ${$.await((async () => 
      {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        return html`<x ${await Counter(1)}>Click me!</x>`
      })(), 'Loading...')}

      <h2 class:bar=${toggle} style:--my-var="a ${$.derive(($) => $(toggle).value ? 'a' : 'b')}" class="foo">Counter</h2>
      <button on:click=${() => toggle.value = !toggle.value}>Toggle</button>
      ${$.derive(($) => $(toggle).value ? myCounter : "Hello World!")}
    </main>

    <style>
      main {
        display: grid;
        grid-template-columns: min(100%, 30em);
        gap: 1em;

        min-height: 100vh;
        place-content: center;
        justify-items: center;
      }
    </style>
  `
}

const app = App()
document.querySelector('#app')!.replaceWith(app)