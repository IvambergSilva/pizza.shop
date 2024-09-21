import { getDailyRevenueInPeriod } from "@/api/get-daily-revenue-in-period";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { Label } from "@/components/ui/label";
import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { Loader2 } from "lucide-react";
import { useMemo, useState } from "react";
import { DateRange } from "react-day-picker";
import { ResponsiveContainer, LineChart, YAxis, XAxis, CartesianGrid, Line, Tooltip } from "recharts";
import colors from "tailwindcss/colors";

export function RevenueChart() {
    const [dateRange, setDateRange] = useState<DateRange | undefined>({
        from: subDays(new Date(), 7),
        to: new Date()
    })

    const { data: dailyRevenueInPeriod } = useQuery({
        queryKey: ['metrics', 'revenue-in-period', dateRange],
        queryFn: () => getDailyRevenueInPeriod({
            from: dateRange?.from,
            to: dateRange?.to
        })
    })

    const chartData = useMemo(() => {
        return dailyRevenueInPeriod?.map((chartItem) => {
            return {
                date: chartItem.date,
                receipt: chartItem.receipt / 100
            }
        })
    }, [dailyRevenueInPeriod])

    return (
        <Card className="col-span-1 md:col-span-6">
            <CardHeader className="flex-col gap-3 items-center justify-between pb-4 sm:pb-8 sm:flex-row">
                <div className="space-y-1">
                    <CardTitle className="text-base font-medium">Receita no período</CardTitle>
                    <CardDescription>Receita diária no período</CardDescription>
                </div>

                <div className="flex items-center gap-3">
                    <Label htmlFor="revenueInPeriod">Período</Label>
                    <DatePickerWithRange
                        date={dateRange}
                        onDateChange={setDateRange}
                    />
                </div>
            </CardHeader>
            <CardContent>
                {chartData ? (
                    <ResponsiveContainer width="100%" height={240}>
                        <LineChart
                            style={{ fontSize: 12 }}
                            data={chartData}
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
                            <Tooltip
                                contentStyle={{ background: colors.gray[400], color: colors.gray[100], fontWeight: "bolder" }}
                                itemStyle={{ color: colors.zinc[700] }}
                                formatter={(value) => Number(value).toLocaleString('pt-BR', {
                                    style: 'currency',
                                    currency: 'BRL',
                                })}
                            />
                            <Line
                                type="linear"
                                strokeWidth={2}
                                dataKey="receipt"
                                stroke={colors.violet[500]}
                                name="Receita"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="h-60 w-full flex justify-center items-center">
                        <Loader2 className="w-16 h-16 text-muted-foreground animate-spin" />
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
