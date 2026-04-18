// ─── VIEW ─────────────────────────────────────────────────────────────────────
// Responsible for all DOM creation, updates, and event binding.

class AppView {
  constructor(vm) {
    this.vm = vm;
    this._root = document.getElementById('app');
  }

  // ── Bootstrap ─────────────────────────────────────────────────────────────
  render() {
    this._root.innerHTML = '';
    this._root.appendChild(this._buildNavbar());
    this._root.appendChild(this._buildHero());
    this._root.appendChild(this._buildAbout());
    this._root.appendChild(this._buildWork());
    this._root.appendChild(this._buildExpertises());
    this._root.appendChild(this._buildBrands());
    this._root.appendChild(this._buildContact());
    this._root.appendChild(this._buildFooter());
    this._root.appendChild(this._buildCookieBanner());
    this._bindGlobal();
    this._initCarousel();
    this._initScrollAnimations();
  }

  // ── Navbar ─────────────────────────────────────────────────────────────────
  _buildNavbar() {
    const nav  = this.vm.getNavData();
    const el   = this._el('nav', { class: 'navbar', id: 'navbar' });
    const logo = this._el('a',   { class: 'nav-logo', href: '/' });
    logo.innerHTML = `<span class="logo-text">GETHYPED</span>`;

    // Desktop links
    const links = this._el('div', { class: 'nav-links' });
    nav.links.forEach(link => {
      const a = this._el('a', { class: 'nav-link', href: link.href });
      a.textContent = link.label;
      a.addEventListener('click', () => this.vm.closeMenu());
      links.appendChild(a);
    });

    const cta = this._el('a', { class: 'btn-results nav-cta', href: nav.cta.href });
    cta.innerHTML = `${nav.cta.label} <span class="flame">🔥</span>`;

    // Hamburger
    const burger = this._el('button', { class: 'hamburger', id: 'hamburger', 'aria-label': 'Menu' });
    burger.innerHTML = `<span></span><span></span><span></span>`;
    burger.addEventListener('click', () => this.vm.toggleMenu());

    // Mobile menu overlay
    const overlay = this._el('div', { class: 'mobile-menu', id: 'mobile-menu' });
    const mobileLinks = this._el('div', { class: 'mobile-links' });
    nav.links.forEach(link => {
      const a = this._el('a', { class: 'mobile-link', href: link.href });
      a.textContent = link.label;
      a.addEventListener('click', () => this.vm.closeMenu());
      mobileLinks.appendChild(a);
    });
    const mobileCta = this._el('a', { class: 'btn-results mobile-cta', href: nav.cta.href });
    mobileCta.innerHTML = `${nav.cta.label} <span class="flame">🔥</span>`;
    overlay.appendChild(mobileLinks);
    overlay.appendChild(mobileCta);

    el.appendChild(logo);
    el.appendChild(links);
    el.appendChild(cta);
    el.appendChild(burger);
    el.appendChild(overlay);

    // Subscribe
    this.vm.subscribe('menuOpen', open => {
      burger.classList.toggle('is-open', open);
      overlay.classList.toggle('is-open', open);
    });
    this.vm.subscribe('navbarSticky', sticky => {
      el.classList.toggle('scrolled', sticky);
    });
    this.vm.subscribe('navbarVisible', visible => {
      el.classList.toggle('nav-hidden', !visible);
    });

    return el;
  }

