import { http, HttpResponse } from "msw"
import { UpdateProfileProps } from "../update-profile"

export const updateProfileMock = http.put<never, UpdateProfileProps>('/profile', async ({ request }) => {
    const { name } = await request.json()

    if (name === 'Pizza Shop') {
        return HttpResponse.json(null, { status: 200 })
    }

    return new HttpResponse(null, { status: 400 })
})