import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import { signIn } from "../../api/sign-in";

export function SignIn() {
    const [searchParams] = useSearchParams();

    const signInFormSchema = z.object({
        email: z.string().email()
    })

    type signInForm = z.infer<typeof signInFormSchema>

    const { register,
        handleSubmit,
        formState: {
            isSubmitting }
    } = useForm<signInForm>({
        defaultValues: {
            email: searchParams.get('email') ?? ''
        }
    })

    const { mutateAsync: authenticate } = useMutation({
        mutationFn: signIn,
    });

    async function handleSignIn(data: signInForm) {
        try {
            await authenticate({ email: data.email })

            toast.success('Enviamos um link de autenticação para o seu-email!')
        } catch (error) {
            toast.error('Credenciais inválidas.')
        }
    }

    return (
        <>
            <Helmet title="Login" />
            <div className="p-8 ">
                <Button
                    className="absolute right-10 top-10"
                    variant="outline"
                    asChild
                >
                    <Link to={"/sign-up"}>
                        Novo estabelecimento
                    </Link>
                </Button>
                <div className="w-full flex flex-col justify-center gap-6">
                    <div className="flex flex-col gap-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">Acessar painel</h1>
                        <p className="text-sm text-muted-foreground">Acompanhe as suas vendas pelo painel do parceiro!</p>
                    </div>
                    <form
                        className="space-y-4"
                        onSubmit={handleSubmit(handleSignIn)}
                    >
                        <div className="space-y-2">
                            <Label htmlFor="email">Seu email</Label>
                            <Input
                                id="email"
                                type="email"
                                {...register("email")}
                            />
                        </div>
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isSubmitting}
                        >Acessar painel</Button>
                    </form>
                </div>
            </div >
        </>
    )
}
