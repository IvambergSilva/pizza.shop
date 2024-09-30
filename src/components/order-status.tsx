type OrderStatus = "pending" | "canceled" | "processing" | "delivering" | "delivered";

interface OrderStatusProps {
    status: OrderStatus;
}

export const orderStatusMap: Record<OrderStatus, string> = {
    pending: 'Pendente',
    canceled: 'Cancelado',
    processing: 'Em preparo',
    delivering: 'Em entrega',
    delivered: 'Entregue',
}

const statusColorMap: Record<OrderStatus, string> = {
    pending: 'bg-slate-400',
    canceled: 'bg-rose-500',
    processing: 'bg-amber-500',
    delivering: 'bg-amber-500',
    delivered: 'bg-emerald-500',
}

export function OrderStatus({ status }: OrderStatusProps) {
    return (
        <div className="flex items-center gap-2">
            <span data-testid="badge" className={`h-2 w-2 rounded-full ${statusColorMap[status]}`} />
            <span className="font-medium text-muted-foreground">
                {orderStatusMap[status]}
            </span>
        </div>
    )
}
