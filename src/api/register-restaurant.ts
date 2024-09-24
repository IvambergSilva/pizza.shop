import { api } from "@/lib/api";

export interface RegisterRestaurantProps {
    restaurantName: string;
    managerName: string;
    email: string;
    phone: string;
}

export async function registerRestaurant({
    restaurantName,
    managerName,
    email,
    phone
}: RegisterRestaurantProps) {
    await api.post('/restaurants', {
        restaurantName,
        managerName,
        email,
        phone
    })
}