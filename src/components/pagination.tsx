import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { Button } from "./ui/button";

interface PaginationProps {
    pageIndex: number;
    totalCount: number;
    perPage: number;
    onPageChange: (pageIndex: number) => Promise<void> | void;
}

export function Pagination({ pageIndex, totalCount, perPage, onPageChange }: PaginationProps) {
    const pages = Math.ceil(totalCount / perPage) || 1

    return (
        <div
            className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
                Total de {totalCount} {totalCount === 1 ? 'item' : 'itens'}
            </span>
            <div
                className="flex items-center gap-6 lg:gap-8"
            >
                <div className="text-sm font-medium">
                    Página {pageIndex + 1} de {pages}
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        className="h-8 w-8 p-0 disabled:cursor-not-allowed"
                        onClick={() => onPageChange(0)}
                        disabled={pageIndex === 0}
                    >
                        <span className="sr-only">Primeira página</span>
                        <ChevronsLeft />
                    </Button>
                    <Button
                        variant="outline"
                        className="h-8 w-8 p-0 disabled:cursor-not-allowed"
                        onClick={() => onPageChange(pageIndex - 1)}
                        disabled={pageIndex === 0}
                    >
                        <span className="sr-only">Página anterior</span>
                        <ChevronLeft />
                    </Button>
                    <Button
                        variant="outline"
                        className="h-8 w-8 p-0 disabled:cursor-not-allowed"
                        onClick={() => onPageChange(pageIndex + 1)}
                        disabled={pages <= pageIndex + 1}
                    >
                        <span className="sr-only">Próxima página</span>
                        <ChevronRight />
                    </Button>
                    <Button
                        variant="outline"
                        className="h-8 w-8 p-0 disabled:cursor-not-allowed"
                        onClick={() => onPageChange(pages - 1)}
                        disabled={pages <= pageIndex + 1}
                    >
                        <ChevronsRight />
                        <span className="sr-only">Última página</span>
                    </Button>
                </div>
            </div>
        </div>
    )
}
