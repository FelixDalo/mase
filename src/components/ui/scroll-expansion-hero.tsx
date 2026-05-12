import { useEffect, useRef, useState, type ReactNode } from 'react';
import { motion } from 'motion/react';

interface ScrollExpandMediaProps {
  mediaType?: 'video' | 'image';
  mediaSrc: string;
  posterSrc?: string;
  bgImageSrc: string;
  title?: string;
  eyebrow?: string;
  scrollToExpand?: string;
  textBlend?: boolean;
  children?: ReactNode;
}

export default function ScrollExpandMedia({
  mediaType = 'video',
  mediaSrc,
  posterSrc,
  bgImageSrc,
  title,
  eyebrow,
  scrollToExpand,
  textBlend,
  children,
}: ScrollExpandMediaProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [mediaFullyExpanded, setMediaFullyExpanded] = useState(false);
  const [touchStartY, setTouchStartY] = useState(0);
  const [isMobileState, setIsMobileState] = useState(false);

  const scrollProgressRef = useRef(0);
  const mediaFullyExpandedRef = useRef(false);
  const touchStartYRef = useRef(0);

  useEffect(() => {
    scrollProgressRef.current = scrollProgress;
  }, [scrollProgress]);

  useEffect(() => {
    mediaFullyExpandedRef.current = mediaFullyExpanded;
  }, [mediaFullyExpanded]);

  useEffect(() => {
    touchStartYRef.current = touchStartY;
  }, [touchStartY]);

  useEffect(() => {
    setScrollProgress(0);
    setShowContent(false);
    setMediaFullyExpanded(false);
    window.scrollTo(0, 0);
  }, [mediaSrc, mediaType]);

  useEffect(() => {
    const setProgress = (nextProgress: number) => {
      const clampedProgress = Math.min(Math.max(nextProgress, 0), 1);
      setScrollProgress(clampedProgress);
      scrollProgressRef.current = clampedProgress;

      if (clampedProgress >= 1) {
        setMediaFullyExpanded(true);
        mediaFullyExpandedRef.current = true;
        setShowContent(true);
      } else if (clampedProgress < 0.75) {
        setShowContent(false);
      }
    };

    const handleWheel = (event: globalThis.WheelEvent) => {
      if (mediaFullyExpandedRef.current && event.deltaY < 0 && window.scrollY <= 5) {
        setMediaFullyExpanded(false);
        mediaFullyExpandedRef.current = false;
        event.preventDefault();
        return;
      }

      if (!mediaFullyExpandedRef.current) {
        event.preventDefault();
        setProgress(scrollProgressRef.current + event.deltaY * 0.0009);
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

      if (mediaFullyExpandedRef.current && deltaY < -20 && window.scrollY <= 5) {
        setMediaFullyExpanded(false);
        mediaFullyExpandedRef.current = false;
        event.preventDefault();
        return;
      }

      if (!mediaFullyExpandedRef.current) {
        event.preventDefault();
        setProgress(scrollProgressRef.current + deltaY * (deltaY < 0 ? 0.008 : 0.005));
        setTouchStartY(touchY);
      }
    };

    const handleTouchEnd = () => {
      setTouchStartY(0);
    };

    const handleScroll = () => {
      if (!mediaFullyExpandedRef.current && window.scrollY !== 0) {
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobileState(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const mediaWidth = 320 + scrollProgress * (isMobileState ? 640 : 1180);
  const mediaHeight = 360 + scrollProgress * (isMobileState ? 220 : 440);
  const textTranslateX = scrollProgress * (isMobileState ? 145 : 118);
  const overlayOpacity = 0.58 - scrollProgress * 0.32;
  const titleWords = title ? title.split(' ') : [];
  const firstLine = titleWords.slice(0, 3).join(' ');
  const secondLine = titleWords.slice(3).join(' ');

  return (
    <div className="scroll-expand-root">
      <section className="scroll-expand-hero" aria-label={title}>
        <motion.div
          className="scroll-expand-bg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 - scrollProgress * 0.92 }}
          transition={{ duration: 0.12 }}
        >
          <img src={bgImageSrc} alt="" />
          <div className="scroll-expand-bg-overlay" />
        </motion.div>

        <div className="scroll-expand-stage">
          <div
            className="scroll-expand-media-frame"
            style={{
              width: `${mediaWidth}px`,
              height: `${mediaHeight}px`,
              maxWidth: '95vw',
              maxHeight: '84vh',
            }}
          >
            {mediaType === 'video' ? (
              <video
                src={mediaSrc}
                poster={posterSrc}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                controls={false}
                disablePictureInPicture
                className="scroll-expand-media"
              />
            ) : (
              <img src={mediaSrc} alt={title ?? 'Featured media'} className="scroll-expand-media" />
            )}
            <motion.div
              className="scroll-expand-media-overlay"
              initial={{ opacity: 0.58 }}
              animate={{ opacity: overlayOpacity }}
              transition={{ duration: 0.18 }}
            />
          </div>

          <div
            className={`scroll-expand-title ${textBlend ? 'scroll-expand-title-blend' : ''}`}
            aria-hidden={scrollProgress > 0.96}
          >
            {eyebrow && (
              <p
                className="scroll-expand-eyebrow"
                style={{ transform: `translateX(-${textTranslateX}vw)` }}
              >
                {eyebrow}
              </p>
            )}
            <h1>
              <span style={{ transform: `translateX(-${textTranslateX}vw)` }}>{firstLine}</span>
              <span style={{ transform: `translateX(${textTranslateX}vw)` }}>
                {secondLine || firstLine}
              </span>
            </h1>
            {scrollToExpand && (
              <p
                className="scroll-expand-instruction"
                style={{ transform: `translateX(${textTranslateX}vw)` }}
              >
                {scrollToExpand}
              </p>
            )}
          </div>
        </div>
      </section>

      <motion.section
        className="scroll-expand-content"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 24 }}
        transition={{ duration: 0.65 }}
      >
        {children}
      </motion.section>
    </div>
  );
}
