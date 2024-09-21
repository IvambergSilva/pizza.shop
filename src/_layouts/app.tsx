import { Header } from "@/components/header";
import { Outlet } from "react-router-dom";

export function AppLayout() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <div className="flex flex-1 flex-col gap-4 px-4 py-6 lg:px-16">
                <Outlet />
            </div>
        </div>
    )
}
