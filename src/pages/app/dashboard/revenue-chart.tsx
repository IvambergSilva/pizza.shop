import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, LineChart, YAxis, XAxis, CartesianGrid, Line } from "recharts";
import colors from "tailwindcss/colors";

export default function RevenueChart() {
    const data = [
        { date: '10/12', revenue: 1230 },
        { date: '11/12', revenue: 5280 },
        { date: '12/12', revenue: 1960 },
        { date: '13/12', revenue: 230 },
        { date: '14/12', revenue: 1690 },
        { date: '15/12', revenue: 1270 },
        { date: '16/12', revenue: 1730 },
    ]

    return (
        <Card className="col-span-1 md:col-span-6">
            <CardHeader className="flex-row items-center justify-between pb-8">
                <div className="space-y-1">
                    <CardTitle className="text-base font-medium">Receita no período</CardTitle>
                    <CardDescription>Receita diária no período</CardDescription>
                </div>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={240}>
                    <LineChart
                        style={{ fontSize: 12 }}
                        data={data}
                    >
                        <YAxis
                            stroke={colors.gray[500]}
                            axisLine={false}
                            tickLine={false}
                            width={80}
                            tickFormatter={(value: number) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        />
                        <XAxis
                            dataKey="date"
                            axisLine={false}
                            tickLine={false}
                            stroke={colors.gray[500]}
                            dy={16}
                        />
                        <CartesianGrid
                            vertical={false}
                            className="stroke-muted"
                        />
                        <Line
                            type="linear"
                            strokeWidth={2}
                            dataKey="revenue"
                            stroke={colors.violet[500]}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}
