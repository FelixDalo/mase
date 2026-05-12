---
version: 1.0
name: Mase Consulting Group
description: A precision-driven editorial design system for a boutique 
  technology and digital transformation advisory firm in Southern Africa. 
  Authority without distance. Senior without coldness.

colors:
  charcoal: "#1C1C1E"
  deep-graphite: "#2C2C2E"
  teal: "#1D6A5A"
  deep-teal: "#14503F"
  teal-tint: "#E8F4F0"
  warm-white: "#F5F4F0"
  stone: "#E8E6E0"
  mid-grey: "#888780"
  light-grey: "#B4B2A9"
  white: "#FFFFFF"

typography:
  display-xl:
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif"
    fontSize: "clamp(40px, 5vw, 72px)"
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: -0.02em
  display-lg:
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif"
    fontSize: "clamp(32px, 4vw, 56px)"
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: -0.02em
  display-md:
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif"
    fontSize: "clamp(24px, 3vw, 36px)"
    fontWeight: 500
    lineHeight: 1.25
    letterSpacing: -0.01em
  body-lg:
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif"
    fontSize: 18px
    fontWeight: 300
    lineHeight: 1.7
    letterSpacing: 0
  body-md:
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif"
    fontSize: 16px
    fontWeight: 300
    lineHeight: 1.7
    letterSpacing: 0
  body-sm:
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif"
    fontSize: 14px
    fontWeight: 300
    lineHeight: 1.65
    letterSpacing: 0
  label:
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif"
    fontSize: 11px
    fontWeight: 300
    lineHeight: 1
    letterSpacing: 0.18em
    textTransform: uppercase
  caption:
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif"
    fontSize: 13px
    fontWeight: 300
    lineHeight: 1.55
    letterSpacing: 0

rounded:
  none: 0px

spacing:
  xs: 4px
  sm: 8px
  md: 16px
  base: 24px
  lg: 48px
  xl: 80px
  2xl: 120px
  section: 160px

animation:
  duration-fast: 200ms
  duration-base: 400ms
  duration-slow: 600ms
  duration-enter: 800ms
  easing-standard: "cubic-bezier(0.25, 0.1, 0.25, 1)"
  easing-precise: "cubic-bezier(0.4, 0, 0.2, 1)"
  easing-exit: "cubic-bezier(0.4, 0, 1, 1)"

components:
  button-primary:
    backgroundColor: "#1C1C1E"
    textColor: "#F5F4F0"
    typography: label
    rounded: none
    padding: "14px 32px"
    border: none
    hover:
      backgroundColor: "#1D6A5A"
      transition: "background-color 200ms cubic-bezier(0.25, 0.1, 0.25, 1)"

  button-outline:
    backgroundColor: transparent
    textColor: "#F5F4F0"
    typography: label
    rounded: none
    padding: "14px 32px"
    border: "1px solid rgba(245,244,240,0.3)"
    hover:
      borderColor: "#F5F4F0"
      transition: "all 200ms cubic-bezier(0.25, 0.1, 0.25, 1)"

  button-ghost:
    backgroundColor: transparent
    textColor: "#1D6A5A"
    typography: label
    padding: "0"
    border: none
    textDecoration: underline
    textUnderlineOffset: 4px

  nav:
    backgroundColor: "transparent"
    scrolledBackground: "#F5F4F0"
    height: 72px
    borderBottom: "0.5px solid #E8E6E0"
    logoWidth: 160px
    linkColor: "#1C1C1E"
    linkHoverColor: "#1D6A5A"
    sticky: true

  card-service:
    backgroundColor: "#FFFFFF"
    borderLeft: "2px solid #1D6A5A"
    padding: 32px
    rounded: none
    hover:
      backgroundColor: "#F5F4F0"
      borderLeftColor: "#1C1C1E"

  input-field:
    backgroundColor: transparent
    textColor: "#1C1C1E"
    border: "0.5px solid #B4B2A9"
    borderFocus: "0.5px solid #1D6A5A"
    rounded: none
    padding: "14px 16px"

  teal-rule:
    height: 1px
    backgroundColor: "#1D6A5A"

  stat-block:
    number:
      fontSize: "clamp(36px, 5vw, 64px)"
      fontWeight: 500
      color: "#1D6A5A"
    label:
      fontSize: 14px
      fontWeight: 300
      color: "#888780"
      marginTop: 8px
---
