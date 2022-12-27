import { ThemeProvider } from "styled-components";
import { BrowserRouter } from "react-router-dom";
import GlobalStyles from "../../styles/GlobalStyles";
import initialTheme from "../../styles/theme";
import { QueryClient, QueryClientProvider } from "react-query";
import { LoloProvider } from "./LoloProvider";

interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        retry: false,
        staleTime: 5 * 60 * 1000,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <LoloProvider>
          <ThemeProvider theme={initialTheme}>
            <GlobalStyles />
            {children}
          </ThemeProvider>
        </LoloProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};
