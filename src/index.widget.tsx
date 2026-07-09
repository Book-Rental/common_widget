import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

let root: ReactDOM.Root | null = null;

(window as any).renderReactWidget = (container: HTMLElement) => {
  root = ReactDOM.createRoot(container);
  root.render(<App />);
};

(window as any).unmountReactWidget = () => {
  root?.unmount();
};