  // ── Hero ──────────────────────────────────────────────────────────────────
  _buildHero() {
    const d   = this.vm.getHeroData();
    const sec = this._el('section', { class: 'section-hero', id: 'hero' });

    // Heading
    const heading = this._el('h1', { class: 'hero-heading' });
    d.heading.forEach(line => {
      const span = this._el('span', { class: 'hero-line' });
      span.textContent = line;
      heading.appendChild(span);
    });

    // Sub
    const sub = this._el('p', { class: 'hero-sub' });
    sub.innerHTML = d.subtext.replace('\n', '<br>');

    // Stats carousel
    const carouselWrap = this._el('div', { class: 'carousel-wrap' });
    const track        = this._el('div', { class: 'carousel-track', id: 'carousel-track' });

    // Duplicate items for infinite loop
    const buildItem = (item, i) => {
      const card = this._el('div', { class: `carousel-card ${item.type}-card`, 'data-type': item.type });
      card.dataset.index = i;
      if (item.type === 'stat') {
        card.style.background = item.color;
        const val = this._el('span', { class: 'stat-value' });
        val.textContent = item.value;

        const footer = this._el('div', { class: 'stat-footer' });
        const label = this._el('span', { class: 'stat-label' });
        label.textContent = item.label || '';
        const divider = this._el('span', { class: 'stat-line' });

        footer.appendChild(label);
        footer.appendChild(divider);

        card.appendChild(val);
        card.appendChild(footer);
      } else {
        card.style.background = '#111';
        const img = this._el('img', { class: 'card-photo', src: item.src, alt: item.alt });
        img.onerror = () => {
          img.style.display = 'none';
          card.style.background = this._photoFallback(i);
        };
        const overlay = this._el('div', { class: 'photo-overlay' });
        overlay.textContent = item.alt || '';
        card.appendChild(img);
        card.appendChild(overlay);
      }

      // Touch / pointer interaction shake effect
      card.addEventListener('pointerdown', () => {
        card.classList.add('shake');
      });
      card.addEventListener('animationend', event => {
        if (event.animationName === 'card-shake') {
          card.classList.remove('shake');
        }
      });

      return card;
    };  

    // Build a fixed set of responsive cards
    d.stats.forEach((item, i) => {
      track.appendChild(buildItem(item, i));
    });

    carouselWrap.addEventListener('mouseenter', () => this.vm.pauseCarousel());
    carouselWrap.addEventListener('mouseleave', () => this.vm.resumeCarousel());
    carouselWrap.appendChild(track);

    sec.appendChild(heading);
    sec.appendChild(sub);
    sec.appendChild(carouselWrap);
    return sec;
  }

  _photoFallback(i) {
    const colors = ['#d4c5b8','#c8b9ac','#ddd0c5','#c0b2a8'];
    return colors[i % colors.length];
  }

