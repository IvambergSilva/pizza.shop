import { updateUserProfile } from "@/api/update-user-profile";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { getProfile, GetProfileProps } from "@/api/get-profile";
import { toast } from "sonner";
import { formatPhoneNumber } from "@/utils/format-phone-number";

export function UserProfileDialog() {
    const { data: profile } = useQuery({
        queryKey: ['profile'],
        queryFn: getProfile,
        staleTime: Infinity
    })

    const userProfileFormSchema = z.object({
        name: z.string().min(1),
        email: z.string().email(),
        phone: z.string().nullable()
    })

    type userProfileForm = z.infer<typeof userProfileFormSchema>

    const {
        register,
        handleSubmit,
        control,
        formState: {
            isSubmitting
        }
    } = useForm<userProfileForm>({
        resolver: zodResolver(userProfileFormSchema),
        values: {
            name: profile?.name ?? '',
            email: profile?.email ?? '',
            phone: profile?.phone ?? ''
        }
    })

    const queryClient = useQueryClient()

    const { mutateAsync: updateUserProfileFn } = useMutation({
        mutationFn: updateUserProfile,
        onMutate({ name, email, phone }) {
            const { cached } = updateUserProfileCache({ name, email, phone })

            return { previousProfile: cached }
        },
        onError(_, __, context) {
            if (context?.previousProfile) {
                updateUserProfileCache(context.previousProfile)
            }
        }
    })

    function updateUserProfileCache({ name, email, phone }: userProfileForm) {
        const cached = queryClient.getQueryData<GetProfileProps>(['profile'])

        if (cached) {
            queryClient.setQueryData<GetProfileProps>(['profile'], {
                ...cached,
                name,
                email,
                phone
            })
        }

        return { cached }
    }

    async function handleUpdateUser({
        name, email, phone
    }: userProfileForm) {
        try {
            await updateUserProfileFn({
                name, email, phone
            })

            toast.success('Perfil atualizado com sucesso!')
        } catch (error) {
            toast.error('Falha ao atualizar o perfil, tente novamente.')
        }
    }

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Perfil do usuário</DialogTitle>
                <DialogDescription>Atualize as informações do seu perfil</DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit(handleUpdateUser)}>
                <div className="space-y-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-left">Nome</Label>
                        <Input
                            id="name"
                            className="col-span-3"
                            {...register("name")}
                        />
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-left">Email</Label>
                        <Input
                            type="email"
                            className="col-span-3"
                            {...register("email")}
                        />
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="phone" className="text-left">Telefone</Label>
                        <Controller
                            name="phone"
                            control={control}
                            render={({
                                field: {
                                    value, onChange
                                }
                            }) => {
                                return (
                                    <Input
                                        type="tel"
                                        className="col-span-3"
                                        maxLength={15}
                                        onChange={(e) => onChange(e.target.value)}
                                        value={formatPhoneNumber(value || '')}
                                    />
                                )
                            }}
                        />
                    </div>
                </div>
                <DialogFooter className="flex gap-2">
                    <DialogClose>
                        <Button
                            className="w-full"
                            type="button"
                            variant="ghost"
                        >Cancelar</Button>
                    </DialogClose>
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        variant="success"
                        className="disabled:cursor-not-allowed disabled:opacity-80"
                    >Salvar</Button>
                </DialogFooter>
            </form>
        </DialogContent>
    )
}
