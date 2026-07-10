import CategoryPage from "../pages/CategoryPage";

interface WidgetRouterProps {
  flag: string;
}

const WidgetRouter = ({ flag }: WidgetRouterProps) => {
  switch (flag) {
    case "category":
      return <CategoryPage />;

    default:
      return <div>Page Not Found</div>;
  }
};

export default WidgetRouter;