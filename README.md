# THREADLAB — Interactive E-commerce Platform

A responsive, browser-based apparel storefront and customization prototype, developed from an earlier student web project. This public portfolio edition modernizes the original **T-shirt / hoodie customization, product browsing, and shopping-cart** concept while replacing unlicensed brand/product imagery with original SVG illustrations.

## Features

- **Product catalog:** browse six sample garments, filter by T-shirts or hoodies, and search by name.
- **Interactive design studio:** pick garment type, color, one of three original vector graphics (or none), and optionally add a short custom message.
- **Artwork positioning:** drag the artwork on the garment with a mouse or touchscreen; arrow keys (and Shift+arrow keys) provide keyboard positioning.
- **Shopping bag:** add ready-made and customized pieces, change quantities, remove items, and review a calculated total.
- **Demo order:** simulates completion and clears the local cart. **It does not accept payment or contact information.**
- **Responsive layouts:** designed for desktop and mobile screens, with accessible form labels and buttons.

## Technology

- HTML5, CSS3, vanilla JavaScript (ES modules)
- SVG-based original garment and artwork illustrations
- Browser `localStorage` for local cart persistence
- Node.js built-in static server (`node:http`) for development — **no npm dependencies**
- Native Node.js test runner (`node --test`)

## Run locally

Requires **Node.js 20+**. No database, npm install, or third-party API credentials are needed.

```bash
npm start
```

Open **http://127.0.0.1:3000** in your browser. Start from `index.html`. Press `Ctrl+C` to stop the server.

Or run `python -m http.server 8000` from the repository folder and visit **http://localhost:8000**.

## Tests

```bash
npm test
```

The tests exercise catalog validity, input normalization, correct pricing, HTML escaping, cart persistence, and SVG generation. Browser smoke tests were also performed during packaging.

## Project structure

```text
Interactive-Ecommerce-Platform/
├── index.html             # Storefront and product filtering
├── customize.html         # Interactive custom apparel studio
├── cart.html              # Local shopping bag and demo order
├── styles.css             # Responsive styles
├── src/
│   ├── core.js            # Catalog, SVG art, validation, storage helpers
│   ├── main.js            # Product catalog interactions
│   ├── customize.js       # Color, graphic, text and position controls
│   └── cart.js            # Cart rendering and simulated checkout
├── tests/
│   └── core.test.mjs      # Automated unit tests
├── server.mjs             # Local static development server
├── package.json
└── README.md
```


