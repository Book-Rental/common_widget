import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import WidgetRouter from "../router/WidgetRouter";

vi.mock("../pages/CategoryPage", () => ({
    default: () => <div>CategoryPage</div>,
}));

describe("WidgetRouter", () => {
    it("renders CategoryPage when flag is 'category'", () => {
        render(<WidgetRouter flag="category" />);

        expect(
            screen.getByText("CategoryPage")
        ).toBeInTheDocument();
    });

    it("renders Page Not Found for invalid flag", () => {
        render(<WidgetRouter flag="invalid" />);

        expect(
            screen.getByText("Page Not Found")
        ).toBeInTheDocument();
    });
});