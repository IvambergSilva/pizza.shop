import { api } from "@/lib/api";

export interface SignInProps {
    email: string;
}

export async function signIn({ email }: SignInProps) {
    await api.post('/authenticate', { email })
}