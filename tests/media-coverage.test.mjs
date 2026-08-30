import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";

const html = readFileSync("index.html", "utf8");

const coverage = [
  {
    publisher: "Capital Press",
    title: "Western Innovator: High school students work on AI decision tool for irrigators",
    url: "https://capitalpress.com/2026/05/26/western-innovator-high-school-students-work-on-ai-decision-tool-for-irrigators/",
  },
  {
    publisher: "Ag Proud",
    title: "Putting AI in agriculture",
    url: "https://www.agproud.com/articles/63775-putting-ai-in-agriculture",
  },
  {
    publisher: "Boise State Public Radio",
    title: "Idaho teens build AI tool to help farmers save water and grow smarter",
    url: "https://www.boisestatepublicradio.org/show/idaho-matters/2026-05-06/idaho-teens-build-ai-tool-farmers-save-water",
  },
];

describe("homepage media coverage", () => {
  test("links to each verified original source", () => {
    expect(html).toContain('<section class="media-section" id="media" aria-labelledby="media-title">');
    expect(html.match(/href="#media"/g)?.length).toBe(2);
    expect(html).not.toContain("Idaho Digital Learning Alliance");

    for (const item of coverage) {
      expect(html).toContain(item.publisher);
      expect(html).toContain(item.title);
      expect(html).toContain(`href="${item.url}"`);
    }
  });

  test("opens each external source safely", () => {
    expect(html.match(/class="media-card reveal"/g)?.length).toBe(coverage.length);
    expect(html.match(/target="_blank" rel="noopener noreferrer"/g)?.length).toBe(coverage.length);
  });
});
