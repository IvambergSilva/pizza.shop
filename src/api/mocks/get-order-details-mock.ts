import { http, HttpResponse } from "msw"
import { GetOrderDetailsParams, GetOrderDetailsProps } from "../get-order-details"
import { orders } from "./get-orders-mock"

const orderItems = [
    {
        id: 'order-1',
        priceInCents: 120,
        product: {
            name: 'Pizza 01',
        },
        quantity: 1
    },
    {
        id: 'order-2',
        priceInCents: 240,
        product: {
            name: 'Pizza 02',
        },
        quantity: 1
    },
    {
        id: 'order-3',
        priceInCents: 360,
        product: {
            name: 'Pizza 03',
        },
        quantity: 2
    },
]

export const getOrderDetailsMock = http.get<GetOrderDetailsParams, never, GetOrderDetailsProps>('/orders/:orderId', ({ params }) => {
    const orderDetails = orders.filter((order) => order.orderId === params.orderId)

    const { status, createdAt, customerName, total: totalInCents, orderId } = orderDetails[0]

    return HttpResponse.json({
        id: orderId,
        customer: {
            name: customerName,
            email: 'johndoe@example.com',
            phone: '99 99999-9999'
        },
        totalInCents,
        status,
        createdAt,
        orderItems
    })
})