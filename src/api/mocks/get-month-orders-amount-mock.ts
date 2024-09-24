import { http, HttpResponse } from "msw"
import { GetMonthOrdersAmountProps } from "../get-month-orders-amount"

export const getMonthOrdersAmountMock = http.get<never, never, GetMonthOrdersAmountProps>('/metrics/month-orders-amount', () => {
    return HttpResponse.json({
        amount: 30,
        diffFromLastMonth: 5
    })
})