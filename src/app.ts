import { defineElement } from "master-ts/framework/element"
import { EMPTY_NODE, html } from "master-ts/framework/fragment"
import { signal } from "master-ts/framework/signal"
import { importAsync } from "master-ts/utils/importAsync"

const logs = signal<string[][]>([])
const consoleLogOriginal = window.console.log
window.console.log = (...args: any[]) => {
  logs.change((logs) => logs.push(args.map((arg): string => arg.toString()).map((arg) => arg.startsWith('color:') ? '' : arg.replace(/%c/g, ''))))
  consoleLogOriginal(...args)
}

const { Counter } = importAsync(import('./counter'), 'Counter')

async function Hello()
{
  return html`<b>Hello</b>`
}

const Element = defineElement('my-app')
export function App()
{
  const element = Element()
  const $ = element.$

  const toggleSignal = $.signal(false)
  const myCounter = Counter(1)

  const myH2 = $.signal<HTMLHeadingElement>(null!)
  $.subscribe(myH2, () => console.log('myH2 changed', myH2.value))

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
      ${$.await(Hello(), EMPTY_NODE)}

      ${$.derive(toggleSignal, (toggle) => toggle ? $.await(myCounter, EMPTY_NODE) : EMPTY_NODE)}

      <button :on:click=${() => toggleSignal.set(!toggleSignal.value)}>Toggle</button>

      <div>
        <h3>Logs</h3>
        <ul>
          ${$.derive(logs, (logs) => logs.map((log) => html`<li>${log.join(' ')}</li>`))}
        </ul>
      </div>
    </main>

    <style>
      @import url('/global.css');
    </style>
  `
}

const app = await App()
document.querySelector('#app')!.replaceWith(app)