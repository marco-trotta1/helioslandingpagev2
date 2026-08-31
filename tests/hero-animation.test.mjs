import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";

const home = readFileSync("index.html", "utf8");

describe("homepage hydrology hero", () => {
  test("uses an irrigation field instrument", () => {
    expect(home).toContain('class="hero-instrument"');
    expect(home).toContain("Making Crops Think");
    expect(home).toContain("Ask Helios for a clear Water or Wait call");
    expect(home).toContain("Hydrologic field intelligence");
    expect(home).toContain("Canopy demand");
    expect(home).toContain("Pivot flow");
    expect(home).toContain("Root-zone state");
  });

  test("supports a static reduced-motion state", () => {
    expect(home).toContain("prefers-reduced-motion: reduce");
    expect(home).toContain("if(reduce){ draw(18); }");
  });

  test("keeps the field densely populated", () => {
    expect(home).toContain("W > 920 ? 7000 : 2400");
    expect(home).toContain("for(var j=0;j<240;j++)");
  });
});
