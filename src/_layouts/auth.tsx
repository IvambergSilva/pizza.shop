import { Pizza } from "lucide-react";
import { Outlet } from "react-router-dom";

export function AuthLayout() {
    return (
        <div className="min-h-screen grid grid-cols-2">
            <div className="h-full border border-foreground/5 bg-muted text-muted-foreground p-10 flex flex-col justify-between">
                <div className="flex items-center gap-3 text-lg text-foreground">
                    <Pizza className="h-5 w-5" />
                    <span className="font-semibold">PizzaShop</span>
                </div>
                <footer className="text-sm">
                    Painel do parceiro &copy; PizzaShop - {new Date().getFullYear()}
                </footer>
            </div>
            <div className="flex flex-col justify-center items-center relative">
                <Outlet />
            </div>
        </div>
    )
}