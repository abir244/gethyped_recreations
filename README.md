# Get Hyped – Homepage Recreation

A pixel-faithful recreation of [gethyped.nl](https://www.gethyped.nl/) built with vanilla JavaScript using the **MVVM (Model–View–ViewModel)** architectural pattern.

---

## 📁 Project Structure

```
gethyped-recreation/
├── index.html                        ← Entry point & script loader
├── README.md                         ← You are here
└── assets/
    ├── css/
    │   └── styles.css                ← All styles (responsive + animations)
    ├── js/
    │   ├── app.js                    ← Bootstrap: wires Model → ViewModel → View
    │   ├── model/
    │   │   └── data.js               ← Pure data (nav, hero, expertises, brands…)
    │   ├── viewmodel/
    │   │   └── AppViewModel.js       ← State management & business logic
    │   └── view/
    │       └── AppView.js            ← DOM rendering & event binding
    └── images/
        └── (place your own photos here — see below)
```

---

## 🏗️ Architecture: MVVM

| Layer         | File                            | Responsibility                                                       |
|---------------|---------------------------------|----------------------------------------------------------------------|
| **Model**     | `assets/js/model/data.js`       | Static content data — nav links, hero copy, expertise cards, brands  |
| **ViewModel** | `assets/js/viewmodel/AppViewModel.js` | Observable state (menu open/closed, navbar sticky, carousel offset), pub/sub notifications |
| **View**      | `assets/js/view/AppView.js`     | Builds the DOM from ViewModel data; subscribes to state changes      |
| **Bootstrap** | `assets/js/app.js`              | Instantiates `AppViewModel(AppData)` then `AppView(vm).render()`     |

The ViewModel and View communicate through a lightweight **publish/subscribe** system — the View subscribes to specific state keys (`menuOpen`, `navbarSticky`) and the ViewModel calls `_notify(key)` when state changes. No external libraries required.

---

## 🎨 Sections Recreated

| # | Section             | Notes                                                             |
|---|---------------------|-------------------------------------------------------------------|
| 1 | **Navbar**          | Fixed, transparent → frosted-glass on scroll; mobile hamburger   |
| 2 | **Hero**            | Large heading + sub-copy + infinite auto-scroll stats carousel   |
| 3 | **About**           | Bold statement + photo + body text + scroll-down button          |
| 4 | **Work / Portfolio**| Large heading + stacked tilted image cards with colored borders  |
| 5 | **Expertises**      | Three full-width cards: Social Strategy, Content Creation, Activation |
| 6 | **Brands**          | "These brands got hyped" — CSS infinite marquee logo row         |
| 7 | **Contact CTA**     | "Let's Get Hyped!" + mail + results buttons + rotating stamp     |
| 8 | **Footer**          | Logo, nav pills, social icons, contact/address, bottom bar       |

---

## 📱 Mobile / Responsive

- **Hamburger menu** — three-line toggle animates to ✕; opens full-screen overlay with large nav links
- Fully responsive at **480 px**, **768 px**, and desktop breakpoints
- All sections reflow correctly on mobile

---

## ⚡ Features

- **Infinite carousel** — requestAnimationFrame loop, pauses on hover
- **Scroll animations** — IntersectionObserver fade-in / slide-up on all major sections
- **Rotating stamp** — CSS `@keyframes` on the "GET HYPED • GET RESULTS" badge
- **CSS-only brand marquee** — seamless infinite scroll via duplicated list + `animation`
- **Sticky navbar** — transparent by default, gets frosted glass + shadow after 10 px scroll
- **Body scroll lock** — `overflow: hidden` applied while mobile menu is open

---

## 🖼️ Adding Images

The site looks best with real photos. Drop your images into `assets/images/` and update the `src` paths in `assets/js/model/data.js`:

```js
// Hero carousel photos
{ type: 'photo', src: 'assets/images/hero1.jpg', alt: 'influencer' },

// About photo
photo: 'assets/images/about-influencer.jpg',

// Work cards
{ src: 'assets/images/work1.jpg', alt: 'project 1', border: '#e8461e' },

// Expertise images
image: 'assets/images/chess.jpg',      // Social strategy
image: 'assets/images/event.jpg',      // Content creation
image: 'assets/images/lamp.jpg',       // Activation
```

If an image fails to load, the card falls back to a matching solid color — so the layout never breaks.

---

## 🚀 Running Locally

No build step needed — it's plain HTML + CSS + JS.

**Option 1 – VS Code Live Server:**
```
Right-click index.html → Open with Live Server
```

**Option 2 – Python:**
```bash
cd gethyped-recreation
python -m http.server 5500
# Open http://localhost:5500
```

**Option 3 – Node.js (npx):**
```bash
cd gethyped-recreation
npx serve .
```

> ⚠️ Open via a server (not `file://`) so fonts and relative asset paths load correctly.

---

## 🛠️ Tech Stack

| Tool              | Version  | Purpose                        |
|-------------------|----------|--------------------------------|
| HTML5             | —        | Markup                         |
| CSS3              | —        | Styles, animations, responsive |
| Vanilla JS        | ES2020+  | MVVM logic, DOM, events        |
| Google Fonts      | CDN      | Barlow + Barlow Condensed      |

No frameworks. No bundlers. No dependencies.

---

## 📋 Evaluation Checklist

- [x] Desktop layout matches original screenshots
- [x] Mobile layout & hamburger menu work correctly
- [x] Navbar sticky behavior on scroll
- [x] Hero infinite stats carousel
- [x] Three expertise cards (white, pink, teal) with numbered layout
- [x] Brand logo marquee scroll
- [x] Rotating stamp SVG
- [x] Contact CTA section with diagonal background
- [x] Footer with social icons, nav pills, and contact info
- [x] Scroll reveal animations
- [x] MVVM architecture enforced

---

*Built as part of the Junior MERN Developer hiring task for DeveloperLook.*
