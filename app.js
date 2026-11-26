const BASE_PATH = location.hostname.endsWith('github.io') ? '/ching-wong-portfolio' : ''

const routes = {
  '/': home,
  '/projects': projects,
  '/project-01': () => projectDetail(1),
  '/project-02': () => projectDetail(2),
  '/project-03': () => projectDetail(3),
  '/project-04': () => projectDetail(4),
  '/project-05': () => projectDetail(5),
  '/project-06': () => projectDetail(6),
  '/photography': photography,
  '/about': about,
  '/contact': contact,
}

const projectData = [
  { title: 'TERMINO.GMBH', type: 'Identity development', cover: '/assets/termino/tape.jpg', route: '/project-06' },
  { title: 'Terracotta Army Museum', type: 'Identity', cover: '/assets/project-one/qin-transparent.png', coverClass: 'logo-cover', route: '/project-01' },
  { title: 'Music Graphics', type: 'Graphic design', cover: '/assets/projects/project-03.png', route: '/project-03' },
  { title: 'Solely', type: 'Brand identity', cover: '/assets/projects/project-02-upscaled.png', route: '/project-02' },
  { title: 'Root Theory', type: 'Brand identity', cover: '/assets/projects/project-04-uniform.png', route: '/project-04' },
  { title: 'Koya Nomono', type: 'Packaging development', cover: '/assets/projects/project-05.png', route: '/project-05' },
]

let storyObserver
let carouselFrame
let carouselTimer
let nameScrambleTimer
let nameScrambleFrame
let currentLanguage = localStorage.getItem('site-language') || 'en'

const interfaceText = {
  en: { nav: ['Home','Projects','Photography','About','Contact'], home: ['Projects','Photography','About','Contact'], photography: 'Photography', about: 'About', contact: 'Contact', allProjects: 'All projects', scroll: 'or scroll to see creative process', openMenu: 'Open navigation', closeMenu: 'Close navigation', closeViewer: 'Close' },
  de: { nav: ['Start','Projekte','Fotografie','Über mich','Kontakt'], home: ['Projekte','Fotografie','Über mich','Kontakt'], photography: 'Fotografie', about: 'Über mich', contact: 'Kontakt', allProjects: 'Alle Projekte', scroll: 'oder scrollen, um den kreativen Prozess zu sehen', openMenu: 'Navigation öffnen', closeMenu: 'Navigation schließen', closeViewer: 'Schließen' },
  zh: { nav: ['首頁','項目','攝影','關於','聯絡'], home: ['項目','攝影','關於','聯絡'], photography: '攝影', about: '關於', contact: '聯絡', allProjects: '全部項目', scroll: '向下滾動查看創作過程', openMenu: '開啟選單', closeMenu: '關閉選單', closeViewer: '關閉' },
}

function shell(content) {
  return `<main class="page reveal">
    <header class="site-header"><a class="brand" href="/" data-link>ching.wong</a><button class="menu-button" aria-label="Open navigation">=</button></header>
    ${content}
  </main>${menu()}`
}

function menu() {
  return `${endPanel()}<aside class="menu" aria-hidden="true">
    <nav class="menu-links" aria-label="Main navigation">
      <a href="/" data-link>Home</a><a href="/projects" data-link>Projects</a><a href="/photography" data-link>Photography</a><a href="/about" data-link>About</a><a href="/contact" data-link>Contact</a>
    </nav>
    <div class="language-selector" aria-label="Language selector"><button type="button" data-language="zh">中文</button><button type="button" data-language="en">English</button><button type="button" data-language="de">Deutsch</button></div>
  </aside>`
}

function endPanel() {
  return `<footer class="end-panel"><div><span lang="zh-Hant">婧</span><a href="https://instagram.com/elephant.3488014" target="_blank" rel="noopener">@elephant.3488014</a></div></footer>`
}

