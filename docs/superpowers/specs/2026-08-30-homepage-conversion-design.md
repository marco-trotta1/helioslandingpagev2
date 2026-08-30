# Homepage Conversion Design

**Status:** Approved on August 30, 2026.

## Goal

Make the homepage shorter and easier to follow.

Guide a farmer toward a quote request.

## Design Constraint

Preserve the current homepage design system.

Keep the typography, colors, spacing, cards, animations, product preview, and form style.

Do not add a new visual direction.

## Homepage Structure

Use this order:

1. Keep the hero.
2. Keep the interactive Helios preview.
3. Keep Data sources and research inputs.
4. Keep In the field.
5. Keep Media coverage.
6. Convert the waitlist form into Request a quote.

Remove these sections from the homepage:

- Features
- The standalone Ask Helios section
- How it works
- Pricing

## Product Page

Create `product.html` with the current site design.

Move these homepage sections to the Product page:

- Features
- The standalone Ask Helios section
- How it works

Keep the existing Machine Learning page for deeper technical detail.

Keep the existing Pricing page for price and access details.

## Navigation

Keep the current navigation design.

Add a Product link to `product.html`.

Keep the Guides menu, Media link, Pricing link, and About link.

Change the primary navigation action to Request a quote.

## Quote Request

Use `#quote` for the homepage form section.

Keep the existing fields and Formspree destination.

Change the form purpose from a waitlist request to a quote request.

Explain that Irrigant reviews the operation before it sends a quote.

State that free pilot access requires a conversation with the Irrigant team.

Update the success and error messages for the quote request.

Update the privacy policy for the new form purpose.

## Proof

Keep the 7,000 active acre statement.

Keep all six data source and research input marks.

Keep all three verified media links.

Do not use IDLA.

Do not add a fabricated testimonial.

## Secondary Pages

Change public waitlist links to Request a quote links.

Point those links to `/#quote` or `index.html#quote` as appropriate.

Add the Product page to the sitemap and public page metadata tests.

## Accessibility

Keep the skip link, semantic landmarks, reduced motion support, focus states, and form labels.

Keep the product preview disclosure.

Keep the statement that Helios does not control irrigation.

## Non-Goals

Do not change the product model or form provider.

Do not add payment processing.

Do not redesign existing components.
