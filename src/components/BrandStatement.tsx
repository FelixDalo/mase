import { CharacterScrubText } from './shared/CharacterScrubText';

interface BrandStatementProps {
  text: string;
}

export function BrandStatement({ text }: BrandStatementProps) {
  return (
    <section className="next-section-placeholder">
      <p className="v1-brand-line">
        <CharacterScrubText text={text} />
      </p>
    </section>
  );
}
