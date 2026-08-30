import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";

const pages = [
  "index.html",
  "product.html",
  "pricing.html",
  "about.html",
  "irrigation-scheduling.html",
  "soil-moisture-forecasting.html",
  "how-helios-helps.html",
  "machine-learning.html",
];

const primaryNavigation = (page) => {
  const html = readFileSync(page, "utf8");
  return html.match(/<nav\b[\s\S]*?<\/nav>/)?.[0] ?? "";
};

describe("public navigation", () => {
  test("uses four top-level choices and one quote action", () => {
    for (const page of pages) {
      const navigation = primaryNavigation(page);

      expect(navigation).toMatch(/href="\/?product\.html"[^>]*class="nav-link[^"]*"[^>]*>Product<\/a>/);
      expect(navigation).toMatch(/>\s*Resources\s*<svg/);
      expect(navigation).toMatch(/href="\/?pricing\.html"[^>]*class="nav-link[^"]*"[^>]*>Pricing<\/a>/);
      expect(navigation).toMatch(/href="\/?about\.html"[^>]*class="nav-link[^"]*"[^>]*>About<\/a>/);
      expect(navigation).toContain("Request a quote");
      expect(navigation).not.toContain("guidesDropdown");
      expect(navigation).not.toMatch(/class="nav-link[^"]*"[^>]*>Ask Helios<\/a>/);
      expect(navigation).not.toMatch(/class="nav-link[^"]*"[^>]*>Media(?: coverage)?<\/a>/);
    }
  });

  test("groups product help, media, and guides inside Resources", () => {
    const labels = [
      "Ask Helios",
      "Media coverage",
      "Irrigation Scheduling",
      "Soil Moisture Forecasting",
      "How Helios Helps",
      "Machine Learning",
    ];

    for (const page of pages) {
      const navigation = primaryNavigation(page);

      expect(navigation).toContain('id="resourcesDropdown"');
      expect(navigation).toContain('aria-controls="resourcesMenu"');
      expect(navigation).toContain('id="resourcesMenu"');
      expect(navigation).toContain('class="nav-dropdown-menu resources-menu"');
      for (const label of labels) expect(navigation).toContain(label);
    }
  });
});
