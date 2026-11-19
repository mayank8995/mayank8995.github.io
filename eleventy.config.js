import { HtmlBasePlugin } from "@11ty/eleventy";

export default function (eleventyConfig) {
  // Rewrites absolute URLs (/assets/style.css) when the site lives under a sub-path,
  // e.g. https://mayank8995.github.io/portfolio/ . Set PATH_PREFIX to use it.
  eleventyConfig.addPlugin(HtmlBasePlugin);

  // Copy static files straight through to the output.
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy({ "src/resume.pdf": "resume.pdf" });

  // Projects: every Markdown file in src/projects, ordered by `order` then title.
  eleventyConfig.addCollection("projects", (api) =>
    api
      .getFilteredByGlob("src/projects/*.md")
      .filter((p) => !p.data.draft)
      .sort((a, b) => (a.data.order ?? 999) - (b.data.order ?? 999) || a.data.title.localeCompare(b.data.title))
  );

  eleventyConfig.addFilter("initials", (t = "") =>
    t.split(/\s+/).map((w) => w[0]).join("").slice(0, 2).toUpperCase()
  );
  eleventyConfig.addFilter("uniqueTags", (projects) => [...new Set(projects.flatMap((p) => p.data.tags || []))]);
  eleventyConfig.addFilter("year", () => new Date().getFullYear());
  eleventyConfig.addFilter("json", (v) => JSON.stringify(v));

  return {
    dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
    pathPrefix: process.env.PATH_PREFIX || "/",
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}
