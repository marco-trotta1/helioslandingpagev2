import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";

const home = readFileSync("index.html", "utf8");

describe("Helios product showcase", () => {
  test("shows the four real product workflows", () => {
    expect(home).toContain('id="heliosProductTour"');
    expect(home).toContain('data-product-view="analysis"');
    expect(home).toContain('data-product-view="decision"');
    expect(home).toContain('data-product-view="ask"');
    expect(home).toContain('data-product-view="history"');
    expect(home).toContain("Describe the field and the decision");
    expect(home).toContain("Review required before action.");
    expect(home).toContain("What can we work through today?");
    expect(home).toContain("Technical details &amp; review evidence");
  });

  test("uses accessible tour controls", () => {
    expect(home).toContain('role="tablist"');
    expect(home).toContain('role="tabpanel"');
    expect(home).toContain('id="productTourControl"');
    expect(home).toContain('id="productTourNext"');
    expect(home).toContain("prefers-reduced-motion: reduce");
  });

  test("keeps the preview disclosure and removes the old mockup", () => {
    expect(home).toContain("Illustrative preview using synthetic field data.");
    expect(home).not.toContain("Helios preview");
    expect(home).not.toContain('id="driverList"');
    expect(home).not.toContain('id="chart"');
  });
});
