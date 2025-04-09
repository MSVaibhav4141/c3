import './style.css'

import { basicValidationZod, setupCounter, zodObjectType } from './counter.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div id="content"></div>
  <span id="content1"></span>
  <div id="conten2"></div>
  <input id="#nputu" type='text'></input>
`

let inputValue  = document.querySelector<HTMLInputElement>("#nputu")?.addEventListener('change', (e) => {
  const target = e.target as HTMLInputElement; // Type-casting
  const contentElement = document.querySelector<HTMLDivElement>("#content2")!;

  console.log(inputValue)
  // zodObjectType(contentElement, target.value);
})

setupCounter(document.querySelector<HTMLDivElement>('#content')!)
basicValidationZod(document.querySelector<HTMLSpanElement>('#content1')!)