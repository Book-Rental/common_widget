export const slugify = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/\s*&\s*/g, "-")
    .replace(/\s+/g, "-");