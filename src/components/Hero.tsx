import { useEffect, useState, useRef } from 'react';
import { InteractiveGrid } from './InteractiveGrid';

export function Hero() {
  const [showSub, setShowSub] = useState(false);
  const [showCta, setShowCta] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [showRule, setShowRule] = useState(false);
  const [showIndicator, setShowIndicator] = useState(true);

  const headlineText = "Where strategy meets delivery.";
  const words = headlineText.split(' ');
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Calculate timing exactly as before
    const headlineEndMs = 200 + ((words.length - 1) * 35) + 500;
    
    const subTimer = setTimeout(() => setShowSub(true), headlineEndMs);
    const ctaTimer = setTimeout(() => setShowCta(true), headlineEndMs + 100);
    const imgTimer = setTimeout(() => setShowImage(true), headlineEndMs + 200);
    const ruleTimer = setTimeout(() => setShowRule(true), headlineEndMs + 500);

    const handleScroll = () => {
      setShowIndicator(window.scrollY <= 100);
      
        if (imageRef.current) {
          const scrollStart = 0;
          const scrollEnd = 400; // pixels to scroll for full expansion
          const viewportWidth = window.innerWidth;
          const isMobile = viewportWidth < 768;
          const isTablet = viewportWidth >= 768 && viewportWidth < 1024;
          const startWidth = isMobile ? viewportWidth - 48 : isTablet ? viewportWidth - 80 : 1100;
          const startHeight = isMobile ? 320 : isTablet ? 390 : 480;
          const endHeight = isMobile ? window.innerHeight * 0.62 : window.innerHeight * 0.8;

          let progress = (window.scrollY - scrollStart) / (scrollEnd - scrollStart);
          if (progress < 0) progress = 0;
          if (progress > 1) progress = 1;

          imageRef.current.style.width = `calc(${startWidth}px + (max(80vw, 100%) - ${startWidth}px) * ${progress})`;
          imageRef.current.style.maxWidth = `calc(100% + (max(80vw, 100%) - 100%) * ${progress})`;
          imageRef.current.style.height = `calc(${startHeight}px + (${endHeight}px - ${startHeight}px) * ${progress})`;
        }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      clearTimeout(subTimer);
      clearTimeout(ctaTimer);
      clearTimeout(imgTimer);
      clearTimeout(ruleTimer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [words.length]);

  // Removed currentWidth and currentRadius variables to use CSS calc directly

  return (
    <header className="hero">
      <InteractiveGrid />
      <div className="hero-content">
        <div className="hero-section-label">
          STRATEGIC ADVISORY · TECHNOLOGY & DIGITAL TRANSFORMATION
        </div>
        
        <h1 className="hero-headline" id="hero-headline">
          {words.map((word, index) => (
            <span key={index}>
              <span
                style={{
                  display: 'inline-block',
                  transform: 'translateY(20px)',
                  opacity: 0,
                  animation: 'fadeUpWord 500ms cubic-bezier(0.25, 0.1, 0.25, 1) forwards',
                  animationDelay: `${200 + (index * 35)}ms`
                }}
              >
                {word}
              </span>
              {index < words.length - 1 && ' '}
              {index === 1 && <br />}
            </span>
          ))}
        </h1>

        <p className={`hero-subtext ${showSub ? 'animate' : ''}`}>
          Mase Consulting Group works with executives and transformation leaders across Africa to turn technology strategy into measurable business outcomes — without the overhead of a large firm.
        </p>

        <div className={`hero-ctas ${showCta ? 'animate' : ''}`}>
          <a href="#contact" className="btn-primary">Send an enquiry</a>
          <a href="#services" className="btn-outline">What we do &rarr;</a>
        </div>
      </div>

      <div 
        ref={imageRef}
        className={`hero-image-container ${showImage ? 'animate' : ''}`} 
        id="hero-image"
        style={{
          width: '1100px',
          maxWidth: '100%',
          height: 'clamp(320px, 48vh, 480px)',
          marginBottom: '-80px',
          zIndex: 20,
          backgroundImage: 'url(https://images.unsplash.com/photo-1758519289074-9de36003622b?fit=crop&crop=faces)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
      </div>

      <div className={`hero-rule ${showRule ? 'animate' : ''}`}></div>

      <div className="scroll-indicator" style={{ opacity: showIndicator ? 1 : 0 }}>
        <span className="scroll-text">SCROLL</span>
        <div className="scroll-arrow"></div>
      </div>
    </header>
  );
}
