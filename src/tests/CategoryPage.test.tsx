import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import CategoryPage from "../pages/CategoryPage";
import { useCategories } from "../hooks/useCategories";
import { slugify } from "../utils/slugify";

vi.mock("../hooks/useCategories", () => ({
    useCategories: vi.fn(),
}));

vi.mock("../utils/slugify", () => ({
    slugify: vi.fn(),
}));

vi.mock("../components/CategoryCard", () => ({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    default: ({ category, onClick }: any) => (
        <button onClick={() => onClick(category)}>
            {category.name}
        </button>
    ),
}));

describe("CategoryPage", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        window.history.pushState({}, "", "/categories");
    });

    it("shows loading state", () => {
        vi.mocked(useCategories).mockReturnValue({
            data: undefined,
            isLoading: true,
            isError: false,
        } as never);

        render(<CategoryPage />);

        expect(
            screen.getByText("Loading categories...")
        ).toBeInTheDocument();
    });

    it("shows error state", () => {
        vi.mocked(useCategories).mockReturnValue({
            data: undefined,
            isLoading: false,
            isError: true,
        } as never);

        render(<CategoryPage />);

        expect(
            screen.getByText("Something went wrong.")
        ).toBeInTheDocument();
    });

    it("renders all categories heading", () => {
        vi.mocked(useCategories).mockReturnValue({
            data: {
                data: [],
            },
            isLoading: false,
            isError: false,
        } as never);

        render(<CategoryPage />);

        expect(
            screen.getByText("All Categories")
        ).toBeInTheDocument();
    });

    it("renders all categories", () => {
        vi.mocked(useCategories).mockReturnValue({
            data: {
                data: [
                    {
                        _id: "1",
                        name: "Romance",
                        isPopular: true,
                    },
                    {
                        _id: "2",
                        name: "Fantasy",
                        isPopular: true,
                    },
                ],
            },
            isLoading: false,
            isError: false,
        } as never);

        render(<CategoryPage />);

        expect(screen.getByText("Romance")).toBeInTheDocument();
        expect(screen.getByText("Fantasy")).toBeInTheDocument();
    });

    it("shows only popular categories when isPopular=true", () => {
        window.history.pushState({}, "", "/categories?isPopular=true");

        vi.mocked(useCategories).mockReturnValue({
            data: {
                data: [
                    {
                        _id: "1",
                        name: "Romance",
                        isPopular: true,
                    },
                    {
                        _id: "2",
                        name: "Business",
                        isPopular: false,
                    },
                ],
            },
            isLoading: false,
            isError: false,
        } as never);

        render(<CategoryPage />);

        expect(
            screen.getByText("Popular Categories")
        ).toBeInTheDocument();

        expect(screen.getByText("Romance")).toBeInTheDocument();
        expect(
            screen.queryByText("Business")
        ).not.toBeInTheDocument();
    });

    it("navigates when category is clicked", () => {
        vi.mocked(useCategories).mockReturnValue({
            data: {
                data: [
                    {
                        _id: "1",
                        name: "Romance",
                        isPopular: true,
                    },
                ],
            },
            isLoading: false,
            isError: false,
        } as never);

        vi.mocked(slugify).mockReturnValue("romance");

        const pushStateSpy = vi.spyOn(window.history, "pushState");
        const dispatchSpy = vi.spyOn(window, "dispatchEvent");

        render(<CategoryPage />);

        fireEvent.click(screen.getByText("Romance"));

        expect(slugify).toHaveBeenCalledWith("Romance");

        expect(pushStateSpy).toHaveBeenCalledWith(
            {},
            "",
            "/books?categories=romance"
        );

        expect(dispatchSpy).toHaveBeenCalled();

        pushStateSpy.mockRestore();
        dispatchSpy.mockRestore();
    });
});