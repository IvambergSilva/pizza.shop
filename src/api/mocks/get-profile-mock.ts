import { http, HttpResponse } from "msw"
import { GetProfileProps } from "../get-profile"

export const getProfileMock = http.get<never, never, GetProfileProps>('/me', () => {
    return HttpResponse.json({
        id: 'custom-user-id',
        email: 'johndoe@example.com',
        name: 'John Doe',
        phone: '99 9 99999-9999',
        role: 'manager',
        createdAt: new Date(),
        updatedAt: null
    })
})