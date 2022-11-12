import { defineMasterElement } from "master-ts/framework/element"
import { EMPTY_NODE, html } from "master-ts/framework/fragment"
import { SignalSubscriptionMode } from "master-ts/framework/signal/base"
import { importAsync } from "master-ts/utils/importAsync"

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

  const toggleSignal = $.signal(false)
  const myCounter = Counter(1)

  const myH2 = $.signal<HTMLHeadingElement | null>(null)
  $.subscribe(myH2, () => console.log('myH2 changed', myH2.value), { mode: SignalSubscriptionMode.Immediate })

  return element.html`
    <main>
      <h1>Master TS</h1>

      ${$.await
      (
        html`
          <x ${Counter(1)}>
            Hey!
          </x>`,
        html`
        <b>Loading...</b>`
      )}

      <h2 :ref=${myH2} :class:bar=${toggleSignal} :style:--my-var=${$.derive(toggleSignal, (v) => v ? 'a' : 'b')} class="foo">Counter</h2>
      ${Hello()}
      ${Counter(1)}
      ${$.derive(toggleSignal, (toggle) => toggle ? myCounter : EMPTY_NODE)}

      <button :on:click=${() => toggleSignal.set(!toggleSignal.value)}>Toggle</button>
    </main>

    <style>
      @import url('/global.css');
    </style>
  `
}

const app = await App()
document.querySelector('#app')!.replaceWith(app)