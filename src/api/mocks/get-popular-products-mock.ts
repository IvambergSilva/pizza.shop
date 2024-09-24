import { http, HttpResponse } from "msw"
import { GetPopularProdutsProps } from "../get-popular-products"

export const getPopularProductsMock = http.get<never, never, GetPopularProdutsProps[]>('/metrics/popular-products', () => {
    return HttpResponse.json([
        { product: 'Pizza 02', amount: 20, },
        { product: 'Pizza 07', amount: 7, },
        { product: 'Pizza 05', amount: 50, },
        { product: 'Pizza 02', amount: 20, },
        { product: 'Pizza 01', amount: 10, },
    ])
})
