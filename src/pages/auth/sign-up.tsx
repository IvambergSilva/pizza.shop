import { registerRestaurant } from "@/api/register-restaurant";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

export function SignUp() {
    const signUpDataFormSchema = z.object({
        restaurantName: z.string().min(1),
        managerName: z.string().min(1),
        phone: z.string().min(1),
        email: z.string().email()
    })

    type signUpForm = z.infer<typeof signUpDataFormSchema>

    const { register,
        handleSubmit,
        formState: {
            isSubmitting }
    } = useForm<signUpForm>()

    const navigate = useNavigate();

    const { mutateAsync: registerRestaurantFn } = useMutation({
        mutationFn: registerRestaurant
    })

    async function handleSignUp({
        restaurantName,
        managerName, 
        email,
        phone
    }: signUpForm) {
        try {
            registerRestaurantFn({
                restaurantName,
                managerName,
                phone,
                email,
            })

            toast.success('Restaurante cadastrado com sucesso!', {
                action: {
                    label: "Fazer login",
                    onClick: () => {
                        navigate(`/sign-in?email=${email}`)
                    }
                }
            })
        } catch (error) {
            toast.error('Erro ao cadadstrar restaurante.')
        }
    }

    return (
        <>
            <Helmet title="Cadastro" />
            <div className="p-8 ">
                <Button
                    className="absolute right-10 top-10"
                    variant="outline"
                    asChild
                >
                    <Link to={"/sign-in"}>
                        Fazer login
                    </Link>
                </Button>
                <div className="w-full flex flex-col justify-center gap-6">
                    <div className="flex flex-col gap-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">Criar conta grátis</h1>
                        <p className="text-sm text-muted-foreground">Seja um parceiro e comece suas vendas!</p>
                    </div>
                    <form
                        className="space-y-4"
                        onSubmit={handleSubmit(handleSignUp)}
                    >
                        <div className="space-y-2">
                            <Label htmlFor="restaurantName">Nome do seu estabelecimento</Label>
                            <Input
                                id="restaurantName"
                                type="text"
                                {...register("restaurantName")}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="managerName">Seu nome</Label>
                            <Input
                                id="managerName"
                                type="text"
                                {...register("managerName")}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Seu email</Label>
                            <Input
                                id="email"
                                type="email"
                                {...register("email")}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone">Seu celular</Label>
                            <Input
                                id="phone"
                                type="tel"
                                {...register("phone")}
                            />
                        </div>
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isSubmitting}
                        >Finalizar cadastro</Button>
                        <p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">Ao continuar, você concorda com nossos <a href="" className="underline underline-offset-4">termos de serviço</a> e <a href="" className="underline underline-offset-4">políticas de privacidade</a>.</p>
                    </form>
                </div>
            </div>
        </>
    )
}