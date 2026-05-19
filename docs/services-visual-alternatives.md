# Services Visual Alternatives

## Goal

Replace the current large service icons in the `Services` section with a visual system that feels more premium, more bespoke, and less literal.

The visual should:

- work without photography
- fit the thin, editorial line language of the site
- animate subtly inside the active service panel
- be reusable across the five service categories

## Best Alternatives

### 1. Animated System Diagrams

Use abstract line diagrams that suggest structure, flow, orchestration, and transformation rather than showing a literal icon.

Examples:

- `Digital Transformation`: connected modules, branching pathways, directional flows
- `Data and AI`: data bars, signal nodes, decision paths, expanding clusters
- `Cloud Solutions`: cloud topology, distributed infrastructure, routed connections
- `Cyber Security`: perimeter shapes, shield grids, monitored boundaries
- `Operational Modelling`: stacked process layers, linked roles, governance trees

Why this is strong:

- it feels custom rather than stock
- it matches the thin-stroke language already used in the site
- it can animate with line reveals, pulses, rerouting, or node flickers

## 2. Architectural Wireframe Motifs

Use minimal wireframe compositions, almost like product schematics or service blueprints.

Examples:

- framed modules
- route maps
- layered platform blocks
- governance ladders
- signal pathways

Why this is strong:

- feels strategic and enterprise-oriented
- cleaner than illustrations
- easier to keep visually consistent across categories

## 3. Kinetic Type Compositions

Instead of a graphic, use oversized animated service keywords in a restrained layout.

Examples:

- `TRANSFORM`
- `MODEL`
- `SECURE`
- `ORCHESTRATE`
- `AUTOMATE`

These can animate with:

- masked reveals
- sliding baselines
- ghosted duplicates
- pulse outlines

Why this is strong:

- no need for illustration at all
- highly brandable
- easy to make feel expensive if typography is controlled well

## 4. Generated Abstract SVG Structures

Use generative line-based backgrounds or abstract vector structures that are tuned per service.

Examples:

- radial node maps
- stepped peaks
- layered waveforms
- grid distortions
- circular or orbital systems

Why this is strong:

- gives variety without becoming illustrative
- can be exported as SVG and refined in Figma
- useful when we want fast exploration

## Recommendation

Best direction for this site:

`Animated system diagrams`

Reason:

- closest to the current design language
- strongest balance between premium, abstract, and business-relevant
- can still use thin strokes and controlled animation
- easier to make unique for each service than standard icons

## How To Get Them With AI

### Option A: Generate SVG concepts with AI, then redraw cleanly

Workflow:

1. Generate visual concepts with AI using prompts focused on minimal vector line systems.
2. Choose the strongest concept direction.
3. Rebuild or clean the chosen direction as SVG in Figma or code.
4. Animate the clean SVG in the frontend.

Prompt style:

- "minimal thin-stroke vector system diagram for digital transformation, abstract enterprise flow, no text, no gradients, white background"
- "editorial line-based abstract diagram for cloud solutions, modular topology, thin black strokes"
- "enterprise cyber security schematic, perimeter and monitored node structure, minimal vector drawing"

Important:

- AI should be used for concepting, not usually for final production SVG
- the final SVG should be cleaned and simplified before animation

## How To Get Them From Existing Libraries / Tools

### 1. Rive

Best for custom vector motion that needs to feel polished and intentional.

Use when:

- we want a bespoke animated system diagram
- we want fine control over looping and states
- we may later want hover or interaction logic

Official:

- https://rive.app/

### 2. LottieFiles

Best when we want to source or create lightweight vector animations and ship them quickly.

Use when:

- we find close-enough motion assets
- we want to customize an existing animation
- we want a designer-friendly animation workflow

Official:

- https://lottiefiles.com/what-is-lottie/
- https://docs.lottiefiles.com/

### 3. Haikei

Best for generating abstract SVG structures and backgrounds that can be refined into service visuals.

Use when:

- we want base SVG geometry quickly
- we want non-illustrative abstract forms
- we want to export SVG and then customize it

Official:

- https://haikei.app/
- https://haikei.app/generators/

### 4. GSAP DrawSVG

Best when we already have clean SVG line art and want direct stroke-based animation in code.

Use when:

- we build the visuals ourselves
- we want precise control over draw timing
- we want cleaner animation than CSS-only stroke loops

Official:

- https://gsap.com/docs/v3
- https://gsap.com/docs/v3/Plugins/DrawSVGPlugin/

## Practical Production Routes

### Route 1: Fastest

- concept with AI
- redraw in Figma
- animate in CSS or GSAP

Best if speed matters and we want custom output.

### Route 2: Highest quality

- design custom line systems in Figma
- animate in Rive
- export/runtime integrate in the site

Best if the visuals become a signature part of the brand.

### Route 3: Fastest with external assets

- search LottieFiles or similar animation libraries
- choose assets that are visually compatible
- recolor and simplify them
- deploy with restrained looping

Best if the client needs movement quickly and cost matters more than uniqueness.

## What I Would Do Next

1. Stop using literal icons in the services section.
2. Choose `animated system diagrams` as the target visual language.
3. Make one pilot visual for `Digital Transformation`.
4. Test it in the active panel at large scale.
5. If it works, create the other four in the same system.

## Notes

- The current services section is already structured well for swapping visuals.
- We do not need to change the panel layout first.
- The main decision is the visual language, not the animation tooling.
