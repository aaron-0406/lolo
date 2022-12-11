import { ThemeProvider } from "styled-components";
import GlobalStyles from "../../styles/GlobalStyles";
import initialTheme from "../../styles/theme";
interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <ThemeProvider theme={initialTheme}>
      <GlobalStyles />
      {children}
    </ThemeProvider>
  );
};
