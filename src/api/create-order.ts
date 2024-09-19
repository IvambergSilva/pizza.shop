import { api } from "@/lib/api";

export interface CreateOrderProps {
    restaurantId: string;
    product: {
        productId: string;
        quantity: number;
    }[]
}

export async function createOrder({ restaurantId, product }: CreateOrderProps) {
    const response = await api.post(`/restaurants/${restaurantId}/orders`, {
        product
    })

    return response.data
}