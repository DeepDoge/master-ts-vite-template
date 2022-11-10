import { masterElement } from "master-ts/framework/element"
import { html } from "master-ts/framework/fragment"

interface Props
{
  startAt: number
}

export const Counter = masterElement<Props>('my-counter', ({ props, $ }) =>
{ 
  const count = $.signal(props.startAt)
  const increment = () => count.set(count.value + 1)

  return html`
      <button :on:click=${increment}><slot>Counter: </slot> ${count}</button>`
})
