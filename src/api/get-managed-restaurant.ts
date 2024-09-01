import { api } from "@/lib/api";

interface GetManagedRestaurantProps {
    id: string;
    name: string;
    createdAt: Date | null;
    updatedAt: Date | null;
    description: string | null;
    managerId: string | null;
}

export async function getManagedRestaurant() {
    const response = await api.get<GetManagedRestaurantProps>('/managed-restaurant');

    return response.data;
}