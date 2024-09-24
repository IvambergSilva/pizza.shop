import { http, HttpResponse } from "msw"
import { RegisterRestaurantProps } from "../register-restaurant"

export const registerRestaurantMock = http.post<never, RegisterRestaurantProps>('/restaurants', async ({ request }) => {
    const { restaurantName } = await request.json()

    if (restaurantName === 'MAJOSI') {
        return new HttpResponse(null, { status: 200, })
    }

    return new HttpResponse(null, { status: 400 })
})