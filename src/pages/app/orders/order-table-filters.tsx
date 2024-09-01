import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, X } from "lucide-react";

export default function OrderTableFilters() {
    return (
        <form
            className="grid items-center gap-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-7">
            <div className="flex items-center gap-2 col-span-2 md:col-span-4 lg:col-span-3">
                <span
                    className="text-sm font-semibold"
                >Filtros:</span>
                <Input
                    id="filters"
                    className="h-8 w-2/5 min-w-[150px]"
                    placeholder="Id do pedido"
                />
                <Input
                    id="filters"
                    className="h-8 w-full"
                    placeholder="Nome do cliente"
                />
            </div>

            <Select defaultValue="all">
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

            <Select defaultValue="default">
                <SelectTrigger className="h-8 w-full">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="default">Classificar por preço</SelectItem>
                    <SelectItem value="descending">Maior para o menor</SelectItem>
                    <SelectItem value="ascending">Menor para maior</SelectItem>
                </SelectContent>
            </Select>

            <Button
                type="button"
                variant="outline"
                size="xs"
                className="w-full"
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
