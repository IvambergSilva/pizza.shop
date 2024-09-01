import { api } from "@/lib/api";

interface UpdateProfileProps {
    name: string;
    description: string | null;
}

export async function updateProfile({ name, description }: UpdateProfileProps) {
    await api.put('/profile', { name, description })
}