import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'

document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Hello Vite!</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`

setupCounter(document.querySelector('#counter'))

// Add pricing toggle functionality
document.addEventListener('DOMContentLoaded', function() {
  const pricingToggle = document.getElementById('pricingToggle');
  const monthlyPrices = document.querySelectorAll('.monthly-price');
  const annualPrices = document.querySelectorAll('.annual-price');

  pricingToggle.addEventListener('change', function() {
    if (this.checked) {
      monthlyPrices.forEach(price => price.classList.add('d-none'));
      annualPrices.forEach(price => price.classList.remove('d-none'));
    } else {
      monthlyPrices.forEach(price => price.classList.remove('d-none'));
      annualPrices.forEach(price => price.classList.add('d-none'));
    }
  });
});