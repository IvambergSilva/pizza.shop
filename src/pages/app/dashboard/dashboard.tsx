import { Helmet } from "react-helmet-async"
import { MonthOrdersAmountCard } from "./month-orders-amount-card"
import { MonthRevenueCard } from "./month-revenue-card"
import { DayOrdersAmountCard } from "./day-orders-amount-card"
import { RevenueChart } from "./revenue-chart"
import { PopularProductsChart } from "./popular-products-chart"
import { MonthCanceledOrdersAmountCard } from "./month-canceled-orders-amount-card"
import { UpdateProduct } from "../../../components/update-product"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { GetCustomer } from "@/components/get-customer"

export function Dashboard() {
    return (
        <>
            <Helmet title="Dashboard" />
            <div className="flex flex-col gap-4">
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <div className="grid grid-cols-2 mdLg:grid-cols-4 gap-4">
                    <MonthRevenueCard />
                    <MonthOrdersAmountCard />
                    <DayOrdersAmountCard />
                    {/* <MonthCanceledOrdersAmountCard /> */}
                    <Dialog>
                        <DialogTrigger>
                            Abrir
                        </DialogTrigger>
                        <UpdateProduct />
                    </Dialog>
                    <GetCustomer />
                </div>

                <div className="grid grid-cols-1 mdLg:grid-cols-9 gap-4">
                    <RevenueChart />
                    <PopularProductsChart />
                </div>
            </div>
        </>
    )
}

