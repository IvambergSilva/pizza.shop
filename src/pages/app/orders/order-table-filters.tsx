import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search, X } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";

export function OrderTableFilters() {
    const [searchParams, setSearchParams] = useSearchParams()

    const customerName = searchParams.get('customerName')
    const orderId = searchParams.get('orderId')
    const status = searchParams.get('status')
    const priceSorting = searchParams.get('priceSorting')

    const orderFilterFormSchema = z.object({
        customerName: z.string().optional().transform(value => value?.trim()),
        orderId: z.string().optional().transform(value => value?.trim()),
        status: z.string().optional(),
        priceSorting: z.string().optional()
    })

    type orderFilterForm = z.infer<typeof orderFilterFormSchema>

    const {
        register,
        handleSubmit,
        control,
        getValues,
        reset
    } = useForm<orderFilterForm>({
        resolver: zodResolver(orderFilterFormSchema),
        defaultValues: {
            customerName: customerName ?? '',
            orderId: orderId ?? '',
            priceSorting: priceSorting ?? 'all',
            status: status ?? 'all'
        }
    })

    function handleFilter(params: orderFilterForm) {
        setSearchParams((state) => {
            Object.entries(params).forEach(([key, value]) => {
                if (value && value !== 'all') {
                    state.set(key, value)
                } else {
                    state.delete(key)
                }
            })

            state.set('page', '1')

            return state
        })
    }

    function handleClearFilter() {
        const filters = getValues()

        setSearchParams((state) => {
            Object.entries(filters).forEach(([key]) => {
                state.delete(key)
            })

            state.set('page', '1')

            return state
        })

        reset({
            customerName: '',
            orderId: '',
            status: 'all',
            priceSorting: 'all'
        })
    }

    return (
        <form
            onSubmit={handleSubmit(handleFilter)}
            className="grid items-center gap-3 grid-cols-2 md:grid-cols-4 lg:grid-cols-7">
            <div className="flex items-center gap-3 col-span-2 md:col-span-4 lg:col-span-3">
                <span
                    className="text-sm font-semibold"
                >Filtros:</span>
                <Input
                    id="filters"
                    className="h-8 w-2/5 min-w-[150px]"
                    placeholder="ID do pedido"
                    {...register('orderId')}
                />
                <Input
                    id="customerName"
                    className="h-8 w-full"
                    placeholder="Nome do cliente"
                    {...register('customerName')}
                />
            </div>

            <Controller
                control={control}
                name="status"
                render={({ field: {
                    name, onChange, disabled, value
                } }) => {
                    return (
                        <Select defaultValue="all" name={name} onValueChange={onChange} disabled={disabled} value={value}>
                            <SelectTrigger className="h-8 w-full">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Todos os status</SelectItem>
                                <SelectItem value="pending">Pendente</SelectItem>
                                <SelectItem value="canceled">Cancelado</SelectItem>
                                <SelectItem value="processing">Em preparo</SelectItem>
                                <SelectItem value="delivering">Em entrega</SelectItem>
                                <SelectItem value="delivered">Entregue</SelectItem>
                            </SelectContent>
                        </Select>
                    )
                }}
            />

            <Controller
                control={control}
                name="priceSorting"
                render={({ field: {
                    name, onChange, disabled, value
                } }) => {
                    return (
                        <Select defaultValue="default" name={name} onValueChange={onChange} disabled={disabled} value={value}>
                            <SelectTrigger className="h-8 w-full">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Classificar por preço</SelectItem>
                                <SelectItem value="desc">Maior para o menor</SelectItem>
                                <SelectItem value="asc">Menor para o maior</SelectItem>
                            </SelectContent>
                        </Select>
                    )
                }}
            />

            <Button
                type="button"
                variant="outline"
                size="xs"
                className="w-full"
                onClick={() => handleClearFilter()}
            >
                <X className="mr-2 h-4 w-4" />
                Remover filtros
            </Button>

            <Button
                type="submit"
                variant="secondary"
                size="xs"
                className="w-full"
            >
                <Search className="mr-2 h-4 w-4" />
                Filtrar resultados
            </Button>
        </form >
    )
}
