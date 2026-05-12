# Mase Consulting Group — Hero Section Build Instructions
## For Gemini — Home page hero only

---

## WHAT YOU ARE BUILDING

The hero section of the Mase Consulting Group homepage.
Full viewport height. Dark background. Left-aligned content.
Premium, editorial, authoritative. No clutter.

This is a standalone HTML file for now — just the hero section
and navigation. We will add more sections later.

---

## FILE OUTPUT

Single file: index.html
Include everything inline — CSS in <style> tags, JS in <script> tags.
Load Plus Jakarta Sans from Google Fonts.

---

## NAVIGATION

Position: fixed top, full width, z-index 100
Height: 72px
Initial background: transparent
Scrolled background: #F5F4F0 with bottom border 0.5px solid #E8E6E0
Transition: background 300ms cubic-bezier(0.25, 0.1, 0.25, 1)

Left: Logo — use mase_logo_v1.svg (warm white version on dark)
— when scrolled switch to mase_logo_v2_light.svg (charcoal version)
— logo width: 160px
— logo switches via JS class toggle on scroll

Centre: Navigation links
— About / Services / Industries / Insights / Contact
— Font: Plus Jakarta Sans, 11px, weight 300, letter-spacing 0.12em, uppercase
— Colour: #F5F4F0 initially, #1C1C1E when scrolled
— Hover colour: #1D6A5A always
— No underline by default

Right: CTA button "Talk to us"
— Initially: border 1px solid rgba(245,244,240,0.4), 
  text #F5F4F0, background transparent
— When scrolled: background #1C1C1E, text #F5F4F0, no border
— Padding: 12px 28px
— Font: Plus Jakarta Sans 11px weight 300 letter-spacing 0.15em uppercase
— No border radius

