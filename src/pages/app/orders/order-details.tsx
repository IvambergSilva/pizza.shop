import { getOrderDetails } from "@/api/get-order-details";
import { OrderStatus } from "@/components/order-status";
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { OrderDetailsSkeleton } from "./order-details-skeleton";

interface OrderDetailsProps {
    orderId: string;
    open: boolean;
}

export function OrderDetails({ orderId, open }: OrderDetailsProps) {
    const { data: order } = useQuery({
        queryKey: ['order', orderId],
        queryFn: () => getOrderDetails({ orderId }),
        enabled: open
    })

    function tel(phone: string | null) {
        if (phone) {
            const cleanedPhone = phone.replace(/\D/g, '');

            const formatted = `(${cleanedPhone.substring(0, 2)}) ${cleanedPhone[2]} ${cleanedPhone.substring(3, 7)}-${cleanedPhone.substring(7)}`;

            return formatted
        }
    }

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Pedido: {orderId}</DialogTitle>
                <DialogDescription>Detalhes do pedido</DialogDescription>
            </DialogHeader>

            {order ? (
                <div className="space-y-6">
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell className="text-muted-foreground">
                                    Status
                                </TableCell>
                                <TableCell className="flex justify-end">
                                    <OrderStatus status={order.status} />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="text-muted-foreground">
                                    Cliente
                                </TableCell>
                                <TableCell className="flex justify-end">
                                    {order.customer.name}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="text-muted-foreground">
                                    Telefone
                                </TableCell>
                                <TableCell className="flex justify-end">
                                    {tel(order.customer.phone) ?? 'Não informado'}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="text-muted-foreground">
                                    Email
                                </TableCell>
                                <TableCell className="flex justify-end">
                                    {order.customer.email}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="text-muted-foreground">
                                    Realizado há
                                </TableCell>
                                <TableCell className="flex justify-end">
                                    {formatDistanceToNow(order.createdAt, {
                                        locale: ptBR,
                                        addSuffix: true
                                    })}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    <div className="max-h-64 overflow-y-auto scrollbar-webkit">
                        <Table>
                            <TableHeader className="sticky top-0 bg-background">
                                <TableRow>
                                    <TableHead>Produto</TableHead>
                                    <TableHead>Quantidade</TableHead>
                                    <TableHead>Preço</TableHead>
                                    <TableHead>Subtotal</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {order.orderItems.map((orderItem) => {
                                    return (
                                        <TableRow key={orderItem.id
                                        }>
                                            <TableCell>{orderItem.product.name}</TableCell>
                                            <TableCell className="text-right">{orderItem.quantity}</TableCell>
                                            <TableCell className="text-right">{(orderItem.priceInCents / 100).toLocaleString('pt-BR', {
                                                style: 'currency',
                                                currency: 'BRL'
                                            })}</TableCell>
                                            <TableCell className="text-right">{(orderItem.quantity * orderItem.priceInCents / 100).toLocaleString('pt-BR', {
                                                style: 'currency',
                                                currency: 'BRL'
                                            })}</TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                            <TableFooter className="sticky bottom-0 bg-background">
                                <TableRow>
                                    <TableCell colSpan={3}>Total do pedido</TableCell>
                                    <TableCell className="text-right">{(order.totalInCents / 100).toLocaleString('pt-BR', {
                                        style: 'currency',
                                        currency: 'BRL'
                                    })}</TableCell>
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </div>
                </div>
            ) : (
                <OrderDetailsSkeleton />
            )}
        </DialogContent >
    )
}
