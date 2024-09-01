import { api } from "@/lib/api";

interface RegisterRestaurantProps {
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
    await api.post('/authenticate', {
        restaurantName,
        managerName,
        email,
        phone
    })
}