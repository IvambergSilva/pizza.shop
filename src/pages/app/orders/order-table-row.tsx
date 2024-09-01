import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { TableRow, TableCell } from "@/components/ui/table";
import { Search, ArrowRight, X } from "lucide-react";
import { OrderDetails } from "./order-details";

export function OrderTableRow() {
    return (
        <TableRow>
            <TableCell>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button
                            variant="outline"
                            size="xs"
                        >
                            <Search className="h-3 w-3" />
                            <span className="sr-only">Detalhes do pedido</span>
                        </Button>
                    </DialogTrigger>
                    <OrderDetails />
                </Dialog>
            </TableCell>
            <TableCell className="font-mono text-xs font-medium">
                312312313DS
            </TableCell>
            <TableCell
                className="text-muted-foreground">
                Há 15 minutos</TableCell>
            <TableCell>
                <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-slate-400" />
                    <span className="font-medium text-muted-foreground">
                        Pendente
                    </span>
                </div>
            </TableCell>
            <TableCell className="font-medium">
                Ivamberg Ivanildo da Silva
            </TableCell>
            <TableCell className="font-medium">
                R$ 159,36
            </TableCell>
            <TableCell className="">
                <Button variant="outline">
                    <ArrowRight
                        className="mr-3 h-3 w-3"
                    />
                    Aprovar
                </Button>
            </TableCell>
            <TableCell className="">
                <Button variant="ghost">
                    <X
                        className="mr-3 h-3 w-3"
                    />
                    Cancelar
                </Button>
            </TableCell>
        </TableRow>
    )
}