function home() {
  return `<main class="page home reveal">
    <section class="home-hero">
      <h1 class="display" data-scramble="ching.wong" aria-label="ching.wong">ching.wong</h1><p class="home-mark">婧</p>
      <nav class="home-nav" aria-label="Main navigation"><a href="/projects" data-link><span>Projects</span></a><a href="/photography" data-link><span>Photography</span></a><a href="/about" data-link><span>About</span></a><a href="/contact" data-link><span>Contact</span></a></nav>
      <div class="hero-scroll-cue" aria-hidden="true"><i></i><span>or scroll to see creative process</span></div>
    </section>
    <section class="scrapbook" aria-labelledby="scrapbook-title">
      <header class="scrapbook-header"><h2 id="scrapbook-title">瑣碎事情。</h2></header>
      <div class="scrapbook-canvas">
        <figure class="scrap scrap-01"><a href="/assets/fragments/glitch-figures.jpg" target="_blank" rel="noopener"><img src="/assets/fragments/glitch-figures.jpg" alt="Layered typographic experiment with repeated figures"></a></figure>
        <figure class="scrap scrap-02"><a href="/assets/fragments/your-arms.png" target="_blank" rel="noopener"><img src="/assets/fragments/your-arms.png" alt="Pink typographic and illustrated composition"></a></figure>
        <figure class="scrap scrap-03"><a href="/assets/fragments/love.jpg" target="_blank" rel="noopener"><img src="/assets/fragments/love.jpg" alt="Monochrome halftone love composition"></a></figure>
        <figure class="scrap scrap-04"><a href="/assets/fragments/bukowski.jpg" target="_blank" rel="noopener"><img src="/assets/fragments/bukowski.jpg" alt="Experimental typographic composition inspired by Bukowski"></a></figure>
        <figure class="scrap scrap-05"><img src="/assets/fragments/radio-green.png" alt="Generative radio graphic experiment"></figure>
        <figure class="scrap scrap-06"><a href="/assets/fragments/radio-green.png" target="_blank" rel="noopener"><img src="/assets/fragments/radio-green.png" alt="Green and purple generative radio graphic"></a></figure>
        <figure class="scrap scrap-07"><a href="/assets/fragments/radio-pink.png" target="_blank" rel="noopener"><img src="/assets/fragments/radio-pink.png" alt="Pink and purple generative radio graphic"></a></figure>
        <figure class="scrap scrap-08"><a href="/assets/fragments/telltest.png" target="_blank" rel="noopener"><img src="/assets/fragments/telltest.png" alt="Blurred typographic window study"></a></figure>
        <figure class="scrap scrap-09"><a href="/assets/fragments/yellow-city.png" target="_blank" rel="noopener"><img src="/assets/fragments/yellow-city.png" alt="Yellow and black city print study"></a></figure>
        <figure class="scrap scrap-10"><a href="/assets/fragments/yellow-car.png" target="_blank" rel="noopener"><img src="/assets/fragments/yellow-car.png" alt="Yellow and black car print study"></a></figure>
        <figure class="scrap scrap-11"><a href="/assets/fragments/fool-01.png" target="_blank" rel="noopener"><img src="/assets/fragments/fool-01.png" alt="Red and black graphic design study"></a></figure>
        <figure class="scrap scrap-12"><a href="/assets/fragments/fool-02.png" target="_blank" rel="noopener"><img src="/assets/fragments/fool-02.png" alt="Experimental red and black typographic composition"></a></figure>
        <figure class="scrap scrap-13"><a href="/assets/fragments/fool-03.png" target="_blank" rel="noopener"><img src="/assets/fragments/fool-03.png" alt="Red and black graphic poster composition"></a></figure>
      </div>
    </section>
    ${endPanel()}
  </main>`
}

function projects() {
  return `<main class="project-index-page reveal"><button class="menu-button" aria-label="Open navigation" aria-expanded="false">=</button><a class="gallery-brand" href="/" data-link>ching.wong</a><section class="project-index" aria-label="Selected projects" tabindex="0">${projectData.map(p => `<article class="project-index-row ${p.coverClass || ''}"><a href="${p.route}" data-link aria-label="Open ${p.title}"><img src="${p.cover}" alt="${p.title} project preview"><span class="project-index-meta"><strong>${p.title}</strong><small>${p.type}</small></span></a></article>`).join('')}</section></main>${menu()}`
}

