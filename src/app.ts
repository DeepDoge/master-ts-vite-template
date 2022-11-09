import { defineElement, MasterElement } from "master-ts/framework/element"
import { html } from "master-ts/framework/template"
import { Counter } from "./counter"
import image from "./assets/make-it-yourself.webp"

// Nodes of this fragment are cloned into all MasterElement Shadow DOMs.
// This is a good place to put global styles. 
MasterElement.globalFragment.append(await html`<link rel="stylesheet" href="/global.css">`.renderFragment())

export const App = defineElement('x-app', () =>
{
  function myFragment(text: string)
  {
    return html`
      <h2>My Fragment</h2>
      <i>${text}</i>
      <b>${text}</b>`
  }

  function myCode(code: string)
  {
    const fragment = document.createDocumentFragment()
    const element = document.createElement('code')
    element.textContent = code
    const h2 = document.createElement('h2')
    h2.textContent = 'My Code'
    fragment.append(h2, element)
    return fragment
    // Or:
    return html`
      <h2>My Code</h2>
      <code>${code}</code>`
  }

  return html`
      <h1>Master.TS</h1>
      <img src=${image}/>
      
      <h2>Default Counter</h2>
      ${Counter({})}
      
      <h2>Counter with Custom Text</h2>
      <x ${Counter({})}>
        Click me:
      </x>

      ${myFragment('Hello World!')}

      ${myCode('const x = 1;')}


      <style>
        :host {
          display: grid;
          justify-items: center;
          place-content: center;
          min-height: 100vh;
          gap: .5em;
          padding: 2em 0;
        }

        img {
          width: min(30em, 100%);
          border-radius: 1em;
        }
      </style>
`
})

const app = App({})
await app.$mount(document.querySelector('#app')!)