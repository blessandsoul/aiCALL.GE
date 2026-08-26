import { ProductLandingSections } from './ProductLandingSections';
import { HeroProof } from '@/features/showcase/HeroProof';

/* Shared middle-page contract. Product differences come from SITE, translations,
   integrations, resources and the single bespoke HeroProof. */

export function LandingBody() {
  return <>
    <section id="demo" className="aicall-demo-section" aria-label="aiCALL demo">
      <div className="aicall-demo-section__shell" data-family-shell="true">
        <HeroProof />
      </div>
    </section>
    <ProductLandingSections />
  </>;
}