function projectDetail(number) {
  if (number === 1) {
    return `<main class="project-one-page reveal"><button class="menu-button" aria-label="Open navigation" aria-expanded="false">=</button><header class="project-one-nav"><a class="reference-brand" href="/" data-link>ching.wong</a><a class="project-one-back" href="/projects" data-link>All projects</a></header><section class="project-one-horizontal"><img src="/assets/project-one/logo-horizontal.png" alt="Horizontal Terracotta Army Museum logo system"></section><section class="project-one-split"><img src="/assets/project-one/logo-vertical.png" alt="Vertical Terracotta Army Museum logo system"><div class="project-one-copy"><p class="project-meta">Visual identity / Exhibition graphics</p><p>A contemporary visual system for the Terracotta Army Museum.</p></div></section><section class="project-one-concept"><div class="project-one-concept-images"><img src="/assets/project-one/hieroglyphics.png" alt="Historical development of the Qin character"><img src="/assets/project-one/qin-black.png" alt="Large Qin character mark in white on black"></div><div class="project-one-concept-copy"><p>From ancient script to contemporary form. The identity reinterprets the historical Qin character (秦) through geometric reduction, retaining its vertical structure and cultural reference.</p></div></section><section class="project-one-ticket"><img src="/assets/project-one/ticket-composition.png" alt="Terracotta Army Museum ticket and exhibition composition"></section></main>${menu()}`
  }
  if (number === 2) {
    return `<main class="project-two-page reveal"><button class="menu-button" aria-label="Open navigation" aria-expanded="false">=</button><header class="project-two-nav"><a class="reference-brand" href="/" data-link>ching.wong</a><a class="project-two-back" href="/projects" data-link>All projects</a></header><section class="project-two-logo"><img src="/assets/project-two/logo-transparent.png" alt="Solely hand-drawn logo"></section><section class="project-two-mockup"><img src="/assets/project-two/mockup.png" alt="Solely campaign posters in an urban mockup"></section><section class="project-two-opening"><img src="/assets/project-two/opening-party.png" alt="Solely opening party poster"><div class="project-two-copy"><p class="project-meta">Rubber heels / Hand-drawn typography</p><p>The handwritten letterforms bring a playful kick to the identity, giving Solely a distinctive voice that feels as expressive and unconventional as the footwear itself.</p></div></section><section class="project-two-boxes"><img src="/assets/project-two/boxes-transparent.png" alt="Two Solely shoe packaging designs"></section><section class="project-two-interiors"><div class="project-two-interior-images"><img src="/assets/project-two/interior-01.png" alt="Solely retail interior with colourful sculptural shoes"><img src="/assets/project-two/interior-02.png" alt="Solely retail interior with candy-coloured displays"></div><div class="project-two-interior-copy"><p class="project-meta">Retail / Display</p><p>Different shoe silhouettes, one signature heel.</p></div></section><section class="project-two-web"><img src="/assets/project-two/web-transparent.png" alt="Solely website shown on laptop and mobile"></section></main>${menu()}`
  }
  if (number === 3) {
    return `<main class="music-project-page reveal"><button class="menu-button" aria-label="Open navigation" aria-expanded="false">=</button><header class="music-project-nav"><a class="reference-brand" href="/" data-link>ching.wong</a><a class="music-project-back" href="/projects" data-link>All projects</a></header><section class="music-project-intro"><h1>Music Graphics</h1><div><p class="project-meta">Album artwork / Graphic design</p><p>Two distinct visual interpretations, developed across physical and printed formats.</p></div></section><section class="album-project album-project-chinese"><img src="/assets/music-graphics/chinese-cd-transparent.png" alt="Chinese black and white CD graphic design"><div class="album-copy"><h2>你啊你啊</h2><p class="project-meta">Monochrome photography / Light and shadow</p><p>An intimate visual interpretation of 你啊你啊, extended from CD artwork into the urban landscape.</p></div><img class="album-application" src="/assets/music-graphics/chinese-poster.png" alt="Chinese album artwork installed on a street shutter"></section><section class="album-project album-project-notquite"><img src="/assets/music-graphics/notquitehalf-cd-transparent.png" alt="Notquitehalf CD graphic design"><div class="album-copy"><h2>Notquitehalf</h2><p class="project-meta">High-contrast colour / Distorted imagery</p><p>A more abrasive visual language built around purple and orange.</p><div class="web-player" aria-label="Song preview player"><button class="audio-play" type="button" aria-label="Play song preview">Play</button><div class="audio-info"><span>Track preview</span><small>Audio placeholder</small></div><div class="audio-track"><i></i></div><time>00:00</time></div></div></section></main>${menu()}`
  }
  if (number === 4) {
    return `<main class="root-project-page reveal"><button class="menu-button" aria-label="Open navigation" aria-expanded="false">=</button><header class="root-project-nav"><a class="reference-brand" href="/" data-link>ching.wong</a><a class="root-project-back" href="/projects" data-link>All projects</a></header><section class="root-project-intro"><h1>Root Theory</h1><div><p class="project-meta">Brand identity / Hair care</p><p>Root Theory brings traditional Chinese herbal knowledge into a contemporary hair-care concept, starting at the root.</p></div></section><section class="root-bus-stop"><img src="/assets/root-theory/bus-stop.png" alt="Root Theory brand campaign at a bus stop"></section><section class="root-logo-section"><div class="root-logo-mark"><img src="/assets/root-theory/logo-seal-transparent.png" alt="Root Theory Chinese seal stamp logo"></div><div class="root-logo-copy"><p><span lang="zh-Hant">本草為根</span> / Botanicals as the root. A traditional Chinese seal reinterpreted as a brand mark, with irregular ink impressions referencing the tactile character of stamped seals.</p></div></section><section class="root-full-image root-product-image"><img src="/assets/root-theory/brand-overview.png" alt="Root Theory botanical shampoo blocks"></section><section class="root-uniform-pair square-pair"><img src="/assets/root-theory/apron.png" alt="Root Theory folded uniform apron"><img src="/assets/root-theory/uniform-people-new.png" alt="Root Theory staff wearing the uniform system"></section><section class="root-full-image"><img src="/assets/root-theory/storefront.png" alt="Root Theory storefront"></section><section class="root-stationery"><div class="stationery-cell"><img src="/assets/root-theory/business-cards-transparent.png" alt="Root Theory business cards"></div><div class="stationery-cell"><img src="/assets/root-theory/receipt-transparent.png" alt="Root Theory receipt"></div></section><section class="root-poster-row" aria-label="Three Root Theory botanical campaign posters"><div class="poster-crop poster-crop-one"><img src="/assets/root-theory/poster-row-new-source.png" alt="Camellia campaign poster"></div><div class="poster-crop poster-crop-two"><img src="/assets/root-theory/poster-row-new-source.png" alt="Root Theory hair-care campaign poster"></div><div class="poster-crop poster-crop-three"><img src="/assets/root-theory/poster-row-new-source.png" alt="Fo-ti campaign poster"></div></section></main>${menu()}`
  }
  if (number === 5) {
    return `<main class="packaging-project-page reveal"><button class="menu-button" aria-label="Open navigation" aria-expanded="false">=</button><header class="packaging-project-nav"><a class="reference-brand" href="/" data-link>ching.wong</a><a class="packaging-project-back" href="/projects" data-link>All projects</a></header><section class="packaging-project-intro"><h1>Koya Nomono</h1><div><p class="project-meta">Homeware / Packaging</p><p>A unified packaging system across ceramics, textiles and wooden objects, using restrained typography and natural material tones.</p></div></section><section class="packaging-images"><img src="/assets/koya-nomono/packaging-01.png" alt="Koya Nomono ceramic homeware packaging"><img src="/assets/koya-nomono/packaging-02.png" alt="Koya Nomono textile and rug packaging"><img src="/assets/koya-nomono/packaging-03.png" alt="Koya Nomono wooden board and chopstick packaging"></section></main>${menu()}`
  }
  if (number === 6) {
    return `<main class="termino-project-page reveal"><button class="menu-button" aria-label="Open navigation" aria-expanded="false">=</button><header class="termino-project-nav"><a class="reference-brand" href="/" data-link>ching.wong</a><a class="termino-project-back" href="/projects" data-link>All projects</a></header><section class="termino-project-intro"><h1>TERMINO.GMBH</h1><div><p>Furniture / Identity / Digital and physical applications.</p></div></section><section class="termino-instagram"><img src="/assets/termino/instagram.png" alt="TERMINO Instagram account and content system"><div class="termino-instagram-copy"><p class="project-meta">Digital communication / Social content / Web</p><p>Working within TERMINO’s existing identity, I developed and adapted visual assets across its communication channels.</p></div></section><section class="termino-web"><img src="/assets/termino/web-home.png" alt="TERMINO website home page"><div class="termino-web-pair square-pair"><img src="/assets/termino/web-furniture.png" alt="TERMINO furniture page"><img src="/assets/termino/web-interview.png" alt="TERMINO editorial interview page"></div><img src="/assets/termino/web-studio.png" alt="TERMINO studio page"><div class="termino-web-pair square-pair"><img src="/assets/termino/web-cta.png" alt="TERMINO website call-to-action system"><img src="/assets/termino/web-nav.png" alt="TERMINO website navigation system"></div></section><section class="termino-print"><div class="termino-physical square-pair"><img src="/assets/termino/tape.jpg" alt="TERMINO branded packing tape"><img src="/assets/termino/tshirt.jpg" alt="TERMINO branded T-shirts and hang tags"></div><div class="termino-caption"><p class="project-meta">Branded tape / Garments / Print</p><p>Extending the existing identity into everyday brand touchpoints.</p></div><div class="termino-project-image"><img src="/assets/termino/design-market.jpg" alt="TERMINO Design Market graphic"></div></section><section class="termino-magazine square-pair"><img src="/assets/termino/magazine-01.png" alt="TERMINO Magazine Domestic Attitudes graphic"><img src="/assets/termino/magazine-02.png" alt="TERMINO Magazine Domestic Attitudes editorial graphic"></section><section class="termino-process"><div class="termino-component-grid"><img src="/assets/termino/process/tape-kraft.png" alt="Kraft packing tape production specification"><img src="/assets/termino/process/tape-transparent.png" alt="Transparent packing tape production specification"><img src="/assets/termino/process/box-components.png" alt="TERMINO box graphics component specification"><div class="termino-component-copy"><p>Packaging components / Artwork preparation / Production specifications.</p></div></div><div class="termino-project-image termino-artboard"><img src="/assets/termino/cover.png" alt="TERMINO logo development artboards"><p>Typographic exploration / Early identity development.</p></div></section></main>${menu()}`
  }
  return `<main class="empty-project-page reveal" aria-label="Empty project canvas"><button class="menu-button" aria-label="Open navigation" aria-expanded="false">=</button><a class="reference-brand" href="/" data-link>ching.wong</a></main>${menu()}`
}

