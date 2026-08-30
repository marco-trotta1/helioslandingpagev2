# Homepage Conversion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Shorten the homepage, preserve its current design, move detailed product content, and make quote requests the primary conversion path.

**Architecture:** Keep the static HTML structure and embedded homepage styles. Create one Product page with the existing visual language. Protect the information architecture and copy with Bun tests.

**Tech Stack:** Static HTML, CSS, browser JavaScript, Formspree, Bun test.

**Spec:** `docs/superpowers/specs/2026-08-30-homepage-conversion-design.md`

## Global Constraints

- Preserve the current typography, colors, spacing, cards, animations, product preview, and form style.
- Keep Media coverage, Data sources and research inputs, and In the field on the homepage.
- Use Request a quote as the primary action.
- Require a team conversation for free pilot access.
- Do not add a testimonial.
- Do not use IDLA.

---

### Task 1: Protect the new page structure

**Files:**
- Create: `tests/homepage-conversion.test.mjs`
- Test: `tests/homepage-conversion.test.mjs`

**Interfaces:**
- Consumes: Static page files from the repository root.
- Produces: Tests for homepage order, moved sections, quote copy, and Product page content.

- [ ] **Step 1: Write the failing structure tests**

```js
import { describe, expect, test } from "bun:test";
import { existsSync, readFileSync } from "node:fs";

const read = (path) => existsSync(path) ? readFileSync(path, "utf8") : "";
const home = read("index.html");
const product = read("product.html");

describe("homepage conversion flow", () => {
  test("keeps the required sections in the approved order", () => {
    const markers = ['id="product"', 'class="strip"', 'id="footprint"', 'id="media"', 'id="quote"'];
    const positions = markers.map((marker) => home.indexOf(marker));
    expect(positions.every((position) => position >= 0)).toBe(true);
    expect(positions).toEqual([...positions].sort((a, b) => a - b));
  });

  test("moves detailed sections to the Product page", () => {
    expect(home).not.toContain('id="features"');
    expect(home).not.toContain('id="ask"');
    expect(home).not.toContain('id="science"');
    expect(home).not.toContain('id="pricing"');
    expect(product).toContain('id="features"');
    expect(product).toContain('id="ask"');
    expect(product).toContain('id="science"');
  });

  test("uses the quote request path", () => {
    expect(home).toContain("Request a quote");
    expect(home).toContain('id="quoteForm"');
    expect(home).toContain("Ask about free pilot access");
    expect(home).not.toMatch(/Join the waitlist|Request early access/);
  });
});
```

- [ ] **Step 2: Run the tests and confirm the expected failure**

Run: `bun test tests/homepage-conversion.test.mjs`

Expected: FAIL because `product.html` and `#quote` do not exist.

### Task 2: Shorten the homepage and create the Product page

**Files:**
- Modify: `index.html:508-1432`
- Create: `product.html`
- Test: `tests/homepage-conversion.test.mjs`

**Interfaces:**
- Consumes: Existing homepage components and design tokens.
- Produces: A six-part homepage and a Product page with the moved sections.

- [ ] **Step 1: Update the homepage navigation and actions**

Add this desktop navigation link before the Guides menu:

```html
<a href="product.html" class="nav-link">Product</a>
```

Use this primary action on desktop and mobile:

```html
<a href="#quote" class="btn btn-primary btn-sm nav-cta">Request a quote</a>
```

- [ ] **Step 2: Remove the four detailed homepage sections**

Remove the markup blocks with these identifiers:

```text
#features
#ask
#science
#pricing
```

Keep the hero, `#product`, `.strip`, `#footprint`, `#media`, and `#quote` in the approved order.

- [ ] **Step 3: Convert the form to a quote request**

Use these identifiers and labels:

```html
<section class="block" id="quote">
<span class="eyebrow">Request a quote</span>
<h2 class="h-lg">Get a quote for your operation.</h2>
<form class="wl-form reveal" id="quoteForm">
<button type="submit" class="wl-submit" id="submitBtn">Request a quote</button>
```

Add a contact link with the label `Ask about free pilot access`.

Change the success heading to `Your request is in.`

Change the submission fallback label to `Request a quote`.

- [ ] **Step 4: Create the Product page**

Create `product.html` with the current navigation, typography, colors, and component styles.

Include these existing section identifiers and headings:

```html
<section class="block" id="features">
<section class="block" id="ask">
<section class="block" id="science">
```

Link each Product page quote action to `index.html#quote`.

- [ ] **Step 5: Run the focused tests**

Run: `bun test tests/homepage-conversion.test.mjs tests/media-coverage.test.mjs`

Expected: PASS.

### Task 3: Align every public conversion path

**Files:**
- Modify: `about.html`
- Modify: `pricing.html`
- Modify: `privacy.html`
- Modify: `irrigation-scheduling.html`
- Modify: `soil-moisture-forecasting.html`
- Modify: `how-helios-helps.html`
- Modify: `machine-learning.html`
- Modify: `sitemap.xml`
- Modify: `tests/privacy-policy.test.mjs`
- Modify: `tests/seo-static.test.mjs`

**Interfaces:**
- Consumes: The homepage `#quote` destination and `product.html` route.
- Produces: Consistent public links, privacy copy, and crawler discovery.

- [ ] **Step 1: Update public actions**

Replace each `/#waitlist` or `index.html#waitlist` action with `/#quote` or `index.html#quote`.

Use `Request a quote` for the action label.

- [ ] **Step 2: Update the privacy copy**

Use `quote request` for the form purpose and submitted information.

Keep the current data categories, provider disclosure, retention terms, and contact route.

- [ ] **Step 3: Add Product page discovery**

Add this sitemap entry:

```xml
<url><loc>https://irrigant.xyz/product.html</loc></url>
```

Add `product.html` to the metadata test page list.

- [ ] **Step 4: Update the existing assertions**

Assert the `#quote` route, Request a quote copy, Product page metadata, and revised privacy collection notice.

- [ ] **Step 5: Run the full suite before the implementation commit**

Run: `bun test`

Expected: All tests pass.

- [ ] **Step 6: Review and commit the implementation**

Run: `git diff --check`

Run: `git status --short`

Commit only the planned files with this subject:

```text
feat: streamline homepage conversion flow
```

- [ ] **Step 7: Push the main branch**

Run: `git push origin main`
