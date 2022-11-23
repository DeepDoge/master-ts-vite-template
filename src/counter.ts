import { defineMasterElement } from "master-ts/framework/element"


const Element = defineMasterElement('my-counter')
export function Counter(startAt: number)
{
  const element = Element()
  const $ = element.$

  const count = $.signal(startAt)
  const increment = () => count.value += 1

  return element.html`
  <button on:click=${increment}>
    <slot>Counter: </slot> ${count}
  </button>`
}