function photography() {
  const order = [13,1,18,7,24,3,20,11,5,22,9,16,2,25,12,6,19,4,15,23,8,17,10,21,14]
  const sizes = ['seven','five','four','four','four','five','seven','four','four','four','seven','five','four','four','four','five','seven','four','four','four','seven','five','four','four','four']
  const photos = order.map((number, index) => {
    const file = String(number).padStart(2, '0')
    return `<a class="photo-item photo-item--${sizes[index]}" href="/assets/photography/photo-${file}.jpg" target="_blank" rel="noopener"><img src="/assets/photography/photo-${file}.jpg" alt="Photography study ${String(index + 1).padStart(2, '0')}" loading="lazy"></a>`
  }).join('')
  return shell(`<section class="photo-intro"><h1>Photography</h1></section><section class="photo-gallery" aria-label="Photography collection">${photos}</section>`)
}

function about() {
  return `<main class="reference-page reveal"><button class="menu-button" aria-label="Open navigation" aria-expanded="false">=</button><div class="reference-column"><a class="reference-brand" href="/" data-link>ching.wong</a><h1 class="reference-title">About</h1><div class="reference-body"><p>Communication Design</p><p>Hong Kong / Berlin</p><p>Concept Driven</p><p>Observe, then create</p><p>Curious…</p><a class="cv-link" href="/assets/Ching-Wong-CV.pdf" target="_blank" rel="noopener">curriculum vitae</a></div></div></main>${menu()}`
}

