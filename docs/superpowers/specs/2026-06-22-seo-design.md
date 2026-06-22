# Irrigant SEO foundation and grower content

## Goal

Make irrigant.xyz discoverable for U.S. growers looking for irrigation scheduling and soil-moisture guidance, while keeping the public site plain-language, useful, and honest about Helios being a pilot-stage decision-support tool.

## Positioning

- Audience: U.S. growers and farm operators evaluating irrigation decision support.
- Primary intents: irrigation scheduling, soil-moisture forecasting, and crop-water decisions.
- Tone: practical, calm, and grower-facing. Explain the value before the mechanism.
- Conversion: waitlist sign-up.

## Claim boundaries

- Helios helps growers review water-stress risk, near-term soil moisture, and an irrigation recommendation. It is not an autonomous controller.
- Do not claim proven water savings, calibrated confidence, live field coverage, or validated accuracy.
- Do not name algorithms, feature engineering, data schemas, model versions, or private data on public pages.
- When an explanation needs technical grounding, use the current Helios facts: it considers field conditions, crop context, near-term weather, and crop-water demand to support a conservative recommendation.

## Public pages

1. Homepage: retain the visual system and waitlist flow. Update the title, main heading, and supporting copy so the page clearly says what Irrigant helps with in plain language.
2. Irrigation scheduling guide: explain the decisions a grower needs to make, common signals to consider, and where Helios is intended to help.
3. Soil-moisture guide: explain why soil moisture matters and how forecasts can support a decision without promising a result.
4. How Helios helps: a short, non-technical explanation of the decision-support workflow, its pilot status, and its non-autonomous role.
5. Potato irrigation guide: publish only source-backed, general guidance. It must not claim field-specific prescription capability or universal application rates.

Each guide links to the waitlist and to the other relevant guides. No state or city landing pages, no keyword-stuffed pages, and no programmatic content expansion.

## Technical SEO

- Add a canonical URL to every indexable page.
- Add a root `robots.txt` and `sitemap.xml` listing each indexable public page.
- Add concise, page-specific titles and descriptions.
- Add complete Open Graph and Twitter metadata, including a social image and canonical URL.
- Add only `Organization` and `WebSite` JSON-LD. Do not add review, rating, FAQ, LocalBusiness, or software-performance markup.
- Preserve the existing HTTPS and host redirect behavior.
- Optimize the current logo asset without changing the visual design.

## Measurement and indexing

- Create or connect Google Search Console for `irrigant.xyz`, submit the sitemap, and request indexing for the homepage and guides.
- Create or connect GA4 and record a successful waitlist form submission as a conversion.
- Review search queries, indexed pages, and conversion activity monthly. Expand content only from observed demand or defensible original material.

## Verification

- Add a test-first static check for canonical URLs, metadata, JSON-LD, `robots.txt`, sitemap coverage, and internal links.
- Verify the rendered site at desktop and mobile widths, including the waitlist flow.
- Verify the deployed URLs return `200`, the canonical host resolves correctly, and the new crawl assets are live.
- Verify Search Console sitemap acceptance and the GA4 waitlist conversion after account access is available.

## Out of scope

- Product dashboard changes.
- New model features or revised model claims.
- Local SEO or a Google Business Profile.
- Backlink campaigns, paid search, and fabricated case studies.
