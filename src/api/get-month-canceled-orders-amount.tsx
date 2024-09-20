import { api } from "@/lib/api";

export interface GetMonthCanceledOrdersAmountProps {
    amount: number;
    diffFromLastMonth: number;
}

export async function getMonthCanceledOrdersAmount() {
    const response = await api.get<GetMonthCanceledOrdersAmountProps>('/metrics/month-canceled-orders-amount');

    return response.data;
}