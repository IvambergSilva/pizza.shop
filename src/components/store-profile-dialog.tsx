import { useMutation, useQuery } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { getManagedRestaurant } from "@/api/get-managed-restaurant";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { updateProfile } from "@/api/update-profile";
import { DialogClose } from "@radix-ui/react-dialog";

export function StoreProfileDialog() {
    const { data: managedRestaurant } = useQuery({
        queryKey: ['managed-restaurant'],
        queryFn: getManagedRestaurant,
        staleTime: Infinity
    })

    const storeProfileFormSchema = z.object({
        name: z.string().min(1),
        description: z.string()
    })

    type storeProfileForm = z.infer<typeof storeProfileFormSchema>

    const {
        register,
        handleSubmit,
        formState: {
            isSubmitting
        }
    } = useForm<storeProfileForm>({
        resolver: zodResolver(storeProfileFormSchema),
        values: {
            name: managedRestaurant?.name ?? '',
            description: managedRestaurant?.description ?? ''
        }
    })

    const { mutateAsync: updateProfileFn } = useMutation({
        mutationFn: updateProfile
    })

    async function handleUpdateProfile(data: storeProfileForm) {
        try {
            await updateProfileFn({
                name: data.name,
                description: data.description,
            })

            toast.success('Perfil atualizado com sucesso!')
        } catch (error) {
            toast.error('Falha ao atualizar o perfil, tente novamente')
        }
    }

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Perfil da loja</DialogTitle>
                <DialogDescription>Atualize as informações do seu estabelecimento visíveis ao seu cliente</DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit(handleUpdateProfile)}>
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
                        <Label htmlFor="description" className="text-left">Descrição</Label>
                        <Textarea
                            id="description"
                            className="col-span-3 resize-none"
                            {...register("description")}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose>
                        <Button type="button" variant="ghost">Cancelar</Button>
                    </DialogClose>
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        variant="success"
                    >Salvar</Button>
                </DialogFooter>
            </form>
        </DialogContent>
    )
}
