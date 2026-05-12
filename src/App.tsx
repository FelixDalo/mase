import { useEffect, useRef, useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';

const fadeUpBase = {
  opacity: 0,
  transform: 'translateY(16px)',
  animation: 'fadeUp 600ms var(--easing-standard) forwards',
} as const;

const brandLine = 'Boutique advisory. Executive-level thinking. Business outcomes';

function AnimatedWords({ text, breakAfter }: { text: string; breakAfter?: number }) {
  const words = text.split(' ');

  return (
    <>
      {words.map((word, index) => (
        <span key={`${word}-${index}`}>
          <span
            style={{
              display: 'inline-block',
              transform: 'translateY(20px)',
              opacity: 0,
              animation: 'fadeUpWord 500ms cubic-bezier(0.25, 0.1, 0.25, 1) forwards',
              animationDelay: `${200 + index * 35}ms`,
            }}
          >
            {word}
          </span>
          {index < words.length - 1 && ' '}
          {breakAfter === index && <br />}
        </span>
      ))}
    </>
  );
}

function CharacterScrubText({ text, className = '' }: { text: string; className?: string }) {
  const textRef = useRef<HTMLSpanElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const updateProgress = () => {
      if (!textRef.current) {
        return;
      }

      const rect = textRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight || 1;
      const start = viewportHeight * 0.92;
      const end = viewportHeight * 0.38;
      const nextProgress = Math.min(Math.max((start - rect.top) / (start - end), 0), 1);

      setProgress(nextProgress);
    };

    const requestUpdate = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(updateProgress);
    };

    requestUpdate();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
    };
  }, []);

  return (
    <span ref={textRef} className={`character-scrub-text ${className}`} aria-label={text}>
      {text.split(' ').map((word, wordIndex) => {
        const priorCharacterCount = text
          .split(' ')
          .slice(0, wordIndex)
          .join(' ').length + (wordIndex > 0 ? 1 : 0);

        return (
          <span className="character-scrub-word" aria-hidden="true" key={`${word}-${wordIndex}`}>
            {Array.from(word).map((character, characterIndex) => {
              const index = priorCharacterCount + characterIndex;
              const characterProgress = Math.min(Math.max((progress - index * 0.006) * 1.65, 0), 1);

              return (
                <span
                  className="character-scrub-letter"
                  key={`${character}-${characterIndex}`}
                  style={{
                    opacity: characterProgress,
                    transform: `translateY(${(1 - characterProgress) * 34}px)`,
                  }}
                >
                  {character}
                </span>
              );
            })}
            {wordIndex < text.split(' ').length - 1 && <span className="character-scrub-space"> </span>}
          </span>
        );
      })}
    </span>
  );
}

