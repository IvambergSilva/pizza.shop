import { http, HttpResponse } from "msw"
import { GetManagedRestaurantProps } from "../get-managed-restaurant"

export const getManagedRestaurantMock = http.get<never, never, GetManagedRestaurantProps>('/managed-restaurant', () => {
    return HttpResponse.json({
        id: 'custom-restaurant-id',
        name: 'MAJOSI',
        createdAt: new Date(),
        updatedAt: null,
        description: 'Custom restaurant description',
        managerId: 'custom-user-id',
    })
})