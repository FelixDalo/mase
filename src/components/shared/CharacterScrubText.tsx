import { useEffect, useRef, useState } from 'react';

interface CharacterScrubTextProps {
  text: string;
  className?: string;
}

export function CharacterScrubText({ text, className = '' }: CharacterScrubTextProps) {
  const textRef = useRef<HTMLSpanElement>(null);
  const [progress, setProgress] = useState(0);
  const words = text.split(' ');

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
      {words.map((word, wordIndex) => {
        const priorCharacterCount = words.slice(0, wordIndex).join(' ').length + (wordIndex > 0 ? 1 : 0);

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
            {wordIndex < words.length - 1 && <span className="character-scrub-space"> </span>}
          </span>
        );
      })}
    </span>
  );
}
