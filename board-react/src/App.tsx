
import "./App.css";
import MainLayout from "./views/layouts/MainLayout";
import theme from "./theme/theme";
import { ThemeProvider } from "@mui/material";

export default function App() {
  return (
    <ThemeProvider theme = {theme}>
      <MainLayout />
    </ThemeProvider>
  );
}
