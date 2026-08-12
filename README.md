# Bounce Creative Designs — Homepage Redesign Prototype

A React + Vite prototype of a redesigned homepage for
[bouncecreativedesigns.co.uk](https://www.bouncecreativedesigns.co.uk/), built to be pushed to GitHub and
published with GitHub Pages.

**This is a design prototype, not the live site.** It is marked as such on the page and the build ships
`noindex, nofollow`.

---

## Quick start

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # -> dist/
npm run preview    # serve the production build locally
```

Node 20 or newer.

## Publish it on GitHub Pages

1. Create an empty repository on GitHub (any name — the workflow reads it automatically).
2. Push this folder:

   ```bash
   git init
   git add .
   git commit -m "Homepage redesign prototype"
   git branch -M main
   git remote add origin https://github.com/<you>/<repo>.git
   git push -u origin main
   ```

3. In the repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. The included workflow (`.github/workflows/deploy.yml`) builds on every push to `main` and deploys.

Your shareable link will be:

```
https://<you>.github.io/<repo>/
```

The workflow sets `BASE_PATH="/<repo>/"` from the repository name, which is what makes assets resolve on a
Pages project site. Nothing to edit by hand. For a user/organisation site (`<you>.github.io`), remove the
`BASE_PATH=` prefix from the build step so the base stays `/`.

---

## Where the content comes from

Everything on the page is real data pulled from the production site — no lorem, no invented products.

| Section | Source |
|---|---|
| Promo bar | The live `RFX10QR` offer |
| Header nav | The live category navigation |
| Hero headline | `trust_block` CMS block, verbatim |
| Hero imagery | `top_category_section` category photography |
| What sets us apart | `sets_us_apart` — 3 USPs with their real icons |
| Shop the ranges | `top_category_section` + `middle_blocks` + `category_block`, deduplicated to 9 |
| Best sellers this month | 14 real catalogue products — real names, SKUs, prices and photography |
| Our Popular Products | `our_popular_product` attribute — 11 tabs, 4 products each, exactly as the live `popular_eco_product.phtml` selects them |
| Our Eco Products | `our_eco_product` attribute — 9 tabs, 4 products each |
| Customer reviews | REVIEWS.io merchant API — 4.97 from 111 reviews, with five published testimonials |
| Client logos | `brand_slider` — 11 logos |
| Our Awards | `our_awards` — 7 accreditation marks |
| About | `promotional_products` — heading, copy and its four links |
| Supplying amazing brands | `amazing_brand` — 25 supplier logos |
| Ideas and guides | The 6 most recent published WordPress posts, with real titles, dates and images |
| FAQ | `faq` — 5 questions with full answers |

Product prices are the minimum enabled price per product from the catalogue, shown as "from £X.XX
excluding VAT". Product and article cards link to the real live URLs.

`src/data/content.js` is **generated** from that extraction — it carries a do-not-edit header. Regenerate
it rather than editing it by hand if the source content changes.

### What is deliberately absent

**Magento's own product reviews.** The `review` tables hold Luma sample data — demo reviews about
clothing, plus test rows — so none of it appears here. The reviews section is fed from REVIEWS.io, the
provider the store actually uses, via its public merchant endpoint. No API credential is stored in this
repository; only the resulting public review data is baked into `content.js`.

**"View all products" buttons on the tabbed sections.** The live template builds that link as
`<base URL> + <tab label>`, which produces URLs like `/Gift Boxes` and 404s. Rather than reproduce a
broken link, the sections ship without it until the client confirms the correct destination.

**Strikethrough "was" prices.** `special_price` in the catalogue is inverted on the products checked — an
£80 special against a £9.30 price — so no discount pricing is shown anywhere.

---

## Project structure

```
├── .github/workflows/deploy.yml   GitHub Pages build + deploy
├── public/img/                    real imagery, resized (2.8 MB)
│   ├── category/  product/  post/  client/  brand/  award/  usp/  logo/
├── src/
│   ├── App.jsx                    section order
│   ├── asset.js                   resolves public/ paths against the Vite base
│   ├── index.css                  the whole design system
│   ├── data/content.js            GENERATED — all live content
│   └── components/                15 components, one per section
├── index.html
└── vite.config.js
```

No CSS framework and no UI library — two dependencies, React and React DOM. The design lives in one
stylesheet so it can be lifted into the Hyvä theme without untangling utility classes.

## Design tokens

Defined at the top of `src/index.css`, taken from the live brand assets rather than invented:

| Token | Value | Source |
|---|---|---|
| `--crimson` | `#e50e46` | sampled from the store logo artwork |
| `--ink-2` | `#373a36` | the charcoal the logo is drawn for |
| `--ink` | `#232521` | deeper ground for footer and logo bands |
| font | Poppins | `bouncecreative.css` |

The logo is the real store logo (the file behind `design/header/logo_src`). It is white artwork on
transparency, which is why the header is charcoal.

Poppins is not bundled — no font file ships with the Magento theme — so it falls back to Century Gothic
then the system sans on machines without it. Add a `@font-face` if the licence allows.

## Accessibility and performance

- Semantic landmarks, one `h1`, headings in order.
- Keyboard operable throughout: carousel pages with arrow keys, FAQ is a button-driven disclosure, the
  mobile drawer closes on Escape.
- Every meaningful image has descriptive alt text; decorative icons have empty alt.
- All images below the fold are lazy-loaded and carry explicit dimensions to hold layout space.
- `prefers-reduced-motion` is respected.
- Production build: ~14 kB CSS and ~171 kB JS (54 kB gzipped), plus 3 MB of imagery.

## Relationship to the OpenSpec change

This lives in `openspec/changes/redesign-homepage/site/` and is the deployable form of the task 1.1/1.2
wireframe deliverable. The static prototypes it descends from are in `../prototype/` (Design A, the
structure this follows) and `../prototype-c/` (live-content restyle).
