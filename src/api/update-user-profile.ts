import { api } from "@/lib/api";

export interface UpdateUserProfileProps {
    name: string;
    email: string;
    phone: string | null;
}

export async function updateUserProfile({ name, email, phone }: UpdateUserProfileProps) {
    await api.put('/user/name', { name, email, phone })
}