function contact() {
  return `<main class="reference-page contact-page reveal"><button class="menu-button" aria-label="Open navigation" aria-expanded="false">=</button><div class="reference-column"><a class="reference-brand" href="/" data-link>ching.wong</a><h1 class="reference-title">Contact</h1><div class="contact-details"><a href="mailto:doradorawong0412@gmail.com">doradorawong0412@gmail.com</a><span>+49 015214372828 / +852 6799 3155</span><a href="https://instagram.com/elephant.3488014" target="_blank" rel="noopener">@elephant.3488014</a></div><div class="contact-conversation"><p class="message incoming">Send me a message</p><form class="message-form outgoing" aria-label="Send Ching a message"><label>Name<input name="name" autocomplete="name" required></label><label>Email<input name="email" type="email" autocomplete="email" required></label><label>Message<textarea name="message" rows="3" required></textarea></label><button type="submit">Send</button></form></div></div></main>${menu()}`
}

function normalize(path) {
  const routePath = BASE_PATH && path.startsWith(BASE_PATH) ? path.slice(BASE_PATH.length) || '/' : path
  return routePath !== '/' ? routePath.replace(/\/$/, '') : routePath
}

function applyBasePath() {
  if (!BASE_PATH) return
  document.querySelectorAll('[href^="/"], [src^="/"]').forEach(element => {
    const attribute = element.hasAttribute('href') ? 'href' : 'src'
    const value = element.getAttribute(attribute)
    if (value && !value.startsWith(BASE_PATH + '/')) element.setAttribute(attribute, `${BASE_PATH}${value}`)
  })
}

