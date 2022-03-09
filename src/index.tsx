import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import GlobalStyle from "./styles/global-styles";
import theme from "./styles/theme";
import { ThemeProvider } from "./styles/themed-components";
import { QueryClientProvider, QueryClient } from "react-query";

const queryClient = new QueryClient();

ReactDOM.render(
    <>
        <GlobalStyle />
        <ThemeProvider theme={theme}>
            <QueryClientProvider client={queryClient}>
                <App />
            </QueryClientProvider>
        </ThemeProvider>
    </>,
    document.getElementById("root")
);
