import { api } from "@/lib/api";

interface SignInProps {
    email: string;
}

export async function signIn({ email }: SignInProps) {
    await api.post('/authenticate', { email })
}