function BackToHome() {
  return (
    <div className="back-to-home" style={{ textAlign: 'center', padding: '40px 0', background: 'var(--deep-graphite)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <Link
        to="/"
        style={{
          display: 'inline-flex',
          padding: '12px 24px',
          background: 'transparent',
          color: 'var(--warm-white)',
          border: '1px solid var(--mid-grey)',
          textDecoration: 'none',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          fontSize: '12px',
          transition: 'all 0.3s ease',
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.borderColor = 'var(--warm-white)';
          e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.borderColor = 'var(--mid-grey)';
          e.currentTarget.style.background = 'transparent';
        }}
      >
        &larr; Back to Variations
      </Link>
    </div>
  );
}

function BrandStatement({ className = '' }: { className?: string }) {
  return (
    <section className={`brand-statement ${className}`}>
      <CharacterScrubText text={brandLine} />
    </section>
  );
}

function ScrollExpandingVideo({ src }: { src: string }) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mediaFullyExpanded, setMediaFullyExpanded] = useState(false);
  const [touchStartY, setTouchStartY] = useState(0);
  const [isCompactViewport, setIsCompactViewport] = useState(false);
  const progressRef = useRef(0);
  const expandedRef = useRef(false);
  const touchStartYRef = useRef(0);

  useEffect(() => {
    progressRef.current = scrollProgress;
  }, [scrollProgress]);

  useEffect(() => {
    expandedRef.current = mediaFullyExpanded;
  }, [mediaFullyExpanded]);

  useEffect(() => {
    touchStartYRef.current = touchStartY;
  }, [touchStartY]);

  useEffect(() => {
    setScrollProgress(0);
    setMediaFullyExpanded(false);
    window.scrollTo(0, 0);
  }, [src]);

  useEffect(() => {
    const checkViewport = () => {
      setIsCompactViewport(window.innerWidth < 768);
    };

    checkViewport();
    window.addEventListener('resize', checkViewport);
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  useEffect(() => {
    const updateProgress = (nextProgress: number) => {
      const clampedProgress = Math.min(Math.max(nextProgress, 0), 1);
      progressRef.current = clampedProgress;
      setScrollProgress(clampedProgress);

      if (clampedProgress >= 1) {
        expandedRef.current = true;
        setMediaFullyExpanded(true);
      }
    };

    const handleWheel = (event: globalThis.WheelEvent) => {
      if (expandedRef.current && event.deltaY < 0 && window.scrollY <= 5) {
        expandedRef.current = false;
        setMediaFullyExpanded(false);
        event.preventDefault();
        return;
      }

      if (!expandedRef.current) {
        event.preventDefault();
        updateProgress(progressRef.current + event.deltaY * 0.0009);
      }
    };

    const handleTouchStart = (event: globalThis.TouchEvent) => {
      setTouchStartY(event.touches[0].clientY);
    };

    const handleTouchMove = (event: globalThis.TouchEvent) => {
      if (!touchStartYRef.current) {
        return;
      }

      const touchY = event.touches[0].clientY;
      const deltaY = touchStartYRef.current - touchY;

      if (expandedRef.current && deltaY < -20 && window.scrollY <= 5) {
        expandedRef.current = false;
        setMediaFullyExpanded(false);
        event.preventDefault();
        return;
      }

      if (!expandedRef.current) {
        event.preventDefault();
        updateProgress(progressRef.current + deltaY * (deltaY < 0 ? 0.008 : 0.005));
        setTouchStartY(touchY);
      }
    };

    const handleTouchEnd = () => {
      setTouchStartY(0);
    };

    const handleScroll = () => {
      if (!expandedRef.current && window.scrollY !== 0) {
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <motion.div
      className="v3-video-expansion"
      initial={{ opacity: 0, y: 40 }}
      animate={{
        opacity: 1,
        y: 0,
        width: `calc(100% + ${scrollProgress * (isCompactViewport ? 8 : 16)}vw)`,
        height: `calc(${isCompactViewport ? '44vh' : '50vh'} + ${scrollProgress * (isCompactViewport ? 28 : 34)}vh)`,
        marginLeft: `-${scrollProgress * (isCompactViewport ? 4 : 8)}vw`,
      }}
      transition={{
        opacity: { duration: 0.8, delay: 0.72, ease: [0.4, 0, 0.2, 1] },
        y: { duration: 0.8, delay: 0.72, ease: [0.4, 0, 0.2, 1] },
        width: { duration: 0.08 },
        height: { duration: 0.08 },
        marginLeft: { duration: 0.08 },
      }}
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        className="v3-video-expansion-media"
      >
        <source src={src} type="video/webm" />
      </video>
      <motion.div
        className="v3-video-expansion-overlay"
        animate={{ opacity: 0.42 - scrollProgress * 0.24 }}
        transition={{ duration: 0.12 }}
      />
      <motion.div
        className="v3-video-frame-statement"
        initial={{ opacity: 0, x: '-50%', y: '-42%' }}
        animate={{ opacity: mediaFullyExpanded ? 1 : 0, x: '-50%', y: mediaFullyExpanded ? '-50%' : '-42%' }}
        transition={{ duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <CharacterScrubText text={brandLine} />
      </motion.div>
    </motion.div>
  );
}

function Version1() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <section className="next-section-placeholder" id="about">
          <p className="v1-brand-line">
            <CharacterScrubText text={brandLine} />
          </p>
        </section>
      </main>
      <BackToHome />
    </>
  );
}

function Version2() {
  const stats = [
    { value: '10+', label: 'years experience' },
    { value: '250+', label: 'successful projects' },
    { value: '40%', label: 'avg. growth' },
  ];

  return (
    <div className="version2-page" style={{ position: 'relative', width: '100vw', minHeight: '100vh', background: 'var(--charcoal)', color: 'var(--warm-white)', overflowX: 'hidden' }}>
      <Navigation />

      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100vh', zIndex: 0, opacity: 0, animation: 'fadeIn 700ms var(--easing-standard) forwards' }}>
        <img
          src="/Images/pexels-edmond-dantes-8549944.jpg"
          alt="African Professionals"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(29, 106, 90, 0.9) 0%, rgba(28, 28, 30, 0.4) 50%, rgba(28, 28, 30, 0.8) 100%)',
            mixBlendMode: 'multiply',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to right, rgba(28, 28, 30, 0.82), transparent 70%)',
          }}
        />
      </div>

      <main className="version2-main" style={{ position: 'relative', zIndex: 10, minHeight: '100vh', display: 'flex', alignItems: 'stretch', padding: '120px max(64px, 8vw) 60px' }}>
        <div className="version2-grid" style={{ width: '100%', maxWidth: '1440px', display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 0.8fr)', gap: '48px', margin: '0 auto' }}>
          <div className="version2-left" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', minHeight: 'calc(100vh - 180px)' }}>
            <div className="version2-stats" style={{ ...fadeUpBase, animationDelay: '250ms', display: 'flex', gap: '40px', marginBottom: '44px', flexWrap: 'wrap' }}>
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div style={{ fontSize: '32px', fontWeight: 500, marginBottom: '8px', color: 'var(--warm-white)' }}>{stat.value}</div>
                  <div style={{ fontSize: '11px', fontWeight: 300, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--mid-grey)' }}>{stat.label}</div>
                </div>
              ))}
            </div>

            <h1 className="hero-headline" style={{ textTransform: 'uppercase', maxWidth: '800px', marginBottom: '30px', lineHeight: '1.1' }}>
              <AnimatedWords text="WHERE STRATEGY MEETS DELIVERY." breakAfter={1} />
            </h1>
          </div>

          <div className="version2-right" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'flex-end', minHeight: 'calc(100vh - 180px)' }}>
            <p className="version2-copy" style={{ ...fadeUpBase, animationDelay: '520ms', width: '332px', maxWidth: '100%', textAlign: 'right', margin: '0 0 40px', color: '#f5f4f0', fontSize: '18px', fontWeight: 300, lineHeight: 1.7 }}>
              We work with executives and transformation leaders across Africa to turn technology strategy into measurable business outcomes.
            </p>
            <div style={{ ...fadeUpBase, animationDelay: '640ms', display: 'flex', gap: '16px' }}>
              <a href="#services" className="nav-cta">What we do &rarr;</a>
            </div>
          </div>
        </div>
      </main>

      <section className="next-section-placeholder" id="about">
        <p className="v1-brand-line">
          <CharacterScrubText text={brandLine} />
        </p>
      </section>

      <BackToHome />
    </div>
  );
}

