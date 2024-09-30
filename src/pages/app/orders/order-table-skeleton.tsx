import { TableCell, TableRow } from "@/components/ui/table";
import { Skeleton } from "../../../components/ui/skeleton";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export function OrderTableSkeleton() {
    return Array.from({ length: 10 }).map((_, index) => {
        return (
            <TableRow key={index} className="h-[72.8px]">
                <TableCell>
                    <Button
                        variant="outline"
                        size="xs"
                    >
                        <Search className="h-3 w-3" />
                        <span className="sr-only">Detalhes do pedido</span>
                    </Button>
                </TableCell >
                <TableCell className="font-mono text-xs font-medium max-w-20 overflow-hidden text-ellipsis">
                    <Skeleton className="h-5 w-[115px]" />
                </TableCell>
                <TableCell>
                    <Skeleton className="h-5 w-[150px]" />
                </TableCell>
                <TableCell>
                    <Skeleton className="h-5 w-[180px]" />
                </TableCell>
                <TableCell className="font-medium">
                    <Skeleton className="h-5 w-[260px]" />
                </TableCell>
                <TableCell className="font-medium">
                    <Skeleton className="h-5 w-[140px]" />
                </TableCell>
                <TableCell>
                    <Skeleton className="h-10 w-[110px]" />
                </TableCell>
                <TableCell>
                    <Skeleton className="h-4 w-[110px]" />
                </TableCell>
            </TableRow >
        )
    })
}
