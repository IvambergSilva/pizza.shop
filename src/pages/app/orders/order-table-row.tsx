import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { TableRow, TableCell } from "@/components/ui/table";
import { Search, ArrowRight, X, Check, Ban } from "lucide-react";
import { OrderDetails } from "./order-details";
import { OrderStatus } from "@/components/order-status";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelOrder } from "@/api/cancel-order";
import { GetOrdersProps } from "@/api/get-orders";
import { toast } from "sonner";
import { dispatchOrder } from "@/api/dispatch-order";
import { deliverOrder } from "@/api/deliver-order";
import { approveOrder } from "@/api/approve-order";

interface OrderTableRowProps {
    order: {
        orderId: string;
        createdAt: string;
        status: "pending" | "canceled" | "processing" | "delivering" | "delivered";
        customerName: string;
        total: number;
    }
}

interface UpdateStatusOnCachedProps {
    orderId: string;
    status: "pending" | "canceled" | "processing" | "delivering" | "delivered";
}

export function OrderTableRow({ order }: OrderTableRowProps) {
    const [isDetailsOpen, setIsDetailsOpen] = useState(false)

    const queryClient = useQueryClient();

    const { mutateAsync: approveOrderFn, isPending: isApprovingOrder } = useMutation({
        mutationFn: approveOrder,
        onSuccess(_, { orderId }) {
            updateStatusOnCached({ orderId, status: 'processing' })
            toast.success('Pedido aprovado com sucesso!')
        },
        onError() {
            toast.error('Não foi possível aprovar o pedido.')
        }
    })

    const { mutateAsync: cancelOrderFn, isPending: isCancelingOrder } = useMutation({
        mutationFn: cancelOrder,
        onSuccess(_, { orderId }) {
            updateStatusOnCached({ orderId, status: 'canceled' })
            toast.success('Pedido cancelado com sucesso!')
        },
        onError() {
            toast.error('Não foi possível cancelar o pedido.')
        }
    })

    const { mutateAsync: dispatchOrderFn, isPending: isDispatchingOrder } = useMutation({
        mutationFn: dispatchOrder,
        onSuccess(_, { orderId }) {
            updateStatusOnCached({ orderId, status: 'delivering' })
            toast.success('O pedido está em rota para a entrega!')
        },
        onError() {
            toast.error('Não foi possível enviar o produto para a rota.')
        }
    })

    const { mutateAsync: deliverOrderFn, isPending: isDeliveringOrder } = useMutation({
        mutationFn: deliverOrder,
        onSuccess(_, { orderId }) {
            updateStatusOnCached({ orderId, status: 'delivered' })
            toast.success('Pedido Entregue com sucesso!')
        },
        onError() {
            toast.error('Não foi possível marcar o produto como entregue.')
        }
    })

    function updateStatusOnCached({ orderId, status }: UpdateStatusOnCachedProps) {
        const cached = queryClient.getQueriesData<GetOrdersProps>({
            queryKey: ['orders']
        })

        cached.forEach(([cachedKey, cachedData]) => {
            if (!cachedData) return

            queryClient.setQueryData<GetOrdersProps>(cachedKey, {
                ...cachedData,
                orders: cachedData.orders.map((order) => {
                    if (order.orderId === orderId) {
                        return {
                            ...order,
                            status
                        }
                    }

                    return order
                })
            })
        })
    }

    return (
        <TableRow>
            <TableCell>
                <Dialog
                    open={isDetailsOpen}
                    onOpenChange={setIsDetailsOpen}>
                    <DialogTrigger asChild>
                        <Button
                            variant="outline"
                            size="xs"
                        >
                            <Search className="h-3 w-3" />
                            <span className="sr-only">Detalhes do pedido</span>
                        </Button>
                    </DialogTrigger>
                    <OrderDetails
                        open={isDetailsOpen}
                        orderId={order.orderId}
                    />
                </Dialog>
            </TableCell>
            <TableCell className="font-mono text-xs font-medium">
                {order.orderId}
            </TableCell>
            <TableCell
                className="text-muted-foreground">
                {formatDistanceToNow(order.createdAt, {
                    locale: ptBR,
                    addSuffix: true
                })}</TableCell>
            <TableCell>
                <OrderStatus status={order.status} />
            </TableCell>
            <TableCell className="font-medium">
                {order.customerName}
            </TableCell>
            <TableCell className="font-medium">
                {(order.total / 100).toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                })}
            </TableCell>
            <TableCell>
                {order.status === 'pending' && (
                    <Button
                        variant="outline"
                        onClick={() => approveOrderFn({ orderId: order.orderId })}
                        disabled={isApprovingOrder}
                    >
                        <ArrowRight className="mr-3 h-3 w-3" />
                        Aprovar
                    </Button>
                )}

                {order.status === 'processing' && (
                    <Button
                        variant="outline"
                        onClick={() => dispatchOrderFn({ orderId: order.orderId })}
                        disabled={isDispatchingOrder}
                    >
                        <ArrowRight className="mr-3 h-3 w-3" />
                        Em entrega
                    </Button>
                )}

                {order.status === 'delivering' && (
                    <Button
                        variant="outline"
                        onClick={() => deliverOrderFn({ orderId: order.orderId })}
                        disabled={isDeliveringOrder}
                    >
                        <ArrowRight className="mr-3 h-3 w-3" />
                        Entregue
                    </Button>
                )}

                {order.status === 'delivered' && (
                    <span className="flex items-center justify-center whitespace-nowrap text-sm font-medium text-green-500 dark:text-green-400 hover:cursor-default">
                        <Check className="mr-3 h-3 w-3" />
                        Concluído
                    </span>
                )}

                {order.status === 'canceled' && (
                    <span className="flex items-center justify-center whitespace-nowrap text-sm font-medium text-red-500 dark:text-red-400 hover:cursor-default">
                        <Ban className="mr-3 h-3 w-3" />
                        Cancelado
                    </span>
                )}
            </TableCell>
            <TableCell>
                <Button
                    variant="ghost"
                    disabled={!['pending', 'processing'].includes(order.status) || isCancelingOrder}
                    className="disabled:cursor-not-allowed"
                    onClick={() => cancelOrderFn({ orderId: order.orderId })}
                >
                    <X
                        className="mr-3 h-3 w-3"
                    />
                    Cancelar
                </Button>
            </TableCell>
        </TableRow>
    )
}
