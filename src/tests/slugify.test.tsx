import { describe, it, expect } from "vitest";
import { slugify } from "../utils/slugify";

describe("slugify", () => {
  it("converts text to lowercase", () => {
    expect(slugify("Harry Potter")).toBe("harry-potter");
  });

  it("removes leading and trailing spaces", () => {
    expect(slugify("  Harry Potter  ")).toBe("harry-potter");
  });

  it("replaces spaces with hyphens", () => {
    expect(slugify("Book Rental App")).toBe("book-rental-app");
  });

  it("replaces '&' with a hyphen", () => {
    expect(slugify("Science & Technology")).toBe(
      "science-technology"
    );
  });

  it("handles multiple spaces correctly", () => {
    expect(slugify("React     Testing")).toBe(
      "react-testing"
    );
  });

  it("handles lowercase text without changes", () => {
    expect(slugify("storybook")).toBe("storybook");
  });

  it("returns an empty string for empty input", () => {
    expect(slugify("")).toBe("");
  });
});