  // ── About ─────────────────────────────────────────────────────────────────
  _buildAbout() {
    const d   = this.vm.getAboutData();
    const sec = this._el('section', { class: 'section-about reveal', id: 'about' });

    const statement = this._el('h2', { class: 'about-statement reveal' });
    statement.textContent = d.statement;

    const lower  = this._el('div', { class: 'about-lower reveal' });
    const photo  = this._el('div', { class: 'about-photo' });
    const img    = this._el('img', { src: d.photo, alt: 'team member', class: 'about-img' });
    img.onerror  = () => { photo.style.background = '#c8b0a0'; };
    img.onerror  = () => { 
      img.style.display = 'none';
      photo.style.background = '#c8b0a0'; 
    };
    photo.appendChild(img);

    const text   = this._el('div', { class: 'about-text' });
    const body   = this._el('p',   { class: 'about-body' });
    body.textContent = d.body;

    const cta    = this._el('a',   { class: 'btn-outline', href: d.cta.href });
    cta.innerHTML = `${d.cta.label} <span class="arrow-icon">→</span>`;

    const scrollBtn = this._el('button', { class: 'scroll-down-btn', 'aria-label': 'Scroll down' });
    scrollBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>`;
    scrollBtn.addEventListener('click', () => {
      document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
    });

    text.appendChild(body);
    text.appendChild(cta);
    lower.appendChild(photo);
    lower.appendChild(text);
    lower.appendChild(scrollBtn);

    sec.appendChild(statement);
    sec.appendChild(lower);
    return sec;
  }

  // ── Work ─────────────────────────────────────────────────────────────────
  _buildWork() {
    const d   = this.vm.getWorkData();
    const sec = this._el('section', { class: 'section-work reveal', id: 'work' });

    const left    = this._el('div', { class: 'work-left' });
    const heading = this._el('h2',  { class: 'work-heading' });
    heading.innerHTML = d.heading.replace('\n', '<br>');
    const sub = this._el('p', { class: 'work-sub' });
    sub.textContent = d.subtext;
    const cta = this._el('a', { class: 'btn-outline dark', href: d.cta.href });
    cta.innerHTML = `${d.cta.label} <span class="arrow-icon">→</span>`;

    left.appendChild(heading);
    left.appendChild(sub);
    left.appendChild(cta);

    const cards = this._el('div', { class: 'work-cards' });
    d.cards.forEach((card, i) => {
      const c   = this._el('div', { class: 'work-card' });
      c.style.setProperty('--border-color', card.border);
      c.style.setProperty('--offset', `${i * 40}px`);
      const img = this._el('img', { src: card.src, alt: card.alt });
      img.onerror = () => { 
        img.style.display = 'none';
        c.style.background = this._photoFallback(i); 
      };
      const arrowBtn = this._el('a', { class: 'card-arrow', href: '#work' });
      arrowBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>`;
      c.appendChild(img);
      c.appendChild(arrowBtn);
      cards.appendChild(c);
    });

    const container = this._el('div', { class: 'work-container' });
    container.appendChild(left);
    container.appendChild(cards);
    sec.appendChild(container);
    return sec;
  }

  // ── Expertises ────────────────────────────────────────────────────────────
  _buildExpertises() {
    const expertises = this.vm.getExpertisesData();
    const sec        = this._el('section', { class: 'section-expertises', id: 'expertises' });
    const container  = this._el('div', { class: 'expertises-container' });

    expertises.forEach((exp, i) => {
      const card = this._el('div', { class: 'expertise-card reveal', 'data-expertise-index': i });
      card.style.background = exp.bg;
      if (exp.bg === '#ffffff') card.classList.add('white-card');

      const tag = this._el('span', { class: 'expertise-tag' });
      tag.textContent = exp.tag;

      const num = this._el('span', { class: 'expertise-number' });
      num.textContent = exp.number;

      const title = this._el('h2', { class: 'expertise-title' });
      title.textContent = exp.title;

      const imgWrap = this._el('div', { class: 'expertise-img-wrap' });
      imgWrap.style.setProperty('--border-color', exp.imageBorder);
      const img = this._el('img', { src: exp.image, alt: exp.title, class: 'expertise-img' });
      img.onerror = () => {
        img.style.display = 'none';
        imgWrap.style.background = exp.imageBorder;
        imgWrap.style.opacity = '0.3';
      };
      imgWrap.appendChild(img);

      const lower    = this._el('div',  { class: 'expertise-lower' });
      const tagline  = this._el('h3',   { class: 'expertise-tagline' });
      tagline.textContent = exp.tagline;
      const body     = this._el('p',    { class: 'expertise-body' });
      body.textContent = exp.body;
      const cta      = this._el('a',    { class: 'btn-outline', href: '#expertises' });
      cta.innerHTML  = `${exp.cta} <span class="arrow-icon">→</span>`;
      if (exp.bg !== '#ffffff') cta.classList.add('dark');

      lower.appendChild(tagline);
      lower.appendChild(body);
      lower.appendChild(cta);

      card.appendChild(tag);
      card.appendChild(num);
      card.appendChild(title);
      card.appendChild(imgWrap);
      card.appendChild(lower);
      container.appendChild(card);
    });

    sec.appendChild(container);
    return sec;
  }

  // ── Brands ────────────────────────────────────────────────────────────────
  _buildBrands() {
    const d   = this.vm.getBrandsData();
    const sec = this._el('section', { class: 'section-brands reveal', id: 'brands' });

    const heading = this._el('h2', { class: 'brands-heading' });
    heading.innerHTML = d.heading.replace('\n', '<br>');

    const track = this._el('div', { class: 'brands-track' });
    const inner = this._el('div', { class: 'brands-inner' });

    // Duplicate for seamless loop
    const buildLogo = logo => {
      const card = this._el('div', { class: 'brand-card' });
      const text = this._el('span', { class: 'brand-name' });
      text.textContent = logo.name;
      text.style.color = logo.color;
      card.appendChild(text);
      return card;
    };

    [...d.logos, ...d.logos].forEach(logo => inner.appendChild(buildLogo(logo)));
    track.appendChild(inner);

    const divider = this._el('hr', { class: 'brands-divider' });

    sec.appendChild(heading);
    sec.appendChild(track);
    sec.appendChild(divider);
    return sec;
  }

  // ── Contact / CTA ────────────────────────────────────────────────────────
  _buildContact() {
    const d   = this.vm.getContactData();
    const sec = this._el('section', { class: 'section-contact', id: 'contact' });

    const inner   = this._el('div', { class: 'contact-inner' });
    const heading = this._el('h2',  { class: 'contact-heading' });
    heading.textContent = d.heading;

    const btns = this._el('div', { class: 'contact-btns' });
    const mail = this._el('a',   { class: 'btn-mail', href: d.email.href });
    mail.innerHTML = `${d.email.label} <span class="mail-icon">✉</span>`;
    const cta  = this._el('a',   { class: 'btn-results', href: d.cta.href });
    cta.innerHTML = `${d.cta.label} <span class="flame">🔥</span>`;
    btns.appendChild(mail);
    btns.appendChild(cta);

    // Rotating stamp
    const stamp = this._el('div', { class: 'stamp' });
    stamp.innerHTML = `
      <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <path id="circle" d="M 60,60 m -45,0 a 45,45 0 1,1 90,0 a 45,45 0 1,1 -90,0"/>
        </defs>
        <text font-size="11" font-family="Barlow, sans-serif" font-weight="700" letter-spacing="3" fill="#111">
          <textPath href="#circle">• GET HYPED • GET RESULTS • GET NOTICED</textPath>
        </text>
        <text x="60" y="54" text-anchor="middle" font-size="22" font-family="Barlow Condensed, sans-serif" font-weight="900" fill="#111">GH</text>
      </svg>`;

    inner.appendChild(heading);
    inner.appendChild(btns);
    sec.appendChild(inner);
    sec.appendChild(stamp);
    return sec;
  }

  // ── Footer ────────────────────────────────────────────────────────────────
  _buildFooter() {
    const d   = this.vm.getFooterData();
    const sec = this._el('footer', { class: 'footer', id: 'footer' });

    // Background diagonal shape handled by CSS ::before

    // Bottom logo
    const logoWrap = this._el('div', { class: 'footer-logo-wrap' });
    const logo     = this._el('div', { class: 'footer-logo' });
    logo.textContent = 'GETHYPED';
    logoWrap.appendChild(logo);

    const right   = this._el('div', { class: 'footer-right' });

    // Nav
    const nav   = this._el('div', { class: 'footer-nav' });
    d.links.forEach(label => {
      const pill = this._el('a', { class: 'footer-nav-pill', href: `#${label.toLowerCase()}` });
      pill.textContent = label;
      nav.appendChild(pill);
    });

    // Follow us
    const social = this._el('div', { class: 'footer-social' });
    const followLabel = this._el('span', { class: 'follow-label' });
    followLabel.textContent = 'Follow us';
    social.appendChild(followLabel);

    d.social.forEach(s => {
      const a   = this._el('a', { class: 'social-icon', href: s.href, 'aria-label': s.platform });
      a.innerHTML = this._socialSVG(s.platform);
      social.appendChild(a);
    });

    // Contact info
    const contact = this._el('div', { class: 'footer-contact' });
    contact.innerHTML = `
      <div class="footer-col">
        <strong>Contact</strong>
        <a href="mailto:${d.contact.email}">${d.contact.email}</a>
        <a href="tel:${d.contact.phone}">${d.contact.phone}</a>
      </div>
      <div class="footer-col">
        <strong>Adres</strong>
        <span>${d.address.street}</span>
        <span>${d.address.city}</span>
      </div>`;

    right.appendChild(nav);
    right.appendChild(social);

    const bottomBar = this._el('div', { class: 'footer-bottom' });
    bottomBar.innerHTML = `
      <span>${d.copy}</span>
      <span>${d.design}</span>
      <a href="#" class="privacy">${d.privacy}</a>`;

    sec.appendChild(logoWrap);
    sec.appendChild(right);
    sec.appendChild(contact);
    sec.appendChild(bottomBar);
    return sec;
  }

  // ── Global event bindings ─────────────────────────────────────────────────
  _bindGlobal() {
    window.addEventListener('scroll', () => this.vm.updateScroll(window.scrollY), { passive: true });

    // Close menu on outside click
    document.addEventListener('click', e => {
      const menu   = document.getElementById('mobile-menu');
      const burger = document.getElementById('hamburger');
      if (this.vm.menuOpen && !menu?.contains(e.target) && !burger?.contains(e.target)) {
        this.vm.closeMenu();
      }
    });
  }

  // ── Carousel init ─────────────────────────────────────────────────────────
  _initCarousel() {
    // No automatic infinite carousel animation for responsive hero cards.
    // The layout is now a responsive horizontal card row.
  }

  // ── Scroll reveal animations ──────────────────────────────────────────────
  _initScrollAnimations() {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    // Standard reveal animation for non-expertise elements
    document.querySelectorAll('.reveal:not([data-expertise-index])').forEach(el => io.observe(el));

    // Sequential reveal for expertise cards on scroll
    const expertiseCards = document.querySelectorAll('[data-expertise-index]');
    if (expertiseCards.length > 0) {
      let previousRevealed = 0;
      const handleExpertiseScroll = () => {
        const expertiseSection = document.getElementById('expertises');
        const sectionTop = expertiseSection.getBoundingClientRect().top;
        const cardHeight = expertiseCards[0]?.offsetHeight || 300;
        const cardsToShow = Math.max(1, Math.ceil(((window.innerHeight - sectionTop) / cardHeight)));
        const visibleCards = Math.min(cardsToShow, expertiseCards.length);
        
        if (visibleCards > previousRevealed) {
          for (let i = previousRevealed; i < visibleCards; i++) {
            expertiseCards[i].classList.add('revealed');
          }
          previousRevealed = visibleCards;
        }
      };
      
      window.addEventListener('scroll', handleExpertiseScroll, { passive: true });
      handleExpertiseScroll(); // Initial call
    }
  }

  // ── Helpers ───────────────────────────────────────────────────────────────
  _el(tag, attrs = {}) {
    const el = document.createElement(tag);
    Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
    return el;
  }

  _socialSVG(platform) {
    const icons = {
      linkedin:  `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>`,
      tiktok:    `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V9.05a8.24 8.24 0 0 0 4.83 1.56V7.17a4.85 4.85 0 0 1-1.06-.48z"/></svg>`,
      instagram: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>`,
      youtube:   `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.95C5.12 20 12 20 12 20s6.88 0 8.59-.47a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/></svg>`,
    };
    return icons[platform] || '';
  }

  // ── Cookie Banner ─────────────────────────────────────────────────────────
  _buildCookieBanner() {
    const cookies = this.vm.getCookieData();
    const prefs = this.vm.cookiePreferences;
    const banner = this._el('div', { class: 'cookie-banner', id: 'cookie-banner' });

    const inner = this._el('div', { class: 'cookie-inner' });

    // Header
    const header = this._el('div', { class: 'cookie-header' });
    const title = this._el('h3', { class: 'cookie-title' });
    title.textContent = cookies.title;
    header.appendChild(title);

    // Message
    const message = this._el('p', { class: 'cookie-message' });
    message.textContent = cookies.message;

    // Options container
    const optionsContainer = this._el('div', { class: 'cookie-options' });
    cookies.options.forEach(opt => {
      const optionWrap = this._el('div', { class: 'cookie-option' });
      
      const checkbox = this._el('input', { type: 'checkbox', class: 'cookie-checkbox', id: `cookie-${opt.id}` });
      checkbox.checked = prefs[opt.id];
      if (opt.disabled) checkbox.disabled = true;
      checkbox.addEventListener('change', () => this.vm.toggleCookieOption(opt.id));

      const labelWrap = this._el('label', { class: 'cookie-option-label', 'for': `cookie-${opt.id}` });
      const labelText = this._el('strong', {});
      labelText.textContent = opt.label;
      const desc = this._el('span', { class: 'cookie-option-desc' });
      desc.textContent = opt.description;

      labelWrap.appendChild(labelText);
      labelWrap.appendChild(desc);

      optionWrap.appendChild(checkbox);
      optionWrap.appendChild(labelWrap);
      optionsContainer.appendChild(optionWrap);
    });

    // Buttons
    const buttonGroup = this._el('div', { class: 'cookie-buttons' });

    const acceptAll = this._el('button', { class: 'cookie-btn cookie-btn-primary' });
    acceptAll.textContent = cookies.acceptAll;
    acceptAll.addEventListener('click', () => this.vm.acceptAllCookies());

    const rejectAll = this._el('button', { class: 'cookie-btn cookie-btn-secondary' });
    rejectAll.textContent = cookies.rejectAll;
    rejectAll.addEventListener('click', () => this.vm.rejectAllCookies());

    const save = this._el('button', { class: 'cookie-btn cookie-btn-primary' });
    save.textContent = cookies.save;
    save.addEventListener('click', () => this.vm.saveCookiePreferences());

    buttonGroup.appendChild(rejectAll);
    buttonGroup.appendChild(acceptAll);
    buttonGroup.appendChild(save);

    inner.appendChild(header);
    inner.appendChild(message);
    inner.appendChild(optionsContainer);
    inner.appendChild(buttonGroup);
    banner.appendChild(inner);

    // Subscribe to banner visibility
    this.vm.subscribe('cookieBannerOpen', open => {
      banner.classList.toggle('visible', open);
    });

    return banner;
  }
}
