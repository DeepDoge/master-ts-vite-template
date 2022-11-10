import { masterElement } from "master-ts/framework/element"
import { EMPTY_NODE, html } from "master-ts/framework/fragment"
import type { Counter } from "./counter"

const CounterAsync = async (props: typeof Counter['PROPS_TYPE']) => (await import("./counter")).Counter(props)

async function Hello()
{
  return html`<b>Hello</b>`
}

export const App = masterElement('my-app', async ({ $ }) => 
{
  const toggleSignal = $.signal(false)
  const myCounter = CounterAsync({ startAt: 123 })

  const myH2 = $.signal<HTMLHeadingElement>(null!)
  $.subscribe(myH2, () => console.log('myH2 changed', myH2.value))

  return html`
    <main>
      <h1>Master TS</h1>

      <h2 :ref=${myH2} :class:bar=${toggleSignal} :style:--my-var=${$.derive(toggleSignal, (v) => v ? 'a' : 'b')} class="foo">Counter</h2>
      ${await Hello()}
      ${$.await(Hello(), EMPTY_NODE)}
      ${$.await(CounterAsync({ startAt: 1 }), EMPTY_NODE)}
      ${$.derive(toggleSignal, (toggle) => toggle ? $.await(myCounter, EMPTY_NODE) : EMPTY_NODE)}
    
      <x ${await CounterAsync({ startAt: 1 })} hey=${$.derive(toggleSignal, (n) => n ? 'true' : 'false')}>
        Click me!
      </x>

      <button :on:click=${() => toggleSignal.set(!toggleSignal.value)}>Toggle</button>
    </main>

    <style>
      @import url('/global.css');
    </style>
  `
})


const app = App({})
document.querySelector('#app')!.replaceWith(app)