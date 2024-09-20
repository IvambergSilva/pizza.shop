import { api } from "@/lib/api";

export interface GetMonthOrdersAmountProps {
    amount: number;
    diffFromLastMonth: number;
}

export async function getMonthOrdersAmount() {
    const response = await api.get<GetMonthOrdersAmountProps>('/metrics/month-orders-amount');

    return response.data;
}