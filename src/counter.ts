import { defineElement } from "master-ts/framework/element"
import { html } from "master-ts/framework/fragment"
import { masterTooling } from "master-ts/framework/tooling"


const Element = defineElement('my-counter')
export function Counter(startAt: number)
{
  const element = Element()
  const $ = element.$

  const count = $.signal(startAt)
  const increment = () => count.set(count.value + 1)

  return element.html`
  <button :on:click=${increment}>
    <slot>Counter: </slot> ${count}
  </button>`
}

export function CounterAsFragment(startAt: number, text = 'Counter: ')
{
  const comment = document.createComment('my-counter')
  const $ = masterTooling(comment)

  const count = $.signal(startAt)
  const increment = () => count.set(count.value + 1)

  return html`
    ${comment}
    <button :on:click=${increment}>
      ${text} ${count}
    </button>`
}