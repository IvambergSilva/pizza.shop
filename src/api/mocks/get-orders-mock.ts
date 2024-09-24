import { http, HttpResponse } from "msw"
import { GetOrdersProps } from "../get-orders"

type Orders = GetOrdersProps['orders']

type Status = GetOrdersProps['orders'][number]['status']
const statuses: Status[] = [
    "pending",
    'processing',
    "delivering",
    "delivered",
    "canceled",
]

export const orders: Orders = Array.from({ length: 50 }).map((_, index) => {
    return {
        orderId: `order-${index + 1}`,
        customerName: `Customer - ${index + 1}`,
        createdAt: (new Date()).toISOString(),
        total: 240 * (index / 2 + 1),
        status: statuses[index % 5],
    }
})

export const getOrdersMock = http.get<never, never, GetOrdersProps>('/orders', async ({ request }) => {
    const { searchParams } = new URL(request.url)

    const pageIndex = searchParams.get('pageIndex')
        ? Number(searchParams.get('pageIndex'))
        : 0

    const customerName = searchParams.get('customerName')
    const orderId = searchParams.get('orderId')
    const status = searchParams.get('status')
    const priceSorting = searchParams.get('priceSorting')

    let filtersOrders = orders

    if (customerName) {
        filtersOrders = filtersOrders.filter((order) => order.customerName.includes(customerName))
    }

    if (orderId) {
        filtersOrders = filtersOrders.filter((order) => order.orderId.includes(orderId))
    }

    if (status) {
        filtersOrders = filtersOrders.filter((order) => order.status === status)
    }

    if (priceSorting === 'desc') {
        filtersOrders = filtersOrders.sort((orderA, orderB) => orderB.total - orderA.total)
    } else {
        filtersOrders = filtersOrders.sort((orderA, orderB) => orderA.total - orderB.total)
    }

    const paginatedOrders = filtersOrders.slice(
        pageIndex * 10,
        (pageIndex + 1) * 10,
    )

    return HttpResponse.json({
        orders: paginatedOrders,
        meta: {
            pageIndex,
            perPage: 10,
            totalCount: filtersOrders.length
        }
    })
})