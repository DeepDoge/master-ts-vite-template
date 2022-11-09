import { masterElement } from "master-ts/framework/element"
import { EMPTY_NODE, html } from "master-ts/framework/fragment"
import { Counter } from "./counter"

export const App = masterElement('my-app', ({ $ }) => 
{
  const toggleSignal = $.signal(false)
  const myCounter = Counter({ startAt: 123 })

  return html`
    <main>
      <h1>Master TS</h1>

      <h2>Counter</h2>
      ${Counter({ startAt: 0 })}
      <x ${Counter({ startAt: 1 })}>
        Click me!
      </x>
      ${$.derive(toggleSignal, (toggle) => toggle ? myCounter : EMPTY_NODE)}
      <button on:click=${() => toggleSignal.set(!toggleSignal.value)}>Toggle</button>
    </main>

    <style>
      @import url('/global.css');
    </style>
  `
})


const app = App({})
document.querySelector('#app')!.replaceWith(app)