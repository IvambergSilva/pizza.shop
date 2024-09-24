import { http, HttpResponse } from "msw"
import { GetMonthRevenueProps } from "../get-month-revenue"

export const getMonthRevenueMock = http.get<never, never, GetMonthRevenueProps>('/metrics/month-receipt', () => {
    return HttpResponse.json({
        receipt: 23010,
        diffFromLastMonth: 20
    })
})
