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

  it("replaces '&' with 'and'", () => {
    expect(slugify("Science & Technology")).toBe(
      "science-and-technology"
    );
  });

  it("removes apostrophes", () => {
    expect(slugify("Harry's Book")).toBe("harrys-book");
  });

  it("replaces special characters with hyphens", () => {
    expect(slugify("Science @ Technology!")).toBe(
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

  it("removes leading and trailing hyphens", () => {
    expect(slugify("---Harry Potter---")).toBe(
      "harry-potter"
    );
  });

  it("returns an empty string for empty input", () => {
    expect(slugify("")).toBe("");
  });
});