function render() {
  const path = normalize(location.pathname)
  const view = routes[path] || projects
  document.body.dataset.page = path === '/' ? 'home' : path.slice(1)
  document.getElementById('app').innerHTML = view()
  applyBasePath()
  document.title = path === '/' ? 'ching.wong' : `${path.slice(1).replaceAll('-', ' ')} — ching.wong`
  bind()
  applyLanguage()
  initStory()
  initProjectCarousel()
  initNameScramble()
  window.scrollTo(0, 0)
}

function applyLanguage() {
  const text = interfaceText[currentLanguage] || interfaceText.en
  document.documentElement.lang = currentLanguage === 'zh' ? 'zh-Hant' : currentLanguage
  document.querySelectorAll('.menu-links a').forEach((link, index) => { link.textContent = text.nav[index] })
  document.querySelectorAll('.home-nav a span').forEach((label, index) => { label.textContent = text.home[index] })
  document.querySelector('.photo-intro h1')?.replaceChildren(text.photography)
  const title = document.querySelector('.reference-title')
  if (title) title.textContent = document.body.dataset.page === 'about' ? text.about : text.contact
  document.querySelectorAll('.project-one-back, .project-two-back, .music-project-back, .root-project-back, .packaging-project-back, .termino-project-back').forEach(link => { link.textContent = text.allProjects })
  const scrollLabel = document.querySelector('.hero-scroll-cue span')
  if (scrollLabel) scrollLabel.textContent = text.scroll
  const menuButton = document.querySelector('.menu-button')
  if (menuButton) menuButton.setAttribute('aria-label', document.body.classList.contains('menu-open') ? text.closeMenu : text.openMenu)
  const closeButton = document.querySelector('.image-viewer-close')
  if (closeButton) { closeButton.textContent = text.closeViewer; closeButton.setAttribute('aria-label', text.closeViewer) }
  document.querySelectorAll('[data-language]').forEach(button => {
    const active = button.dataset.language === currentLanguage
    button.classList.toggle('is-active', active)
    button.setAttribute('aria-pressed', String(active))
  })
}