function Version3() {
  return (
    <div style={{ position: 'relative', width: '100vw', minHeight: '100vh', background: 'var(--charcoal)', color: 'var(--warm-white)', overflowX: 'hidden' }}>
      <Navigation />

      <main className="v3-hero-shell" style={{ padding: '132px max(64px, 8vw) 0' }}>
        <div className="v3-hero-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 0.6fr)', gap: '40px', alignItems: 'end', marginBottom: '40px' }}>
          <div className="v3-heading-column" style={{ paddingRight: '20px' }}>
            <div className="hero-section-label" style={{ opacity: 1, animation: 'fadeIn 500ms var(--easing-standard) forwards', marginBottom: '24px' }}>
              <span style={{ width: '6px', height: '6px', background: 'var(--mid-grey)', borderRadius: '0' }}></span>
              TECHNOLOGY & DIGITAL TRANSFORMATION ADVISORY
            </div>
            <h1 className="hero-headline" style={{ fontSize: 'clamp(40px, 4vw, 56px)', lineHeight: 1.15, margin: 0, textTransform: 'none', letterSpacing: '0', color: 'var(--warm-white)', maxWidth: '100%' }}>
              <AnimatedWords text="Where strategy meets delivery." breakAfter={1} />
            </h1>
          </div>

          <div className="v3-copy-column" style={{ paddingBottom: '12px', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            <p className="hero-subtext v3-copy" style={{ ...fadeUpBase, animationDelay: '520ms', fontSize: '16px', lineHeight: 1.6, color: 'var(--mid-grey)', margin: '0 0 24px 0', maxWidth: '400px', textAlign: 'right', marginLeft: 'auto' }}>
              Mase Consulting Group works with executives and transformation leaders across Africa to turn technology strategy into measurable business outcomes without the overhead of a large firm.
            </p>
            <div className="v3-actions" style={{ ...fadeUpBase, animationDelay: '640ms', display: 'flex', gap: '16px', justifyContent: 'flex-end' }}>
              <a href="#contact" className="nav-cta" style={{ display: 'inline-flex', alignItems: 'center' }}>Send an enquiry</a>
              <a href="#services" className="nav-cta" style={{ background: 'transparent', border: '1px solid var(--mid-grey)', color: 'var(--warm-white)' }}>What we do &rarr;</a>
            </div>
          </div>
        </div>

        <ScrollExpandingVideo src="https://69ddee5e7012079ceb0049c5.imgix.net/silk-1778528970110-compressed%20(1).webm" />
      </main>

      <div className="v3-after-video-spacer" aria-hidden="true" />

      <BackToHome />
    </div>
  );
}

function HomeSelector() {
  return (
    <div style={{ 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center', 
      justifyContent: 'center', 
      background: 'var(--charcoal)', 
      color: 'var(--warm-white)',
      fontFamily: "var(--font-stack)",
      gap: '24px'
    }}>
      <h1 className="hero-headline" style={{ letterSpacing: '4px', textTransform: 'uppercase', fontSize: '2rem', marginBottom: '32px' }}>Variations</h1>
      
      {[
        { path: "/v1", label: "Version 1" },
        { path: "/v2", label: "Version 2" },
        { path: "/v3", label: "Version 3" }
      ].map(v => (
        <Link key={v.path} to={v.path} style={{ 
          padding: '14px 48px', 
          background: 'transparent', 
          color: 'var(--warm-white)',
          border: '1px solid var(--mid-grey)',
          textDecoration: 'none',
          textTransform: 'uppercase',
          letterSpacing: '2px',
          fontSize: '14px',
          transition: 'all 0.3s ease',
          width: '240px',
          textAlign: 'center'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.borderColor = 'var(--warm-white)';
          e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.borderColor = 'var(--mid-grey)';
          e.currentTarget.style.background = 'transparent';
        }}
        >{v.label}</Link>
      ))}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeSelector />} />
        <Route path="/v1" element={<Version1 />} />
        <Route path="/v2" element={<Version2 />} />
        <Route path="/v3" element={<Version3 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
