import { useEffect, useState } from "react";
import { useCategories } from "../hooks/useCategories";
import CategoryCard from "../components/CategoryCard";
import { Rb_LoadingSpinner, Rb_Text } from "@rentbook/rentbook-ui-lib";
import { slugify } from "../utils/slugify";
import { Category } from "../types/category";

const handleCategoryClick = (category: Category) => {
    window.history.pushState(
        {},
        "",
        `/books?categories=${slugify(category.name)}`
    );

    window.dispatchEvent(new PopStateEvent("popstate"));
};

const CategoryPage = () => {
    const { data, isLoading, isError } = useCategories();
    const [popularOnly, setPopularOnly] = useState(false);

    useEffect(() => {
        const event = new CustomEvent("widget-loading-status", {
            detail: isLoading,
        });
        window.dispatchEvent(event);
    }, [isLoading]);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);

        if (params.get("isPopular") === "true") {
            setPopularOnly(true);
        }
    }, []);

    if (isLoading) {
        return <Rb_LoadingSpinner text="Loading categories..." />;
    }

    if (isError) {
        return <Rb_Text variant="p">Something went wrong.</Rb_Text>;
    }

    const categories = popularOnly
        ? data?.data.filter((category) => category.isPopular)
        : data?.data;

    return (
        <section className="w-full">
            <div className="mx-10 my-10">
                <Rb_Text
                    variant="h2"
                    className="mb-5 font-bold text-[#1B1530]"
                >
                    {popularOnly ? "Popular Categories" : "All Categories"}
                </Rb_Text>

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
                    {categories?.map((category) => (
                        <CategoryCard
                            key={category._id}
                            category={category}
                            onClick={handleCategoryClick}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CategoryPage;