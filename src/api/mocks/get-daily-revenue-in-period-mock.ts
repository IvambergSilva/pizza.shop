import { http, HttpResponse } from "msw"
import { GetDailyRevenueInPeriodProps } from "../get-daily-revenue-in-period"

export const getDailyRevenueInPeriodMock = http.get<never, never, GetDailyRevenueInPeriodProps[]>('/metrics/daily-receipt-in-period', () => {
    return HttpResponse.json([
        { date: '06/09/2024', receipt: 1000, },
        { date: '07/09/2024', receipt: 2400, },
        { date: '08/09/2024', receipt: 2000, },
        { date: '09/09/2024', receipt: 700, },
        { date: '10/09/2024', receipt: 5500, },
        { date: '11/09/2024', receipt: 2700, },
        { date: '12/09/2024', receipt: 1000, },
    ])
})
