import { api } from "@/lib/api";

interface getDailyRevenueInPeriodQuery {
    from?: Date;
    to?: Date;
}

export interface GetDailyRevenueInPeriodProps {
    date: string;
    receipt: number;
}

export async function getDailyRevenueInPeriod({ from, to }: getDailyRevenueInPeriodQuery) {
    const response = await api.get<GetDailyRevenueInPeriodProps[]>(`metrics/daily-receipt-in-period`, {
        params: {
            from, to
        }
    });

    return response.data;
}