function initProjectCarousel() {
  cancelAnimationFrame(carouselFrame)
  clearInterval(carouselTimer)
  const carousel = document.querySelector('.project-index')
  if (!carousel || matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const originals = [...carousel.children]
  originals.forEach(item => {
    const clone = item.cloneNode(true)
    clone.setAttribute('aria-hidden', 'true')
    clone.querySelector('a')?.setAttribute('tabindex', '-1')
    carousel.appendChild(clone)
  })
  let pausedUntil = 0
  const pauseBriefly = () => { pausedUntil = performance.now() + 1100 }
  carousel.addEventListener('pointerdown', pauseBriefly)
  carousel.addEventListener('touchstart', pauseBriefly, { passive: true })
  carousel.addEventListener('wheel', event => {
    if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
      event.preventDefault()
      carousel.scrollLeft += event.deltaY * 1.8
    }
    pauseBriefly()
  }, { passive: false })
  carouselTimer = setInterval(() => {
    if (performance.now() > pausedUntil) carousel.scrollLeft += .8
    const loopWidth = carousel.scrollWidth / 2
    if (carousel.scrollLeft >= loopWidth) carousel.scrollLeft -= loopWidth
  }, 24)
}

function initNameScramble() {
  clearInterval(nameScrambleTimer)
  cancelAnimationFrame(nameScrambleFrame)
  const element = document.querySelector('[data-scramble]')
  if (!element) return
  const target = element.dataset.scramble
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    element.textContent = target
    return
  }
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&?'
  const scramble = () => {
    const started = performance.now()
    const duration = 920
    const tick = now => {
      const progress = Math.min((now - started) / duration, 1)
      const resolved = Math.floor(progress * target.length)
      element.textContent = [...target].map((character, index) => {
        if (character === '.') return '.'
        if (index < resolved) return character
        return characters[Math.floor(Math.random() * characters.length)]
      }).join('')
      if (progress < 1) nameScrambleFrame = requestAnimationFrame(tick)
      else element.textContent = target
    }
    nameScrambleFrame = requestAnimationFrame(tick)
  }
  scramble()
  nameScrambleTimer = setInterval(scramble, 3600)
}

function bind() {
  document.querySelectorAll('[data-link]').forEach(link => link.addEventListener('click', event => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    event.preventDefault(); history.pushState({}, '', link.getAttribute('href')); closeMenu(); render()
  }))
  document.querySelectorAll('.menu-button').forEach(button => button.addEventListener('click', toggleMenu))
  document.querySelectorAll('[data-language]').forEach(button => button.addEventListener('click', () => {
    currentLanguage = button.dataset.language
    localStorage.setItem('site-language', currentLanguage)
    applyLanguage()
  }))
  document.querySelectorAll('.scrap a, .photo-item').forEach(link => link.addEventListener('click', event => {
    event.preventDefault()
    openImageViewer(link.getAttribute('href'), link.querySelector('img')?.alt || '')
  }))
  document.querySelectorAll('.audio-play').forEach(button => button.addEventListener('click', () => {
    const player = button.closest('.web-player')
    const playing = player.classList.toggle('is-playing')
    button.textContent = playing ? 'Pause' : 'Play'
    button.setAttribute('aria-label', playing ? 'Pause song preview' : 'Play song preview')
  }))
  document.querySelectorAll('.message-form').forEach(form => form.addEventListener('submit', event => {
    event.preventDefault()
    const data = new FormData(form)
    const subject = encodeURIComponent(`Portfolio enquiry from ${data.get('name')}`)
    const body = encodeURIComponent(`${data.get('message')}\n\nFrom: ${data.get('name')}\nEmail: ${data.get('email')}`)
    location.href = `mailto:doradorawong0412@gmail.com?subject=${subject}&body=${body}`
  }))
}

