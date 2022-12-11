import { ThemeProvider } from "styled-components";
import { BrowserRouter } from "react-router-dom";
import GlobalStyles from "../../styles/GlobalStyles";
import initialTheme from "../../styles/theme";

interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={initialTheme}>
        <GlobalStyles />
        {children}
      </ThemeProvider>
    </BrowserRouter>
  );
};