Mobile (below 768px):
— Hide nav links and CTA
— Show hamburger icon (three lines, #F5F4F0)
— On click: full screen overlay, background #1C1C1E
— Links stacked vertically, centred
— Close button top right

---

## HERO SECTION

Position: relative
Height: 100vh minimum
Background: #1C1C1E
Display: flex, align items centre, padding-top 72px (nav height)

Layout: left-aligned content block
— Max width of content: 800px
— Left padding: max(64px, 8vw)
— Right padding: max(64px, 8vw)

---

### ELEMENT 01 — Section label

Text: "TECHNOLOGY & DIGITAL TRANSFORMATION ADVISORY"
Font: Plus Jakarta Sans 10px weight 300
Letter-spacing: 0.2em
Text transform: uppercase
Colour: #1D6A5A
Margin bottom: 24px

Animation: fade in, opacity 0 → 1, duration 500ms, delay 0ms

---

### ELEMENT 02 — Headline

Text: "Technology and digital transformation advisory
for organisations that can't afford to get it wrong."

Font: Plus Jakarta Sans
Size: clamp(36px, 5vw, 64px)
Weight: 500
Line height: 1.1
Letter spacing: -0.02em
Colour: #F5F4F0
Max width: 760px
Margin bottom: 32px

Animation: each word wraps in a <span>
Each span animates: translateY(20px) opacity(0) → translateY(0) opacity(1)
Duration per word: 500ms
Easing: cubic-bezier(0.25, 0.1, 0.25, 1)
Stagger: 35ms between each word
Start delay: 200ms after label appears

---

### ELEMENT 03 — Subtext

Text: "We help technology and transformation leaders in Southern Africa
navigate complex programmes — with the governance rigour, delivery
accountability, and senior engagement that turns strategy into
lasting outcomes."

Font: Plus Jakarta Sans 18px weight 300
Line height: 1.7
Colour: #888780
Max width: 520px
Margin bottom: 48px

Animation: fade up — translateY(16px) opacity(0) → translateY(0) opacity(1)
Duration: 600ms
Easing: cubic-bezier(0.25, 0.1, 0.25, 1)
Delay: starts after headline animation completes

---

### ELEMENT 04 — CTAs

Two buttons side by side, gap 16px

Button 1 — Primary: "Talk to us"
Background: #F5F4F0
Text: #1C1C1E
Font: Plus Jakarta Sans 11px weight 300 letter-spacing 0.15em uppercase
Padding: 14px 32px
No border radius
Hover: background #1D6A5A, text #F5F4F0
Transition: 200ms cubic-bezier(0.25, 0.1, 0.25, 1)

Button 2 — Outline: "Our services →"
Background: transparent
Text: #F5F4F0
Border: 1px solid rgba(245,244,240,0.35)
Font: same as button 1
Padding: 14px 32px
No border radius
Hover: border-color #F5F4F0
Transition: 200ms cubic-bezier(0.25, 0.1, 0.25, 1)

Animation: fade up — same as subtext
Delay: 100ms after subtext appears

---

### ELEMENT 05 — Teal rule (bottom of hero)

Position: absolute bottom 0 left 0
Width: 100%
Height: 1px
Background: #1D6A5A

Animation: width draws from 0% to 100%, left to right
Duration: 800ms
Easing: cubic-bezier(0.4, 0, 0.2, 1)
Delay: starts after CTAs appear

---

### ELEMENT 06 — Scroll indicator (optional but premium)

Position: absolute bottom 32px right max(64px, 8vw)
Text: "SCROLL" in Plus Jakarta Sans 9px weight 300 letter-spacing 0.2em #888780
Small downward arrow beneath text
Slow fade pulse animation — opacity 0.4 → 1 → 0.4, 2s loop
Disappears on scroll past 100px

---

## RIGHT SIDE VISUAL (optional — desktop only)

On desktop (above 1024px) the hero can have a right-side element.
Choose ONE of these options:

Option A — Abstract geometric element:
Position: absolute right 0 top 0, height 100%, width 40%
A large version of the logo symbol (symbol only, no text)
Scale: approximately 400px, centred in the right half
Opacity: 0.06
Colour: #F5F4F0

Option B — Clean empty space:
Leave the right side empty — let the headline dominate.
This is the more confident choice.

Recommendation: Option B — the headline is strong enough
to carry the hero alone. Empty space signals confidence.

---

## RESPONSIVE BEHAVIOUR

Desktop (1024px+):
— Full layout as described above
— Max content width 800px
— Logo symbol optional on right

Tablet (768px - 1023px):
— Same layout, reduced padding
— Headline size: clamp(32px, 4vw, 48px)
— No right-side symbol

Mobile (below 768px):
— Full width content, padding 24px
— Headline: 32px
— Subtext: 16px
— CTAs stack vertically, full width
— Hamburger nav

---

## JAVASCRIPT REQUIRED

```javascript
// 1. Nav scroll behaviour
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  const scrolled = window.scrollY > 80;
  nav.classList.toggle('scrolled', scrolled);
});

// 2. Headline word split animation
// On DOMContentLoaded:
// - Find the headline element
// - Split text by spaces into word spans
// - Apply staggered animation delays
// - Trigger animations after 200ms

// 3. IntersectionObserver for scroll animations
// (not needed for hero but set up the pattern here
// so it's ready for subsequent sections)
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.animate-on-scroll').forEach(el => {
  observer.observe(el);
});

// 4. Teal rule draw animation
// Trigger after page load + 1200ms delay
// CSS: width transition from 0 to 100%

// 5. Scroll indicator hide on scroll
window.addEventListener('scroll', () => {
  const indicator = document.querySelector('.scroll-indicator');
  if (indicator) {
    indicator.style.opacity = window.scrollY > 100 ? '0' : '1';
  }
});
```

---

## QUALITY CHECK

Before delivering verify:
- [ ] Hero fills exactly 100vh
- [ ] Navigation is fixed and transparent initially
- [ ] Navigation background transitions correctly on scroll
- [ ] Headline word animation fires on load with correct stagger
- [ ] Subtext and CTAs fade in after headline
- [ ] Teal rule draws across the bottom
- [ ] Primary button hover turns teal
- [ ] Outline button hover shows full white border
- [ ] Mobile hamburger opens full-screen overlay
- [ ] No layout shift on load
- [ ] Font renders as Plus Jakarta Sans — confirm in DevTools
- [ ] No console errors
- [ ] Looks correct at 375px, 768px, 1280px, 1920px

---

*Mase Consulting Group — Hero Section Build Instructions v1.0*
