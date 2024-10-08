import { api } from "@/lib/api";

export interface GetProfileProps {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    role: "manager" | "customer";
    createdAt: Date | null;
    updatedAt: Date | null;
}

export async function getProfile() {
    const response = await api.get<GetProfileProps>('/me');

    return response.data;
}