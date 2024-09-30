import { createOrder } from "@/api/create-order";
import { getManagedRestaurant } from "@/api/get-managed-restaurant";
import { getProductsByRestaurant } from "@/api/get-products-by-restaurant";
import { Button } from "@/components/ui/button";
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableRow, TableCell, TableHead, TableHeader, TableFooter } from "@/components/ui/table";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Minus, Pencil, Plus, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export function CreateOrder() {
    const { mutateAsync: createOrderFn } = useMutation({
        mutationFn: createOrder,
    });

    const { data: restaurant } = useQuery({
        queryKey: ['managed-restaurant'],
        queryFn: getManagedRestaurant,
    })

    const restaurantId = restaurant?.id

    const { data: product } = useQuery({
        queryKey: ['product', restaurantId],
        queryFn: () => {
            if (restaurantId) {
                return getProductsByRestaurant({ restaurantId })
            }
        },
        enabled: Boolean(restaurantId)
    })

    const CreateOrderFormSchema = z.object({
        product: z.object({
            id: z.string(),
            name: z.string(),
            priceInCents: z.number(),
            quantity: z.number().min(1)
        }).optional(),
    })

    type createOrderForm = z.infer<typeof CreateOrderFormSchema>

    const { control,
        setValue,
        getValues,
        handleSubmit,
        watch,
        formState: {
            isSubmitting
        }
    } = useForm<createOrderForm>({
        resolver: zodResolver(CreateOrderFormSchema),
        defaultValues: {
            product: {
                id: 'default',
                name: '',
                priceInCents: 0,
                quantity: 1
            }
        }
    })

    async function handleCreateOrder({ product }: createOrderForm) {
        if (product && restaurantId) {
            const newProduct = productList.map(({ id, quantity }) => ({
                productId: id, quantity
            }))

            try {
                await createOrderFn({ restaurantId, product: newProduct });

                toast.success('Pedido criado com sucesso!')
            } catch (error) {
                toast.error('Erro ao criar o pedido.')
            }
        }
    }

    function handleDecreaseQuantity() {
        const currentyQuantity = getValues("product.quantity")
        if (currentyQuantity > 1) {
            setValue("product.quantity", currentyQuantity - 1)
        }
    }

    function handleIncreaseQuantity() {
        const currentyQuantity = getValues("product.quantity")
        setValue("product.quantity", currentyQuantity + 1)
    }

    interface ProductListProps {
        id: string;
        name: string;
        priceInCents: number;
        quantity: number;
    }

    const [productList, setProductList] = useState<ProductListProps[]>([])

    const [editingProductId, setEditingProductId] = useState<string | null>(null)

    function handleBuildOrder() {
        const id = getValues('product.id')
        const name = product?.find((product) => id === product.id)?.name
        const priceInCents = product?.find((product) => id === product.id)?.priceInCents ?? 0
        const quantity = getValues('product.quantity')

        if (id !== 'default' && name && quantity > 0) {
            const newProduct: ProductListProps = {
                id,
                name,
                quantity,
                priceInCents
            }

            setProductList(prevProduct => {
                const existingItemIndex = productList.findIndex((item) => item.id === id)

                if (existingItemIndex !== -1) {
                    const updatedItem = [...prevProduct]

                    if (editingProductId) {
                        updatedItem[existingItemIndex] = {
                            ...updatedItem[existingItemIndex],
                            quantity
                        }
                    } else {
                        updatedItem[existingItemIndex] = {
                            ...updatedItem[existingItemIndex],
                            quantity: updatedItem[existingItemIndex].quantity + quantity
                        }
                    }
                    return updatedItem
                } else {
                    return [...prevProduct, newProduct]
                }
            })
            setEditingProductId(null)
        }
    }

    function handleEditProductFromList(productId: string) {
        const product = productList.filter((product) => product.id === productId)[0]

        setValue("product", product)
        setEditingProductId(product.id)
    }

    function handleDeleteProductFromList(productId: string) {
        const newProductList = productList.filter((product) => product.id !== productId)
        setProductList(newProductList)
    }

    function onChangeValueProduct() {
        setEditingProductId(null)
        setValue("product.quantity", 1)
    }

    const totalOrder = productList.reduce((acc, { priceInCents, quantity }) => {
        acc += priceInCents * quantity

        return acc
    }, 0)

    const lastProductRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        if (lastProductRef.current) {
            lastProductRef.current.scrollTop = lastProductRef.current.scrollHeight
        }
    }, [productList])

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle className="text-left">Criar um novo pedido</DialogTitle>
                <DialogDescription className="text-left">Informe os detalhes necessários para prosseguir com o pedido</DialogDescription>
            </DialogHeader>
            <Separator />
            <form className="space-y-5" onSubmit={handleSubmit(handleCreateOrder)}>
                <div className="flex flex-col gap-2">
                    <div className="flex justify-between">
                        <Label className="text-sm text-muted-foreground">Produto</Label>
                        <Label className="text-sm text-muted-foreground">Quantidade</Label>
                    </div>
                    <div className="flex gap-5 items-center">
                        <Controller
                            control={control}
                            name="product.id"
                            render={({ field: {
                                onChange, value, name, disabled
                            } }) => {
                                return (
                                    <>
                                        <Select
                                            defaultValue="default"
                                            name={name}
                                            value={value}
                                            onValueChange={(selectedValue) => {
                                                onChange(selectedValue)
                                                onChangeValueProduct()
                                            }}
                                            disabled={disabled}
                                        >
                                            <SelectTrigger className="h-8 w-full">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem
                                                    value="default"
                                                    disabled
                                                >Selecione um item</SelectItem>
                                                {product && product.map((item) => {
                                                    return (
                                                        <SelectItem value={item.id} key={item.id}>{item.name} - {(item.priceInCents / 100).toLocaleString('pt-BR', {
                                                            style: 'currency',
                                                            currency: 'BRL'
                                                        })}</SelectItem>
                                                    )
                                                })}
                                            </SelectContent>
                                        </Select >
                                    </>
                                )
                            }}
                        />
                        <div className="flex gap-2">
                            <Button
                                variant="secondary"
                                type="button"
                                onClick={() => handleDecreaseQuantity()}
                                size="icon"
                            >
                                <Minus size={16} />
                            </Button>
                            <Controller
                                name="product.quantity"
                                control={control}
                                render={({ field }) => {
                                    return (
                                        <Input
                                            type="number"
                                            min={1}
                                            className="[&::-webkit-inner-spin-button]:appearance-none text-center text-base font-semibold w-14"
                                            {...field}
                                            onChange={(e) => {
                                                const newQuantity = Math.max(1, Number(e.target.value))
                                                field.onChange(newQuantity)
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    e.preventDefault()
                                                }
                                            }}
                                        />
                                    )
                                }}
                            />
                            <Button
                                variant="secondary"
                                type="button"
                                onClick={() => handleIncreaseQuantity()}
                                size="icon"
                            >
                                <Plus size={16} />
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end">
                    <Button
                        variant="secondary"
                        type="button"
                        className="w-[152px] disabled:cursor-not-allowed"
                        onClick={() => handleBuildOrder()}
                        disabled={(watch('product.id') === 'default')}
                    >{editingProductId ? 'Atualizar quantidade' : 'Adicionar produto'}</Button>
                </div>
                {productList.length > 0 && (
                    <div className="max-h-80 overflow-y-auto scrollbar-webkit" ref={lastProductRef}>
                        <Table>
                            <TableHeader className="sticky top-0 z-10 bg-background">
                                <TableRow>
                                    <TableHead className="text-center">Açoes</TableHead>
                                    <TableHead>Produto</TableHead>
                                    <TableHead className="text-right">Quantidade</TableHead>
                                    <TableHead className="text-right text-nowrap">Total (R$)</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody className="relative top-1">
                                {productList.map((product) => {
                                    return (
                                        <TableRow
                                            key={product.id} className="font-semibold"
                                        >
                                            <TableCell className="text-muted-foreground flex items-center justify-between gap-2">
                                                <Button
                                                    variant="outline" size="icon"
                                                    onClick={() => handleEditProductFromList(product.id)}
                                                    type="button"
                                                    className="text-blue-500"
                                                >
                                                    <Pencil size={18} />
                                                </Button>
                                                <Button
                                                    variant="outline" size="icon"
                                                    onClick={() => handleDeleteProductFromList(product.id)}
                                                    type="button"
                                                    className="text-rose-500"
                                                >
                                                    <Trash2 size={18} />
                                                </Button>
                                            </TableCell>
                                            <TableCell className="text-muted-foreground">
                                                {product.name}
                                            </TableCell>
                                            <TableCell className="text-muted-foreground text-right">
                                                {product.quantity}
                                            </TableCell>
                                            <TableCell className="text-muted-foreground text-right">
                                                {(product.quantity * product.priceInCents / 100).toLocaleString('pt-BR', {
                                                    style: 'currency',
                                                    currency: 'BRL'
                                                })}
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                            <TableFooter className="sticky bottom-0 bg-background">
                                <TableRow>
                                    <TableCell colSpan={3}>Total do pedido</TableCell>
                                    <TableCell className="text-right">{(totalOrder / 100).toLocaleString('pt-BR', {
                                        style: 'currency',
                                        currency: 'BRL'
                                    })}</TableCell>
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </div>
                )}

                <div className="flex justify-center">
                    <Button
                        className="w-fit px-10"
                        variant="secondary"
                        type="submit"
                        disabled={isSubmitting || !(productList.length)}
                    >Criar pedido</Button>
                </div>
            </form>
        </DialogContent >
    );
}
