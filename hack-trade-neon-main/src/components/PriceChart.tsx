import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { AreaChart } from 'lucide-react';

interface PriceChartProps {
  priceHistory: number[];
  symbol: string;
}

const PriceChart: React.FC<PriceChartProps> = ({ priceHistory, symbol }) => {
  // Prepare data for the chart
  const data = priceHistory.map((price, index) => ({
    index,
    price,
  }));

  // Find min and max prices for Y-axis domain
  const minPrice = Math.min(...priceHistory) * 0.995; // 0.5% padding
  const maxPrice = Math.max(...priceHistory) * 1.005; // 0.5% padding

  // Determine if the trend is positive (last price > first shown price)
  const isPositiveTrend = priceHistory[priceHistory.length - 1] > priceHistory[0];
  const lineColor = isPositiveTrend ? "#10B981" : "#EF4444";

  return (
    <Card className="glass-card w-full animate-pulse-glow">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <AreaChart className="mr-2" size={18} />
          {symbol} Price Chart
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[180px] mt-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={lineColor} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={lineColor} stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="index" 
                tick={false} 
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
                domain={[minPrice, maxPrice]} 
                tick={{ fontSize: 12, fill: '#666' }}
                tickCount={5}
                tickFormatter={(value) => `$${value.toFixed(0)}`}
                axisLine={false}
                tickLine={false}
                width={50}
              />
              <Tooltip 
                formatter={(value: number) => [`$${value.toFixed(2)}`, 'Price']}
                contentStyle={{ 
                  backgroundColor: '#1A1F2C', 
                  borderColor: '#333',
                  color: '#fff',
                  fontSize: '12px',
                  fontFamily: 'JetBrains Mono',
                }}
                itemStyle={{ color: lineColor }}
                labelFormatter={() => ''}
              />
              <Line 
                type="monotone" 
                dataKey="price" 
                stroke={lineColor} 
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, stroke: lineColor, strokeWidth: 1 }}
                fillOpacity={1}
                fill="url(#colorPrice)"
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default PriceChart;
