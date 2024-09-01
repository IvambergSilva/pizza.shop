import { RouterProvider } from "react-router-dom";
import { Router } from "./router";
import './index.css'
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Toaster } from "sonner";
import { ThemeProvider } from "./components/theme/theme-provider";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/react-query";

export function App() {
    return (
        <ThemeProvider storageKey="pizzashop-theme" defaultTheme="dark">
            <HelmetProvider>
                <Helmet titleTemplate="%s | PizzaShop" />
                <QueryClientProvider client={queryClient}>
                    <RouterProvider router={Router} />
                </QueryClientProvider>
                <Toaster richColors />
            </HelmetProvider>
        </ThemeProvider>
    )
}