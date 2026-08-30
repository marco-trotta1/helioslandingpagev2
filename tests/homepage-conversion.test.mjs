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
    expect(home).toContain("Data sources and research inputs");
    expect(home).toContain("In the field");
    expect(home).not.toMatch(/id="testimonials?"|>\s*Testimonials?\s*</i);
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
    expect(home).toContain("conversation with the Irrigant team");
    expect(home).not.toMatch(/Join the waitlist|Request early access/);
  });
});
