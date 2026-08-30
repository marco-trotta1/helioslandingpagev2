import { describe, expect, test } from "bun:test";
import { existsSync, readFileSync } from "node:fs";

const pages = [
  "index.html",
  "product.html",
  "irrigation-scheduling.html",
  "soil-moisture-forecasting.html",
  "how-helios-helps.html",
  "machine-learning.html",
];

const read = (path) => existsSync(path) ? readFileSync(path, "utf8") : "";

describe("public SEO assets", () => {
  test("positions the homepage around irrigation decisions", () => {
    const html = read("index.html");

    expect(html).toContain("AI for Farms | Irrigant");
    expect(html).toContain("Know when to water.<br>Know how much to apply.");
    expect(html).toContain('"@type":"Organization"');
    expect(html).toContain('"@type":"WebSite"');
    expect(html).not.toContain('"@type":"SoftwareApplication"');
    expect(html).not.toContain('"sameAs"');
    expect(html).toContain('<meta property="og:site_name" content="Irrigant">');
    expect(html).toContain('<meta property="og:image:alt" content="Irrigant Helios irrigation forecast preview">');
    expect(html).not.toMatch(/\bexact\b|\bguaranteed\b|\bsafe\b|pays for itself/i);
    expect(html).toContain('href="irrigation-scheduling.html"');
  });

  test("shows the active acreage on the homepage", () => {
    const html = read("index.html");

    expect(html).toContain('<section class="acreage" id="footprint" aria-labelledby="footprint-title">');
    expect(html).toContain('<span class="acreage-number">7,000</span>');
    expect(html).toContain('<a class="acreage-link" href="#quote">Request a quote</a>');
    expect(html).not.toContain("Helios is active across 7,000 acres.");
  });

  test("publishes crawler discovery for every public page", () => {
    expect(read("robots.txt")).toContain("Sitemap: https://irrigant.xyz/sitemap.xml");
    const sitemap = read("sitemap.xml");
    expect(sitemap).toContain("<loc>https://irrigant.xyz/</loc>");
    expect(sitemap).toContain("<loc>https://irrigant.xyz/product.html</loc>");
    expect(sitemap).toContain("<loc>https://irrigant.xyz/irrigation-scheduling.html</loc>");
    expect(sitemap).toContain("<loc>https://irrigant.xyz/soil-moisture-forecasting.html</loc>");
    expect(sitemap).toContain("<loc>https://irrigant.xyz/how-helios-helps.html</loc>");
    expect(sitemap).toContain("<loc>https://irrigant.xyz/machine-learning.html</loc>");
  });

  test("gives every public page canonical and social metadata", () => {
    expect(existsSync("assets/irrigant-social-card.png")).toBe(true);

    for (const page of pages) {
      const html = read(page);
      expect(html).toMatch(/<link rel="canonical" href="https:\/\/irrigant\.xyz\/.*">/);
      expect(html).toMatch(/<meta name="description" content="[^"]+">/);
      expect(html).toContain("https://irrigant.xyz/assets/irrigant-social-card.png");
      expect(html).toContain('<meta name="twitter:card" content="summary_large_image">');
    }
  });

  test("keeps unsupported technical claims out of public copy", () => {
    const copy = pages.map(read).join("\n");
    expect(copy).toContain("Request a quote");
    expect(copy).not.toContain("Join the waitlist");
    expect(copy).not.toMatch(/LightGBM|calibrated confidence|guaranteed water savings|pays for itself|skipping the set is safe|last four sets|one inch in five/i);
  });

  test("keeps the homepage honest and accessible", () => {
    const html = read("index.html");
    const product = read("product.html");

    expect(html).toContain('<a class="skip-link" href="#main">Skip to content</a>');
    expect(html).toContain('<main id="main">');
    expect(html).toContain('aria-controls="guidesMenu"');
    expect(html).toContain('aria-expanded="false"');
    expect(html).toContain('<canvas class="hero-canvas" id="heroCanvas" aria-hidden="true"></canvas>');
    expect(html).toContain("Illustrative preview using synthetic field data.");
    expect(html).toContain("Illustrative preview. Ask Helios answers are shown in the scripted scene.");
    expect(html).toContain("does not control irrigation");
    expect(html).toContain('autocomplete="given-name"');
    expect(html).toContain('autocomplete="family-name"');
    expect(html).toContain('autocomplete="email"');
    expect(html).toContain('autocomplete="address-level2"');
    expect(product).toContain('Sensors and setup');
    expect(product).toContain('aim to reply within two business days');
    expect(html).toContain("var supportsReveal = 'IntersectionObserver' in window;");
    expect(html).toContain('role="status"');
  });

  test("gives each guide a unique grower question and a quote request path", () => {
    const expectations = {
      "irrigation-scheduling.html": "How to make a better irrigation call",
      "soil-moisture-forecasting.html": "See the trend before it becomes stress",
      "how-helios-helps.html": "Better information before the water decision",
      "machine-learning.html": "Machine learning for better irrigation decisions",
    };

    for (const [page, heading] of Object.entries(expectations)) {
      const html = read(page);
      expect(html).toContain("<h1>" + heading + "</h1>");
      expect(html).toContain('href="/product.html#ask"');
      expect(html).toContain('href="/#quote"');
      expect(html).toContain("Request a quote");
      expect(html).not.toMatch(/waitlist/i);
      expect(html).toContain('href="guides.css"');
    }
  });

  test("uses the quote request path on the About and Pricing pages", () => {
    for (const page of ["about.html", "pricing.html"]) {
      const html = read(page);
      expect(html).toContain('href="product.html#ask"');
      expect(html).toContain('href="index.html#quote"');
      expect(html).toContain("Request a quote");
      expect(html).not.toMatch(/waitlist/i);
    }
  });

  test("indexes the Machine Learning page and no longer publishes the potato guide", () => {
    const sitemap = read("sitemap.xml");
    const machineLearning = read("machine-learning.html");
    const guideStyles = read("guides.css");

    expect(sitemap).toContain("<loc>https://irrigant.xyz/machine-learning.html</loc>");
    expect(sitemap).not.toContain("potato-irrigation-guide.html");
    expect(machineLearning).toContain("<h1>Machine learning for better irrigation decisions</h1>");
    expect(machineLearning).toMatch(/XGBoost multi-output regression/);
    expect(machineLearning).toMatch(/OpenET monthly ET enrichment/);
    expect(guideStyles).not.toContain("border-radius:16px");
  });
});
