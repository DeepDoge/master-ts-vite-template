import { defineElement } from "master-ts/framework/element"
import { html } from "master-ts/framework/template"

export const Counter = defineElement('x-counter', ({ self: $ }) => {
  const count = $.$signal(0)
  const isOdd = $.$derive(count, (count) => count % 2 === 1)

  function increment() {
    count.update(n => n + 1)
  }

  return html`
    <button class:odd=${isOdd} on:click=${increment}> 
      <slot>Counter: </slot> ${count}
    </button>
    <p>Color turns to purple on odd numbers.</p>
    <style>
      :host {
        display: contents;
      }

      button {
        font-size: 1.5em;
      }

      button.odd {
        background-color: purple;
        color: white;
      }
    </style>`
})
