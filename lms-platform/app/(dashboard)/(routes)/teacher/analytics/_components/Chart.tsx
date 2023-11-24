"use client";

import { Card } from "@/components/ui/card";
import {
  LineChart,
  BarChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Bar,
} from "recharts";

interface ChartProps {
  data: { name: string; total: number }[];
}

const Chart = ({ data }: ChartProps) => {
  return (
    //Recharts
    <Card className="p-4">
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <XAxis
            dataKey="name"
            stroke="#88888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#88888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${value}`}
          />
          <Bar dataKey="total" fill="#0396a1" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default Chart;
