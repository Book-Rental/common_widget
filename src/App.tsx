import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import WidgetRouter from "./router/WidgetRouter";
import "@rentbook/rentbook-ui-lib/microfrontend.min.css"
interface AppProps {
  flag?: string;
}

const queryClient = new QueryClient();

function App({ flag = "category" }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <WidgetRouter flag={flag} />
    </QueryClientProvider>
  );
}

export default App;