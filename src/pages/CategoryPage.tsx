import { useEffect } from "react";
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

    useEffect(() => {
        const event = new CustomEvent("widget-loading-status", {
            detail: isLoading,
        });
        window.dispatchEvent(event);
    }, [isLoading]);

    if (isLoading) {
        return <Rb_LoadingSpinner text="Loading book details..." />;
    }

    if (isError) {
        return <Rb_Text variant="p">Something went wrong.</Rb_Text>;
    }

    return (
        <section className="w-full">
            <div className="mx-10 my-10">
                <Rb_Text
                    variant="h2"
                    className="mb-5 font-bold text-[#1B1530]"
                >
                    All Categories
                </Rb_Text>

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
                    {data?.data.map((category) => (
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