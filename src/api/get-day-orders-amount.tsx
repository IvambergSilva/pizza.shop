import { api } from "@/lib/api";

export interface GetDayOrdersAmountProps {
    amount: number;
    diffFromYesterday: number;
}

export async function getDayOrdersAmount() {
    const response = await api.get<GetDayOrdersAmountProps>('/metrics/day-orders-amount');

    return response.data;
}