import { api } from "@/lib/api";

export interface GetOrderParams {
    pageIndex?: number | null;
    orderId?: string | null;
    customerName?: string | null;
    status?: string | null;
    priceSorting?: string | null
}

export interface GetOrdersProps {
    orders: {
        orderId: string;
        createdAt: string;
        status: "pending" | "canceled" | "processing" | "delivering" | "delivered";
        customerName: string;
        total: number;
    }[];
    meta: {
        pageIndex: number;
        perPage: number;
        totalCount: number;
    };
}

export async function getOrders({ pageIndex, customerName, orderId, status, priceSorting }: GetOrderParams) {
    const response = await api.get<GetOrdersProps>('/orders', {
        params: {
            pageIndex,
            customerName,
            orderId,
            status,
            priceSorting
        }
    });

    return response.data;
}