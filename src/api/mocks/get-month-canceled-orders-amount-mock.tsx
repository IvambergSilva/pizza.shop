import { http, HttpResponse } from "msw"
import { GetMonthCanceledOrdersAmountProps } from "../get-month-canceled-orders-amount"

export const getMonthCanceledOrdersAmountMock = http.get<never, never, GetMonthCanceledOrdersAmountProps>('/metrics/month-canceled-orders-amount', () => {
    return HttpResponse.json({
        amount: 40,
        diffFromLastMonth: 9
    })
})