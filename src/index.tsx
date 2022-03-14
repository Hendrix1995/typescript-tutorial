import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import App from "./App";
import GlobalStyle from "./styles/global-styles";
import theme from "./styles/theme";
import { ThemeProvider } from "./styles/themed-components";
import { QueryClientProvider, QueryClient } from "react-query";

import Chart from "./page/Chart";
const queryClient = new QueryClient();

ReactDOM.render(
    <BrowserRouter>
        <GlobalStyle />
        <ThemeProvider theme={theme}>
            <QueryClientProvider client={queryClient}>
                <Routes>
                    <Route path="/" element={<App />} />
                    <Route path="/chart" element={<Chart />} />
                </Routes>
            </QueryClientProvider>
        </ThemeProvider>
    </BrowserRouter>,
    document.getElementById("root")
);
