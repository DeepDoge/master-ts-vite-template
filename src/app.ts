import { defineMasterElement } from "master-ts/framework/element"
import { html } from "master-ts/framework/fragment"
import { importAsync } from "master-ts/utils/importAsync"
import makeItImage from './assets/make-it-yourself.webp'

const { Counter } = importAsync(import('./counter'), 'Counter')

async function Hello()
{
  return html`<b>Hello</b>`
}

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

      ${$.await
      (
        html`
          <x ${Counter(1)}>
            Click me!
          </x>`,
        html`
        <b>Loading...</b>`
      )}

      <h2 :class:bar=${toggle} :style:--my-var=${$.derive(() => toggle.value ? 'a' : 'b')} class="foo">Counter</h2>
      <button :on:click=${() => toggle.value = !toggle.value}>Toggle</button>
      ${$.derive(() => toggle.value ? myCounter : Hello())}
    </main>

    <style>
      @import url('/global.css');

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

const app = await App()
document.querySelector('#app')!.replaceWith(app)