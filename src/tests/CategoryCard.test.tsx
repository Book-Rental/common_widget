import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import CategoryCard from "../components/CategoryCard";
import { Category } from "../types/category";

const mockCategory: Category = {
    _id: "1",
    name: "Romance",
    description: "",
    isActive: false,
    isPopular: false,
    createdAt: "",
    updatedAt: ""
};

describe("CategoryCard", () => {
    it("renders category name", () => {
        render(
            <CategoryCard
                category={mockCategory}
                onClick={vi.fn()}
            />
        );

        expect(screen.getByText("Romance")).toBeInTheDocument();
    });

    it("calls onClick when clicked", () => {
        const handleClick = vi.fn();

        render(
            <CategoryCard
                category={mockCategory}
                onClick={handleClick}
            />
        );

        fireEvent.click(
            screen.getByRole("button")
        );

        expect(handleClick).toHaveBeenCalledTimes(1);
        expect(handleClick).toHaveBeenCalledWith(mockCategory);
    });

    it("renders button", () => {
        render(
            <CategoryCard
                category={mockCategory}
                onClick={vi.fn()}
            />
        );

        expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("renders another category correctly", () => {
        render(
            <CategoryCard
                category={{ ...mockCategory, _id: "2", name: "Technology" }}
                onClick={vi.fn()}
            />
        );

        expect(screen.getByText("Technology")).toBeInTheDocument();
    });

    it("renders unknown category without crashing", () => {
        render(
            <CategoryCard
                category={{ ...mockCategory, _id: "3", name: "Unknown Category" }}
                onClick={vi.fn()}
            />
        );

        expect(screen.getByText("Unknown Category")).toBeInTheDocument();
    });
    it.each([
        "Romance",
        "Fantasy",
        "Mystery",
        "Thriller",
        "Biography",
        "Autobiography",
        "Business",
        "Technology",
        "Travel",
        "Cooking",
        "Health & Wellness",
        "Religion & Spirituality",
        "Young Adult",
        "Horror",
        "Education",
    ])("renders %s category", (name) => {
        render(
            <CategoryCard
                category={{
                    ...mockCategory,
                    _id: name,
                    name,
                }}
                onClick={vi.fn()}
            />
        );

        expect(screen.getByText(name)).toBeInTheDocument();
    });
});