function openImageViewer(src, alt) {
  let viewer = document.querySelector('.image-viewer')
  if (!viewer) {
    viewer = document.createElement('div')
    viewer.className = 'image-viewer'
    viewer.setAttribute('role', 'dialog')
    viewer.setAttribute('aria-modal', 'true')
    viewer.setAttribute('aria-label', 'Image viewer')
    viewer.innerHTML = `<button class="image-viewer-close" type="button" aria-label="Close image viewer">Close</button><img alt="">`
    viewer.addEventListener('click', event => {
      if (event.target === viewer || event.target.closest('.image-viewer-close')) closeImageViewer()
    })
    document.body.appendChild(viewer)
  }
  viewer.querySelector('img').src = src
  viewer.querySelector('img').alt = alt
  viewer.classList.add('is-open')
  document.body.classList.add('viewer-open')
  viewer.querySelector('.image-viewer-close').focus()
  if (!document.body.dataset.viewerKeyboard) {
    document.body.dataset.viewerKeyboard = 'true'
    document.addEventListener('keydown', event => { if (event.key === 'Escape') closeImageViewer() })
  }
}

function closeImageViewer() {
  document.querySelector('.image-viewer')?.classList.remove('is-open')
  document.body.classList.remove('viewer-open')
}

function initStory() {
  storyObserver?.disconnect()
  const sections = [...document.querySelectorAll('.story-section')]
  const images = [...document.querySelectorAll('.story-image')]
  if (!sections.length || !images.length) return
  storyObserver = new IntersectionObserver(entries => {
    const visible = entries.filter(entry => entry.isIntersecting).sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0]
    if (!visible) return
    const index = Number(visible.target.dataset.story)
    images.forEach((image, i) => image.classList.toggle('is-active', i === index))
  }, { threshold: [0.35, 0.55, 0.75] })
  sections.forEach(section => storyObserver.observe(section))
}

function initCursor() {
  if (!matchMedia('(pointer: fine)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const cursor = document.createElement('div')
  cursor.className = 'ink-cursor'
  cursor.setAttribute('aria-hidden', 'true')
  const dots = Array.from({ length: 1 }, (_, i) => {
    const dot = document.createElement('i')
    dot.className = 'cursor-dot'
    dot.style.setProperty('--dot', i)
    dot.style.setProperty('--size', `${12 - i * .7}px`)
    dot.style.opacity = String(1 - i * .1)
    cursor.appendChild(dot)
    return { element: dot, x: -40, y: -40 }
  })
  document.body.appendChild(cursor)
  let targetX = -40
  let targetY = -40
  addEventListener('pointermove', event => {
    targetX = event.clientX
    targetY = event.clientY
    cursor.classList.add('is-visible')
  })
  addEventListener('pointerleave', () => cursor.classList.remove('is-visible'))
  document.addEventListener('pointerover', event => cursor.classList.toggle('is-link', Boolean(event.target.closest('a, button'))))
  const animate = () => {
    let leaderX = targetX
    let leaderY = targetY
    dots.forEach((dot, index) => {
      const ease = index === 0 ? .34 : .25
      dot.x += (leaderX - dot.x) * ease
      dot.y += (leaderY - dot.y) * ease
      dot.element.style.transform = `translate3d(${dot.x}px, ${dot.y}px, 0) translate(-50%, -50%)`
      leaderX = dot.x
      leaderY = dot.y
    })
    requestAnimationFrame(animate)
  }
  animate()
}
function toggleMenu() { const menu = document.querySelector('.menu'); menu.classList.contains('open') ? closeMenu() : openMenu() }
function openMenu() { const menu = document.querySelector('.menu'); const button = document.querySelector('.menu-button'); menu.classList.add('open'); menu.setAttribute('aria-hidden','false'); button?.setAttribute('aria-expanded','true'); document.body.classList.add('menu-open'); applyLanguage() }
function closeMenu() { const menu = document.querySelector('.menu'); const button = document.querySelector('.menu-button'); if (!menu) return; menu.classList.remove('open'); menu.setAttribute('aria-hidden','true'); button?.setAttribute('aria-expanded','false'); document.body.classList.remove('menu-open'); applyLanguage() }
window.addEventListener('popstate', render)
window.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu() })
document.addEventListener('pointerdown', event => {
  const menu = document.querySelector('.menu')
  const button = document.querySelector('.menu-button')
  if (!menu?.classList.contains('open')) return
  if (menu.contains(event.target) || button?.contains(event.target)) return
  closeMenu()
})
render()
initCursor()
