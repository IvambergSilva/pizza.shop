import { api } from "@/lib/api";

export interface GetPopularProdutsProps {
    product: string;
    amount: number;
};

export async function getPopularProduts() {
    const response = await api.get<GetPopularProdutsProps[]>(`metrics/popular-products`);
    
    return response.data;
}