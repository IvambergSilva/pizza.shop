import { Pizza } from "lucide-react";
import { Outlet } from "react-router-dom";

export function AuthLayout() {
    return (
        <>
            <div className="min-h-screen grid grid-cols-1 grid-rows-[min-content_auto_min-content] sm:grid-cols-2">
                <header className="bg-muted p-5 justify-between sm:p-10 sm:row-start-1 sm:row-end-3 shadow-2xl shadow-muted">
                    <div className="flex items-center justify-center sm:justify-start gap-3 text-lg text-foreground">
                        <Pizza className="h-5 w-5" />
                        <span className="font-semibold">PizzaShop</span>
                    </div>
                </header>
                <main className="flex justify-center items-center sm:row-start-1 sm:row-end-4 relative">
                    <Outlet />
                </main>
                <div className="flex items-center justify-center bg-muted p-5 sm:p-10 sm:items-end sm:justify-start shadow-2xl-up shadow-muted">
                    <footer className="text-sm text-muted-foreground ">
                        Painel do parceiro &copy; PizzaShop - {new Date().getFullYear()}
                    </footer>
                </div>
            </div>
        </>
    )
}