import { Building, ChevronDown, LogOut, User } from "lucide-react";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { getProfile } from "@/api/get-profile";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getManagedRestaurant } from "@/api/get-managed-restaurant";
import { Skeleton } from "./ui/skeleton";
import { signOut } from "@/api/sign-out";
import { useNavigate } from "react-router-dom";
import { Dialog } from "./ui/dialog";
import { StoreProfileDialog } from "./store-profile-dialog";
import { useState } from "react";
import { UserProfileDialog } from "./user-profile-dialog";

export function AccountMenu() {
    const [isUserProfileOpen, setUserProfileOpen] = useState(false);
    const [isStoreProfileOpen, setStoreProfileOpen] = useState(false);

    const { data: profile, isLoading: isLoadingProfile } = useQuery({
        queryKey: ['profile'],
        queryFn: getProfile,
        staleTime: Infinity
    })

    const { data: managedRestaurant, isLoading: isLoadingManagedRestaurant } = useQuery({
        queryKey: ['managed-restaurant'],
        queryFn: getManagedRestaurant,
        staleTime: Infinity
    })

    const { mutateAsync: signOutFn } = useMutation({
        mutationFn: signOut
    })

    const navigate = useNavigate();

    async function handleSignOutFn() {
        await signOutFn();
        navigate('/sign-in', { replace: true })
    }

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2 select-none">
                        {isLoadingManagedRestaurant
                            ? <Skeleton className="h-5 w-[118px]" />
                            : managedRestaurant?.name
                        }
                        <ChevronDown className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel className="flex flex-col gap-1">
                        {isLoadingProfile
                            ? (
                                <div className="space-y-2">
                                    <Skeleton className="h-5 w-32" />
                                    <Skeleton className="h-4 w-40" />
                                </div>
                            ) : (
                                <>
                                    <span>{profile?.name}</span>
                                    <span className="text-xs font-normal text-muted-foreground">{profile?.email}</span>
                                </>
                            )
                        }
                    </DropdownMenuLabel>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() => setUserProfileOpen(true)}
                    >
                        <User className="h-4 w-4 mr-2" />
                        <span>Perfil do usuário</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() => setStoreProfileOpen(true)}
                    >
                        <Building className="h-4 w-4 mr-2" />
                        <span>Perfil da loja</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        className="text-rose-500 dark:text-rose-400 cursor-pointer"
                        onClick={() => handleSignOutFn()}
                    >
                        <LogOut className="h-4 w-4 mr-2" />
                        <span>Sair</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <Dialog
                open={isUserProfileOpen}
                onOpenChange={setUserProfileOpen}
            >
                <UserProfileDialog />
            </Dialog>

            <Dialog
                open={isStoreProfileOpen}
                onOpenChange={setStoreProfileOpen}
            >
                <StoreProfileDialog />
            </Dialog>
        </>
    )
}
