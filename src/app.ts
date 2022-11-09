import { masterElement } from "master-ts/framework/element"
import { html } from "master-ts/framework/fragment"
import { Counter } from "./counter"

export const App = masterElement('my-app', ({ }) => 
{
  return html`
    <main>
      <h1>Master TS</h1>

      <h2>Counter</h2>
      ${Counter({ startAt: 0 })}
      <x ${Counter({ startAt: 1 })}>
        Click me!
      </x>
    </main>

    <style>
      @import url('/global.css');
    </style>
  `
})


const app = App({})
document.querySelector('#app')!.replaceWith(app)