import { safeText } from '../utils/sanitize.js';

export function renderHome(products) {
  return `<main>
    <h2>Featured Products</h2>
    <div class="grid">
      ${products
        .map(
          (p) => `<article class="product">
            <h3>${safeText(p.name)}</h3>
            <p>$${p.price.toFixed(2)}</p>
            <button data-action="buy" data-id="${p.id}">Buy Now</button>
          </article>`
        )
        .join('')}
    </div>
  </main>`;
}
