# Clinidental

Full multi-page website for a dental clinic — six pages, modular CSS architecture, and clinical-grade content built to AAP/EFP 2017 terminology standards. Splide.js carousels, before/after galleries, lightbox, Netlify Forms integration, sitemap, and robots.txt. The most complete static site in the Andina Web Studio portfolio.

## Pages

| Page | Description |
|---|---|
| index.html | Home — hero, services overview, CTA |
| about.html | About the clinic and the doctor |
| services.html | Full service catalog |
| galeria.html | Before/after gallery with lightbox |
| faq.html | Clinical FAQ with AAP/EFP terminology |
| contact.html | Contact form via Netlify Forms |
| gracias.html | Post-submission thank you page |

## Features

- Modular CSS split across six focused files
- Splide.js carousels for testimonials and service showcase
- Before/after gallery with lightbox viewer
- Netlify Forms contact integration
- Clinical FAQ content based on AAP/EFP 2017 standards
- sitemap.xml and robots.txt for SEO
- Client content guide included (Guia_Clinidental.docx)
- Fully responsive, mobile-first layout
- No frameworks — pure HTML, CSS, and JavaScript

## Tech Stack

| Layer | Technology |
|---|---|
| Structure | HTML5 (6 pages) |
| Styling | CSS3 modular (base, components, layout, themes, utilities, galeria) |
| Logic | Vanilla JavaScript (ES6+) |
| Carousels | Splide.js |
| Forms | Netlify Forms |
| SEO | sitemap.xml + robots.txt |
| Hosting | Cloudflare Pages |

## Project Structure

```
clinidental/
├── index.html
├── about.html
├── services.html
├── galeria.html
├── faq.html
├── contact.html
├── gracias.html
├── robots.txt
├── sitemap.xml
├── Guia_Clinidental.docx
├── css/
│   ├── base.css
│   ├── components.css
│   ├── layout.css
│   ├── themes.css
│   ├── utilities.css
│   └── galeria.css
├── js/
│   └── main.js
└── assets/
    ├── favicon/
    ├── img/
    └── models/
```

## Local Development

```bash
git clone https://github.com/alvaro-veloz/clinidental.git
cd clinidental
# Open index.html in any browser — no build step required
```

## Live Site

[clinidental.andinawebstudio.com](https://clinidental.andinawebstudio.com)

## License

MIT License. Built by [Andina Web Studio](https://andinawebstudio.com).
