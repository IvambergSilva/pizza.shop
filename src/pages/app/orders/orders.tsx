import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Helmet } from "react-helmet-async";
import { OrderTableRow } from "./order-table-row";
import { OrderTableFilters } from "./order-table-filters";
import { Pagination } from "@/components/pagination";
import { useQuery } from "@tanstack/react-query";
import { getOrders } from "@/api/get-orders";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";
import { OrderTableSkeleton } from "./order-table-skeleton";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { CreateOrder } from "./create-order";

export function Orders() {
    const [searchParams, setSearchParams] = useSearchParams()

    const customerName = searchParams.get('customerName')
    const orderId = searchParams.get('orderId')
    const status = searchParams.get('status')
    const priceSorting = searchParams.get('priceSorting')

    const pageIndex = z.coerce.number()
        .transform(page => page - 1)
        .parse(searchParams.get('page') ?? '1')

    const { data: result, isLoading: isLoadingOrders } = useQuery({
        queryKey: ['orders', pageIndex, customerName, orderId, status, priceSorting],
        queryFn: () => getOrders({
            pageIndex,
            customerName,
            orderId,
            status: status === 'all' ? null : status,
            priceSorting: priceSorting === 'all' ? null : priceSorting
        })
    })

    function handelPageChange(pageIndex: number) {
        setSearchParams((state) => {
            state.set('page', (pageIndex + 1).toString())

            return state
        })
    }

    return (
        <>
            <Helmet title="Pedidos" />
            <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold tracking-tight">Pedidos</h1>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button type="button" variant="secondary" className="flex items-center gap-2">
                                <CirclePlus size={16} />
                                Novo pedido
                            </Button>
                        </DialogTrigger>
                        <CreateOrder />
                    </Dialog>
                </div>
                <div className="space-y-2.5">
                    <OrderTableFilters />
                    <div className="border rounded-md overflow-x-scroll whitespace-nowrap scrollbar-webkit">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[64px]"></TableHead>
                                    <TableHead className="w-[100px]">Identificador</TableHead>
                                    <TableHead className="w-[148px] text-nowrap">Realizado há</TableHead>
                                    <TableHead className="w-[180px]">Status</TableHead>
                                    <TableHead>Cliente</TableHead>
                                    <TableHead className="w-[140px] text-nowrap">Total do pedido</TableHead>
                                    <TableHead className="w-[164px]"></TableHead>
                                    <TableHead className="w-[132px]"></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {isLoadingOrders && (
                                    <OrderTableSkeleton />
                                )}
                                {result && (
                                    result.orders.map((order) => {
                                        return (
                                            <OrderTableRow
                                                key={order.orderId}
                                                order={order}
                                            />
                                        )
                                    })
                                )}
                            </TableBody>
                        </Table>
                    </div>
                    {result && (
                        <Pagination
                            pageIndex={result.meta.pageIndex}
                            totalCount={result.meta.totalCount}
                            perPage={result.meta.perPage}
                            onPageChange={handelPageChange}
                        />
                    )}
                </div>
            </div>
        </>
    )
}
