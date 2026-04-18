// ─── VIEWMODEL ───────────────────────────────────────────────────────────────
// Manages all application state and exposes it to the View layer.

class AppViewModel {
  constructor(data) {
    this.data = data;

    // Observable state
    this._state = {
      menuOpen:       false,
      scrollY:        0,
      lastScrollY:    0,
      navbarSticky:   false,
      navbarVisible:  true,
      carouselOffset: 0,
      carouselPaused: false,
      cookieBannerOpen: !this._hasCookieConsent(),
      cookiePreferences: this._loadCookiePreferences(),
    };

    // Subscribers map: stateKey → [callbacks]
    this._subscribers = {};

    // Carousel animation handle
    this._carouselRAF = null;
    this._carouselLastTime = null;
    this._carouselSpeed = 0.6; // px per ms (slowed down)
  }

  // ── Pub/Sub ────────────────────────────────────────────────────────────────
  subscribe(key, callback) {
    if (!this._subscribers[key]) this._subscribers[key] = [];
    this._subscribers[key].push(callback);
  }

  _notify(key) {
    const subs = this._subscribers[key] || [];
    subs.forEach(cb => cb(this._state[key]));
  }

  // ── State getters/setters ──────────────────────────────────────────────────
  get menuOpen()           { return this._state.menuOpen;           }
  get scrollY()            { return this._state.scrollY;            }
  get navbarSticky()       { return this._state.navbarSticky;       }
  get navbarVisible()      { return this._state.navbarVisible;      }
  get carouselOffset()     { return this._state.carouselOffset;     }
  get cookieBannerOpen()   { return this._state.cookieBannerOpen;   }
  get cookiePreferences()  { return this._state.cookiePreferences;  }

  toggleMenu() {
    this._state.menuOpen = !this._state.menuOpen;
    this._notify('menuOpen');
    // Lock/unlock body scroll
    document.body.style.overflow = this._state.menuOpen ? 'hidden' : '';
  }

  closeMenu() {
    if (!this._state.menuOpen) return;
    this._state.menuOpen = false;
    this._notify('menuOpen');
    document.body.style.overflow = '';
  }

  updateScroll(y) {
    this._state.scrollY = y;
    const sticky = y > 10;
    if (sticky !== this._state.navbarSticky) {
      this._state.navbarSticky = sticky;
      this._notify('navbarSticky');
    }

    // Detect scroll direction and hide navbar on scroll down
    const scrollingDown = y > this._state.lastScrollY;
    const scrollThreshold = 100; // Don't hide until scrolled past threshold
    let shouldBeVisible = true;

    if (scrollingDown && y > scrollThreshold) {
      shouldBeVisible = false;
    }

    if (shouldBeVisible !== this._state.navbarVisible) {
      this._state.navbarVisible = shouldBeVisible;
      this._notify('navbarVisible');
    }

    this._state.lastScrollY = y;
  }

  // ── Carousel (infinite auto-scroll) ──────────────────────────────────────
  startCarousel(trackEl, totalWidth) {
    this._trackEl    = trackEl;
    this._totalWidth = totalWidth;

    const step = (timestamp) => {
      if (!this._state.carouselPaused) {
        if (this._carouselLastTime !== null) {
          const delta = timestamp - this._carouselLastTime;
          this._state.carouselOffset += this._carouselSpeed * delta;
          if (this._state.carouselOffset >= this._totalWidth / 2) {
            this._state.carouselOffset = 0;
          }
          this._trackEl.style.transform =
            `translateX(-${this._state.carouselOffset}px)`;
        }
        this._carouselLastTime = timestamp;
      } else {
        this._carouselLastTime = null;
      }
      this._carouselRAF = requestAnimationFrame(step);
    };
    this._carouselRAF = requestAnimationFrame(step);
  }

  pauseCarousel()  { this._state.carouselPaused = true;  }
  resumeCarousel() { this._state.carouselPaused = false; }

  // ── Cookie Management ──────────────────────────────────────────────────────
  _hasCookieConsent() {
    return localStorage.getItem('gethyped_cookie_consent') !== null;
  }

  _loadCookiePreferences() {
    const saved = localStorage.getItem('gethyped_cookie_consent');
    if (saved) {
      return JSON.parse(saved);
    }
    // Return default preferences
    return {
      essential: true,
      analytics: false,
      marketing: false,
    };
  }

  toggleCookieOption(optionId) {
    if (optionId === 'essential') return; // Essential cannot be toggled
    this._state.cookiePreferences[optionId] = !this._state.cookiePreferences[optionId];
    this._notify('cookiePreferences');
  }

  acceptAllCookies() {
    this._state.cookiePreferences = {
      essential: true,
      analytics: true,
      marketing: true,
    };
    this._saveCookieConsent();
    this._closeCookieBanner();
  }

  rejectAllCookies() {
    this._state.cookiePreferences = {
      essential: true,
      analytics: false,
      marketing: false,
    };
    this._saveCookieConsent();
    this._closeCookieBanner();
  }

  saveCookiePreferences() {
    this._saveCookieConsent();
    this._closeCookieBanner();
  }

  _saveCookieConsent() {
    localStorage.setItem('gethyped_cookie_consent', JSON.stringify(this._state.cookiePreferences));
    this._notify('cookiePreferences');
  }

  _closeCookieBanner() {
    this._state.cookieBannerOpen = false;
    this._notify('cookieBannerOpen');
  }

  // ── Brand logo carousel (CSS-driven) ─────────────────────────────────────
  // Nothing needed here – pure CSS animation

  // ── Computed helpers ──────────────────────────────────────────────────────
  getNavData()        { return this.data.nav;        }
  getHeroData()       { return this.data.hero;       }
  getAboutData()      { return this.data.about;      }
  getWorkData()       { return this.data.work;       }
  getExpertisesData() { return this.data.expertises; }
  getBrandsData()     { return this.data.brands;     }
  getContactData()    { return this.data.contact;    }
  getFooterData()     { return this.data.footer;     }
  getCookieData()     { return this.data.cookies;    }
}
